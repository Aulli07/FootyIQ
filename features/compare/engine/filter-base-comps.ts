import canonicalStoreNew from "@/features/players/data/new/canonical-store.json"
import { FootballDataStore, PlayerSeasonStats } from "@/shared/types/stats-schema";
import { AggregatedStatsType, aggregateStats } from "../utils/aggregate-stat";
import { BaseComparisonType, ComparisonContext, ComparisonScope, QualityComparisonType } from "../types/comparison-main-type";


const canonicalStore = canonicalStoreNew as FootballDataStore;
const players = canonicalStore.players;
const stats = canonicalStore.totalPlayerStats;

const scopedStatsCache = new Map<string, PlayerSeasonStats[]>();
const clubSeasonHistoryByPlayerId = new Map<string, Set<string>>();

for (const stat of stats) {
  if (!clubSeasonHistoryByPlayerId.has(stat.playerId)) {
    clubSeasonHistoryByPlayerId.set(stat.playerId, new Set());
  }
  clubSeasonHistoryByPlayerId.get(stat.playerId)!.add(`${stat.clubId}::${stat.seasonId}`);
}


const MIN_MINUTES_BY_CONTEXT: Record<string, number> = {
  "CTX-SEASON": 450,
  "CTX-LEAGUE-SEASON": 450,
  "CTX-COMPETITION-SEASON": 180,
  "CTX-LEAGUE-CAREER": 900,
  "CTX-COMPETITION-CAREER": 360,
  "CTX-OVERALL-CAREER": 900
};

// League-season data is sparse in the current dataset. Keep the stricter
// global threshold for every other context while allowing viable cross-club
// league comparisons to populate their theme.
const MIN_QUALITY_SCORE_BY_CONTEXT: Partial<Record<ComparisonContext, number>> = {
  "CTX-LEAGUE-SEASON": 0.5,
};

const POSITION_TIER: Record<string, string> = {
  Striker: "attack",
  Forward: "attack",
  Winger: "attack",
  Midfielder: "midfield"
};

const QUALITY_WEIGHTS = {
  // These two signals now cover the full score range. Previously they added
  // up to 0.75, so even a near-perfect comparison could never score above it.
  sampleAdequacy: 0.5,
  positionMatch: 0.25,
  statProximity: 0.5,
  notabilityPercentile: 0.3,
  minNotablePerStat: 1,
  targetTotal: 50,
  minGroup: 5,
  minQualityScore: 0.7
};

const PROXIMITY_METRICS = [
  "goals",
  "assists",
  "shotsOnTarget",
  "dribblesCompleted",
  "chancesCreated"
] as const;


function statsInScope(
  playerId: string,
  contextId: ComparisonContext,
  scope: ComparisonScope,
): PlayerSeasonStats[] {
  const cacheKey = `${playerId}::${contextId}::${JSON.stringify(scope)}`;
  const cached = scopedStatsCache.get(cacheKey);
  if (cached) return cached;

  const matchingStats = stats.filter(stat => {
    if (stat.playerId !== playerId) return false;
    switch (contextId) {
      case "CTX-SEASON":
        return stat.seasonId === scope.seasonId;
      case "CTX-LEAGUE-SEASON":
        return (
          stat.seasonId === scope.seasonId &&
          stat.competitionId === scope.leagueId &&
          stat.competitionType === "league"
        );
      case "CTX-COMPETITION-SEASON":
        return stat.seasonId === scope.seasonId && stat.competitionId === scope.competitionId;
      case "CTX-LEAGUE-CAREER":
        return stat.competitionId === scope.leagueId && stat.competitionType === "league";
      case "CTX-COMPETITION-CAREER":
        return stat.competitionId === scope.competitionId;
      case "CTX-OVERALL-CAREER":
        return true;
      default:
        return false;
    }
  });
  scopedStatsCache.set(cacheKey, matchingStats);
  return matchingStats;
}

// function aggregateStats(rows: PlayerSeasonStats[]): AggregatedStats {
//   const sum = (field: string) =>
//     rows.reduce((total, row) => total + (Number(row[field as keyof PlayerSeasonStats]) || 0), 0);

