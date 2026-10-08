import {
  canonicalStats,
  clubSeasonHistoryByPlayerId,
  MIN_MINUTES_BY_CONTEXT,
  playersById,
  POSITION_TIER,
  QUALITY_WEIGHTS,
} from "../data/comp-engine-data";

import {
  Player,
  PlayerAggregateStats,
  PlayerSeasonStats,
} from "@/shared/types/stats-schema";
import { aggregateStats } from "../utils/aggregate-stat";
import {
  BaseComparisonType,
  ComparisonContext,
  ComparisonScope,
} from "../types/comparison-main-type";

export function filterBaseComparisons(
  baseComparisons: BaseComparisonType[],
): BaseComparisonType[] {
  const seen = new Set<string>(); // safety net
  const scored: BaseComparisonType[] = [];

  for (const comparison of baseComparisons) {
    const groupKey = `${comparison.context}::${JSON.stringify(comparison.scopeA)}::${JSON.stringify(comparison.scopeB)}`;

    const dedupeKey = `${groupKey}::${comparison.playerA}::${comparison.playerB}`;
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);

    const { floor, aggA, aggB, isMinutes } = checkMinutesOfPlayers(comparison);
    if (!isMinutes) continue;

    const playerA = playersById.get(comparison.playerA);
    const playerB = playersById.get(comparison.playerB);
    if (!playerA || !playerB) continue;

    if (playersHaveSharedTeamHistory(playerA, playerB)) continue;

    const isNotable = checkNotabilityOfPlayers(baseComparisons, comparison);
    if (!isNotable) continue;

    if (
      positionMatchScore(playerA.primaryPosition, playerB.primaryPosition) === 0
    )
      continue;

    scored.push(comparison);
  }

  const grouped = new Map<string, BaseComparisonType[]>();
  for (const comparison of scored) {
    const groupKey = `${comparison.context}::${JSON.stringify(comparison.scopeA)}::${JSON.stringify(comparison.scopeB)}`;
    if (!grouped.has(groupKey)) grouped.set(groupKey, []);
    grouped.get(groupKey)!.push(comparison);
  }

  for (const group of grouped.values()) {
    group.sort((a, b) => ratingProximityScore(b) - ratingProximityScore(a));
  }

  const reserved: BaseComparisonType[] = [];
  const remainder: BaseComparisonType[] = [];

  for (const group of grouped.values()) {
    reserved.push(...group.slice(0, QUALITY_WEIGHTS.minGroup));
    remainder.push(...group.slice(QUALITY_WEIGHTS.minGroup));
  }

  remainder.sort((a, b) => ratingProximityScore(b) - ratingProximityScore(a));
  const remainingSlots = Math.max(
    0,
    QUALITY_WEIGHTS.targetTotal - reserved.length,
  );
  const result = [...reserved, ...remainder.slice(0, remainingSlots)];

  return result.sort(
    (a, b) => ratingProximityScore(b) - ratingProximityScore(a),
  );
}

function buildNotablePlayersByScope(
  baseComparisons: BaseComparisonType[],
): Map<string, Set<string>> {
  const scopedPlayers = buildScopedPlayers(baseComparisons);
  const notableByScope = new Map<string, Set<string>>();

  for (const [groupKey, { context, scope, playerIds }] of scopedPlayers) {
    const playerAggStats = buildScopedStatsForPlayers(
      playerIds,
      context,
      scope,
    );

    const notable = new Set<string>();
    const ranked = [...playerAggStats].sort(
      (a, b) => b.agg.rating - a.agg.rating,
    );
    const cutoff = Math.max(
      QUALITY_WEIGHTS.minNotablePerStat,
      Math.ceil(ranked.length * QUALITY_WEIGHTS.notabilityPercentile),
    );

    for (const { playerId } of ranked.slice(0, cutoff)) {
      notable.add(playerId);
    }
    notableByScope.set(groupKey, notable);
  }

  return notableByScope;
}

function buildScopedPlayers(baseComparisons: BaseComparisonType[]) {
  const groupPlayers = new Map<
    string,
    {
      context: ComparisonContext;
      scope: ComparisonScope;
      playerIds: Set<string>;
    }
  >();

  for (const comparison of baseComparisons) {
    const entries = [
      { playerId: comparison.playerA, scope: comparison.scopeA },
      { playerId: comparison.playerB, scope: comparison.scopeB },
    ];
    for (const entry of entries) {
      const groupKey = `${comparison.context}::${JSON.stringify(entry.scope)}`;
      if (!groupPlayers.has(groupKey)) {
        groupPlayers.set(groupKey, {
          context: comparison.context,
          scope: entry.scope,
          playerIds: new Set(),
        });
      }
      groupPlayers.get(groupKey)!.playerIds.add(entry.playerId);
    }
  }
  return groupPlayers;
}

