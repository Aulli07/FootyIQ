import canonicalStoreNew from "@/features/players/data/new/canonical-store.json";
import { FootballDataStore } from "@/shared/types/stats-schema";
import {
  BaseComparisonType,
  ComparisonContext,
  ComparisonScope,
} from "../types/comparison-main-type";

const canonicalStore = canonicalStoreNew as FootballDataStore;
const stats = canonicalStore.totalPlayerStats;

type PlayerScopeEntry = {
  playerId: string;
  scope: ComparisonScope;
};
 
function pairScopeEntries(
  entries: PlayerScopeEntry[],
  context: ComparisonContext,
): BaseComparisonType[] {
  const comparisons: BaseComparisonType[] = [];

  for (let indexA = 0; indexA < entries.length; indexA += 1) {
    for (let indexB = indexA + 1; indexB < entries.length; indexB += 1) {
      const entryA = entries[indexA];
      const entryB = entries[indexB];

      // A player should never be compared to themself in another scope.j
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

function uniqueEntries(entries: PlayerScopeEntry[]): PlayerScopeEntry[] {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    const key = `${entry.playerId}:${JSON.stringify(entry.scope)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function generateSeasonComparisons() {
  return pairScopeEntries(
    uniqueEntries(stats.map((stat) => ({
      playerId: stat.playerId,
      scope: { seasonId: stat.seasonId },
    }))),
    "CTX-SEASON",
  );
}

function generateLeagueSeasonComparisons() {
  return pairScopeEntries(
    uniqueEntries(stats
      .filter((stat) => stat.competitionType === "league")
      .map((stat) => ({
        playerId: stat.playerId,
        scope: { seasonId: stat.seasonId, leagueId: stat.competitionId },
      }))),
    "CTX-LEAGUE-SEASON",
  );
}

function generateCompetitionSeasonComparisons() {
  return pairScopeEntries(
    uniqueEntries(stats
      .filter((stat) => stat.competitionType !== "league")
      .map((stat) => ({
        playerId: stat.playerId,
        scope: { seasonId: stat.seasonId, competitionId: stat.competitionId },
      }))),
    "CTX-COMPETITION-SEASON",
  );
}

function generateLeagueCareerComparisons() {
  return pairScopeEntries(
    uniqueEntries(stats
      .filter((stat) => stat.competitionType === "league")
      .map((stat) => ({ playerId: stat.playerId, scope: { leagueId: stat.competitionId } }))),
    "CTX-LEAGUE-CAREER",
  );
}

function generateCompetitionCareerComparisons() {
  return pairScopeEntries(
    uniqueEntries(stats
      .filter((stat) => stat.competitionType !== "league")
      .map((stat) => ({ playerId: stat.playerId, scope: { competitionId: stat.competitionId } }))),
    "CTX-COMPETITION-CAREER",
  );
}

function generateOverallCareerComparisons() {
  return pairScopeEntries(
    uniqueEntries(stats.map((stat) => ({ playerId: stat.playerId, scope: {} }))),
    "CTX-OVERALL-CAREER",
  );
}

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