//   return {
//     minutes: sum("minutes"),
//     appearances: sum("appearances"),
//     goals: sum("goals"),
//     assists: sum("assists"),
//     shots: sum("shots"),
//     shotsOnTarget: sum("shotsOnTarget"),
//     chancesCreated: sum("chancesCreated"),
//     dribbles: sum("dribbles"),
//     dribblesCompleted: sum("dribblesCompleted")
//   };
// }

function positionMatchScore(posA: string, posB: string): number {
  const tierA = POSITION_TIER[posA];
  const tierB = POSITION_TIER[posB];
  if (!tierA || !tierB) return 0.4; // unrecognized position    neutral, don't penalize
  return tierA === tierB ? 1 : 0; // cross-tier is down-weighted, never excluded
}

function sampleAdequacyScore(minSharedMinutes: number, floor: number): number {
  const confidenceCeiling = floor * 3; // 3x the floor reads as "fully sampled"
  return Math.min(1, minSharedMinutes / confidenceCeiling);
}

function playersHaveSharedTeamHistory(playerA: typeof players[number], playerB: typeof players[number]): boolean {
  if (playerA.currentClubId === playerB.currentClubId) return true;

  const clubSeasonsA = clubSeasonHistoryByPlayerId.get(playerA.id);
  const clubSeasonsB = clubSeasonHistoryByPlayerId.get(playerB.id);
  if (!clubSeasonsA || !clubSeasonsB) return false;

  const smallerHistory = clubSeasonsA.size <= clubSeasonsB.size ? clubSeasonsA : clubSeasonsB;
  const largerHistory = smallerHistory === clubSeasonsA ? clubSeasonsB : clubSeasonsA;
  return [...smallerHistory].some((clubSeason) => largerHistory.has(clubSeason));
}

function statProximityScore(a: AggregatedStatsType, b: AggregatedStatsType): number {
  const per90 = (stats: AggregatedStatsType, field: keyof AggregatedStatsType) =>
    stats.minutes > 0 ? (stats[field] / stats.minutes) * 90 : 0;

  const perMetricScores = PROXIMITY_METRICS.map(metric => {
    const rateA = per90(a, metric);
    const rateB = per90(b, metric);
    const maxRate = Math.max(rateA, rateB);
    if (maxRate === 0) return null; 
    return 1 - Math.abs(rateA - rateB) / maxRate; // 1 = identical rate, 0 = maximal gap
  })
  .filter((s): s is number => s !== null);

  if (perMetricScores.length == 0) return 0.5;
  return perMetricScores.reduce((sum, score) => sum + score, 0) / perMetricScores.length;
}

function per90Rate(agg: AggregatedStatsType, field: keyof AggregatedStatsType) {
  return agg.minutes > 0 ? (agg[field] / agg.minutes) * 90 : 0;
}


function buildNotablePlayersByScope(
  baseComparisons: BaseComparisonType[]
) : Map<string, Set<string>> {

  const groupPlayers = new Map<
  string,
  { context: ComparisonContext; scope: ComparisonScope; playerIds: Set<string>}
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

  const notableByScope = new Map<string, Set<string>>()

  for (const [groupKey, {context, scope, playerIds}] of groupPlayers) {
    const floor = MIN_MINUTES_BY_CONTEXT[context];

    const playerAggs: {playerId: string, agg: AggregatedStatsType}[] = [];
    for (const playerId of playerIds) {
      const rows = statsInScope(playerId, context, scope);
      const agg = aggregateStats(rows);
      if (agg.minutes < floor) continue;
      playerAggs.push({playerId, agg});
    }

    const notable = new Set<string>();

    for (const stat of PROXIMITY_METRICS) {
      const ranked = [...playerAggs].sort((a,b) => per90Rate(b.agg, stat) - per90Rate(a.agg, stat));
      const cutoff = Math.max(QUALITY_WEIGHTS.minNotablePerStat, Math.ceil(ranked.length * QUALITY_WEIGHTS.notabilityPercentile));
      for (const {playerId} of ranked.slice(0, cutoff)) {
        notable.add(playerId);
      }
    }
    notableByScope.set(groupKey, notable);
  }

  return notableByScope;
}

