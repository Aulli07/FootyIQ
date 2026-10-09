import canonicalStoreNew from "@/data/processed/canonical-store.json";
import {
  FootballDataStore,
  PlayerSeasonStats,
} from "@/shared/types/stats-schema";
import { aggregateStats } from "../utils/aggregate-stat";
import { MIN_MINUTES_BY_CONTEXT } from "../data/comp-engine-data";
import {
  ComparisonType,
  ComparisonContext,
  ComparisonScope,
} from "../types/comparison-main-type";

const canonicalStore = canonicalStoreNew as FootballDataStore;
const stats = canonicalStore.stats;

export function generateAllBaseComparisons() {
  return [
    ...generateSeasonComparisons(),
    ...generateLeagueSeasonComparisons(),
    ...generateCompetitionSeasonComparisons(),
    ...generateLeagueCareerComparisons(),
    ...generateCompetitionCareerComparisons(),
    ...generateOverallCareerComparisons(),
  ];
}

function generateSeasonComparisons() {
  return generateFilteredComparisons(
    stats,
    "CTX-SEASON",
    (stat) => stat.seasonId,
    (stat) => ({ seasonId: stat.seasonId }),
  );
}

function generateLeagueSeasonComparisons() {
  return generateFilteredComparisons(
    stats.filter((stat) => stat.competitionType === "league"),
    "CTX-LEAGUE-SEASON",
    (stat) => `${stat.seasonId}::${stat.competitionId}`,
    (stat) => ({
      seasonId: stat.seasonId,
      leagueId: stat.competitionId,
    }),
  );
}

function generateCompetitionSeasonComparisons() {
  return generateFilteredComparisons(
    stats.filter((stat) => stat.competitionType !== "league"),
    "CTX-COMPETITION-SEASON",
    (stat) => `${stat.seasonId}::${stat.competitionId}`,
    (stat) => ({
      seasonId: stat.seasonId,
      competitionId: stat.competitionId,
    }),
  );
}

function generateLeagueCareerComparisons() {
  return generateFilteredComparisons(
    stats.filter((stat) => stat.competitionType === "league"),
    "CTX-LEAGUE-CAREER",
    (stat) => stat.competitionId,
    (stat) => ({ leagueId: stat.competitionId }),
  );
}

function generateCompetitionCareerComparisons() {
  return generateFilteredComparisons(
    stats.filter((stat) => stat.competitionType !== "league"),
    "CTX-COMPETITION-CAREER",
    (stat) => stat.competitionId,
    (stat) => ({ competitionId: stat.competitionId }),
  );
}

function generateOverallCareerComparisons() {
  return generateFilteredComparisons(
    stats,
    "CTX-OVERALL-CAREER",
    () => "overall",
    () => ({}),
  );
}

type PlayerScopeEntry = {
  playerId: string;
  scope: ComparisonScope;
};

type RatedPlayerScopeEntry = PlayerScopeEntry & { rating: number };

function generateFilteredComparisons(
  sourceStats: PlayerSeasonStats[],
  context: ComparisonContext,
  getScopeKey: (stat: PlayerSeasonStats) => string,
  getScope: (stat: PlayerSeasonStats) => ComparisonScope,
): ComparisonType[] {
  const rowsByScopeAndPlayer = new Map<string, PlayerSeasonStats[]>();

  for (const stat of sourceStats) {
    const key = `${getScopeKey(stat)}::${stat.playerId}`;
    const rows = rowsByScopeAndPlayer.get(key) ?? [];
    rows.push(stat);
    rowsByScopeAndPlayer.set(key, rows);
  }

  const candidatesByScope = new Map<string, RatedPlayerScopeEntry[]>();
  const minimumMinutes = MIN_MINUTES_BY_CONTEXT[context];

  for (const [key, rows] of rowsByScopeAndPlayer) {
    const separatorIndex = key.lastIndexOf("::");
    const scopeKey = key.slice(0, separatorIndex);
    const firstRow = rows[0];
    if (!firstRow) continue;

    const aggregate = aggregateStats(rows);
    if (aggregate.minutes < minimumMinutes) continue;

    const candidates = candidatesByScope.get(scopeKey) ?? [];
    candidates.push({
      playerId: firstRow.playerId,
      scope: getScope(firstRow),
      rating: aggregate.rating,
    });
    candidatesByScope.set(scopeKey, candidates);
  }

  const candidates = [...candidatesByScope.values()].flatMap((scopeCandidates) =>
    scopeCandidates.sort((a, b) => b.rating - a.rating).slice(0, 8),
  );

  return pairScopeEntries(candidates, context);
}

function pairScopeEntries(
  entries: PlayerScopeEntry[],
  context: ComparisonContext,
): ComparisonType[] {
  const comparisons: ComparisonType[] = [];

  for (let indexA = 0; indexA < entries.length; indexA += 1) {
    for (let indexB = indexA + 1; indexB < entries.length; indexB += 1) {
      const entryA = entries[indexA];
      const entryB = entries[indexB];

      if (entryA.playerId === entryB.playerId) continue;

      comparisons.push({
        id: `cmp-${crypto.randomUUID().slice(0, 8)}`,
        context,
        playerA: entryA.playerId,
        playerB: entryB.playerId,
        scopeA: entryA.scope,
        scopeB: entryB.scope,
      });
    }
  }

  return comparisons;
}