function buildScopedStatsForPlayers(
  playerIds: Set<string>,
  context: ComparisonContext,
  scope: ComparisonScope,
) {
  const floor = MIN_MINUTES_BY_CONTEXT[context];
  const playerAggs: { playerId: string; agg: PlayerAggregateStats }[] = [];

  for (const playerId of playerIds) {
    const rows = statsInScope(playerId, context, scope);
    const agg = aggregateStats(rows);
    if (agg.minutes < floor) continue;
    playerAggs.push({ playerId, agg });
  }

  return playerAggs;
}

function statsInScope(
  playerId: string,
  context: ComparisonContext,
  scope: ComparisonScope,
  scopedStatsCache = new Map<string, PlayerSeasonStats[]>(),
): PlayerSeasonStats[] {
  const cacheKey = `${playerId}::${context}::${JSON.stringify(scope)}`;
  const cached = scopedStatsCache.get(cacheKey);
  if (cached) return cached;

  const matchingStats = canonicalStats.filter((stat) => {
    if (stat.playerId !== playerId) return false;
    return getScopeConfirmation(stat, context, scope);
  });

  scopedStatsCache.set(cacheKey, matchingStats);
  return matchingStats;
}

function getScopeConfirmation(
  stat: PlayerSeasonStats,
  context: ComparisonContext,
  scope: ComparisonScope,
) {
  switch (context) {
    case "CTX-SEASON":
      return stat.seasonId === scope.seasonId;
    case "CTX-LEAGUE-SEASON":
      return (
        stat.seasonId === scope.seasonId &&
        stat.competitionId === scope.leagueId &&
        stat.competitionType === "league"
      );
    case "CTX-COMPETITION-SEASON":
      return (
        stat.seasonId === scope.seasonId &&
        stat.competitionId === scope.competitionId
      );
    case "CTX-LEAGUE-CAREER":
      return (
        stat.competitionId === scope.leagueId &&
        stat.competitionType === "league"
      );
    case "CTX-COMPETITION-CAREER":
      return stat.competitionId === scope.competitionId;
    case "CTX-OVERALL-CAREER":
      return true;
    default:
      return false;
  }
}

function checkMinutesOfPlayers(comparison: BaseComparisonType) {
  const floor = MIN_MINUTES_BY_CONTEXT[comparison.context] ?? 0;

  const rowsA = statsInScope(
    comparison.playerA,
    comparison.context,
    comparison.scopeA,
  );
  const rowsB = statsInScope(
    comparison.playerB,
    comparison.context,
    comparison.scopeB,
  );
  const aggA = aggregateStats(rowsA);
  const aggB = aggregateStats(rowsB);

  if (aggA.minutes < floor || aggB.minutes < floor)
    return { floor, aggA, aggB, status: false };
  return { floor, aggA, aggB, isMinutes: true };
}

function playersHaveSharedTeamHistory(playerA: Player, playerB: Player) {
  if (playerA.currentClubId === playerB.currentClubId) return true;

  const clubSeasonsA = clubSeasonHistoryByPlayerId.get(playerA.id);
  const clubSeasonsB = clubSeasonHistoryByPlayerId.get(playerB.id);
  if (!clubSeasonsA || !clubSeasonsB) return false;

  const smallerHistory =
    clubSeasonsA.size <= clubSeasonsB.size ? clubSeasonsA : clubSeasonsB;
  const largerHistory =
    smallerHistory === clubSeasonsA ? clubSeasonsB : clubSeasonsA;
  return [...smallerHistory].some((clubSeason) =>
    largerHistory.has(clubSeason),
  );
}

function checkNotabilityOfPlayers(
  baseComparisons: BaseComparisonType[],
  comparison: BaseComparisonType,
) {
  const notableByScope = buildNotablePlayersByScope(baseComparisons);

  const notableA = notableByScope.get(
    `${comparison.context}::${JSON.stringify(comparison.scopeA)}`,
  );
  const notableB = notableByScope.get(
    `${comparison.context}::${JSON.stringify(comparison.scopeB)}`,
  );
  if (
    notableA &&
    !notableA.has(comparison.playerA) &&
    notableB &&
    !notableB.has(comparison.playerB)
  )
    return false;
  return true;
}

function positionMatchScore(posA: string, posB: string): number {
  const tierA = POSITION_TIER[posA];
  const tierB = POSITION_TIER[posB];
  if (!tierA || !tierB) return 0.4; // unrecognized position    neutral, don't penalize
  return tierA === tierB ? 1 : 0; // cross-tier is down-weighted, never excluded
}

function ratingProximityScore(comparison: BaseComparisonType): number {
  const rowsA = statsInScope(
    comparison.playerA,
    comparison.context,
    comparison.scopeA,
  );
  const rowsB = statsInScope(
    comparison.playerB,
    comparison.context,
    comparison.scopeB,
  );
  const ratingA = aggregateStats(rowsA).rating;
  const ratingB = aggregateStats(rowsB).rating;
  const averageRating = (ratingA + ratingB) / 2;
  const ratingSimilarity = 1 - Math.abs(ratingA - ratingB) / 10;

  return (averageRating / 10) * ratingSimilarity;
}