export const playersById = new Map(players.map(p => [p.id, p]));

export function filterBaseComparisons(
  baseComparisons: BaseComparisonType[],
): QualityComparisonType[] {

  
  const seen = new Set<string>(); // safety net against duplicate base comparisons
  const scored: QualityComparisonType[] = [];

  const notableByScope = buildNotablePlayersByScope(baseComparisons);
  for (const comparison of baseComparisons) {
    const groupKey = `${comparison.context}::${JSON.stringify(comparison.scopeA)}::${JSON.stringify(comparison.scopeB)}`
    const dedupeKey = `${groupKey}::${comparison.playerA}::${comparison.playerB}`;
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);

    const floor = MIN_MINUTES_BY_CONTEXT[comparison.context] ?? 0;

    const rowsA = statsInScope(comparison.playerA, comparison.context, comparison.scopeA);
    const rowsB = statsInScope(comparison.playerB, comparison.context, comparison.scopeB);
    const aggA = aggregateStats(rowsA);
    const aggB = aggregateStats(rowsB);

    // Hard floor    below this, the sample is too small to be a real comparison
    if (aggA.minutes < floor || aggB.minutes < floor) continue;

    const playerA = playersById.get(comparison.playerA);
    const playerB = playersById.get(comparison.playerB);
    if (!playerA || !playerB) continue;

    // Do not compare current teammates or players with a shared club-season.
    // Every competition row contributes to the recorded club-season history.
    if (playersHaveSharedTeamHistory(playerA, playerB)) continue;

    const notableA = notableByScope.get(`${comparison.context}::${JSON.stringify(comparison.scopeA)}`);
    const notableB = notableByScope.get(`${comparison.context}::${JSON.stringify(comparison.scopeB)}`);
    if (
      (notableA && !notableA.has(comparison.playerA)) &&
      (notableB && !notableB.has(comparison.playerB))
    ) continue;

    const sampleScore = sampleAdequacyScore(Math.min(aggA.minutes, aggB.minutes), floor);
    const positionScore = positionMatchScore(playerA.primaryPosition, playerB.primaryPosition);
    const proximityScore = statProximityScore(aggA, aggB);

    const qualityScore =
      Number(((sampleScore * QUALITY_WEIGHTS.sampleAdequacy +
      proximityScore * QUALITY_WEIGHTS.statProximity) * positionScore).toFixed(2));

    const minQualityScore =
      MIN_QUALITY_SCORE_BY_CONTEXT[comparison.context] ?? QUALITY_WEIGHTS.minQualityScore;
    if (qualityScore < minQualityScore) continue;

    scored.push({ ...comparison, qualityScore });
  }

  const grouped = new Map<string, QualityComparisonType[]>();
  for (const comparison of scored) {
    const groupKey = `${comparison.context}::${JSON.stringify(comparison.scopeA)}::${JSON.stringify(comparison.scopeB)}`;
    if (!grouped.has(groupKey)) grouped.set(groupKey, []);
    grouped.get(groupKey)!.push(comparison);
  }

  for (const group of grouped.values()) {
    group.sort((a, b) => b.qualityScore - a.qualityScore);
  
  }

  const reserved: QualityComparisonType[] = [];
  const remainder: QualityComparisonType[] = [];

  for (const group of grouped.values()) {
    reserved.push(...group.slice(0, QUALITY_WEIGHTS.minGroup));
    remainder.push(...group.slice(QUALITY_WEIGHTS.minGroup));
  }

  remainder.sort((a,b) => b.qualityScore - a.qualityScore);
  const remainingSlots = Math.max(0, QUALITY_WEIGHTS.targetTotal - reserved.length);
  const result = [...reserved, ...remainder.slice(0, remainingSlots)];

  return result.sort((a,b) => b.qualityScore - a.qualityScore);
}

