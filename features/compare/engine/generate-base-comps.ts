import canonicalStoreNew from "@/data/processed/canonical-store.json";
import { FootballDataStore } from "@/shared/types/stats-schema";
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
  const entry = stats.map((stat) => ({
    playerId: stat.playerId,
    scope: { seasonId: stat.seasonId },
  }));
  return pairScopeEntries(uniqueEntries(entry), "CTX-SEASON");
}

function generateLeagueSeasonComparisons() {
  const entry = stats
    .filter((stat) => stat.competitionType === "league")
    .map((stat) => ({
      playerId: stat.playerId,
      scope: { seasonId: stat.seasonId, leagueId: stat.competitionId },
    }));
  return pairScopeEntries(uniqueEntries(entry), "CTX-LEAGUE-SEASON");
}

function generateCompetitionSeasonComparisons() {
  const entry = stats
    .filter((stat) => stat.competitionType !== "league")
    .map((stat) => ({
      playerId: stat.playerId,
      scope: { seasonId: stat.seasonId, competitionId: stat.competitionId },
    }));
  return pairScopeEntries(uniqueEntries(entry), "CTX-COMPETITION-SEASON");
}

function generateLeagueCareerComparisons() {
  const entry = stats
    .filter((stat) => stat.competitionType === "league")
    .map((stat) => ({
      playerId: stat.playerId,
      scope: { leagueId: stat.competitionId },
    }));
  return pairScopeEntries(uniqueEntries(entry), "CTX-LEAGUE-CAREER");
}

function generateCompetitionCareerComparisons() {
  const entry = stats
    .filter((stat) => stat.competitionType !== "league")
    .map((stat) => ({
      playerId: stat.playerId,
      scope: { competitionId: stat.competitionId },
    }));
  return pairScopeEntries(uniqueEntries(entry), "CTX-COMPETITION-CAREER");
}

function generateOverallCareerComparisons() {
  const entry = stats.map((stat) => ({
    playerId: stat.playerId,
    scope: {},
  }));
  return pairScopeEntries(uniqueEntries(entry), "CTX-OVERALL-CAREER");
}

type PlayerScopeEntry = {
  playerId: string;
  scope: ComparisonScope;
};

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

function uniqueEntries(entries: PlayerScopeEntry[]): PlayerScopeEntry[] {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    const key = `${entry.playerId}:${JSON.stringify(entry.scope)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
