import canonicalStoreNew from "@/features/players/data/new/canonical-store.json"
import { FootballDataStore, Player } from "@/shared/types/stats-schema"
import { BaseComparisonType, ComparisonContext, ComparisonScope } from "../types/comparison-main-type";

const canonicalStore = canonicalStoreNew as FootballDataStore;

const players = canonicalStore.players;
const stats = canonicalStore.totalPlayerStats;

function pairUpComps(
  playerIds: Set<string>,
  playersById: Map<string, Player>,
  contextId: ComparisonContext,
  scope: ComparisonScope,
) {

  const comparisons: BaseComparisonType[] = [];
  const eligiblePlayers = [...playerIds]
    .map(id => playersById.get(id))
    .filter((p) : p is Player => Boolean(p));

  for (let i = 0; i < eligiblePlayers.length; i++) {
    for (let j = i + 1; j < eligiblePlayers.length; j++) {
      comparisons.push({
        id: "cmp-" + crypto.randomUUID().slice(0, 8),
        context: contextId,
        playerA: eligiblePlayers[i].id,
        playerB: eligiblePlayers[j].id,
        scopeA: scope,
        scopeB: scope,
      })
    }
  }

  return comparisons;
}

function generateSeasonComparisons() {
  const seasonComps: BaseComparisonType[] = [];

  const playersById = new Map(players.map(player => [player.id, player]));
  const seasonIndex = new Map<string, Set<string>>();

  for (const stat of stats) {
    if (!seasonIndex.has(stat.seasonId)) seasonIndex.set(stat.seasonId, new Set());
    seasonIndex.get(stat.seasonId)?.add(stat.playerId);
  }

  for (const [seasonId, playerIds] of seasonIndex) {
    seasonComps.push(...pairUpComps(playerIds, playersById, "CTX-SEASON", {seasonId}))
  }

  return seasonComps;
}


function generateLeagueSeasonComparisons() {
  const leagueSeasonComps: BaseComparisonType[] = [];

  const playersById = new Map(players.map(player => [player.id, player]));
  const leagueSeasonIndex = new Map<string, Set<string>>();

  for (const stat of stats) {
    if (stat.competitionType !== "league") continue;
    const key = `${stat.seasonId}:${stat.competitionId}`;
    if (!leagueSeasonIndex.has(key)) leagueSeasonIndex.set(key, new Set<string>());
    leagueSeasonIndex.get(key)?.add(stat.playerId);
  }

  for (const [key, playerIds] of leagueSeasonIndex) {
    const [seasonId, competitionId] = key.split(":");
    leagueSeasonComps.push(...pairUpComps(playerIds, playersById, "CTX-LEAGUE-SEASON", {seasonId, leagueId: competitionId}))
  }

  return leagueSeasonComps;
}


function generateCompetitionSeasonComparisons() {
  const compSeasonComps: BaseComparisonType[] = [];

  const playersById = new Map(players.map(player => [player.id, player]));
  const compSeasonIndex = new Map<string, Set<string>>();

  for (const stat of stats) {
    if (stat.competitionType === "league") continue;
    const key = `${stat.seasonId}:${stat.competitionId}`;
    if (!compSeasonIndex.has(key)) compSeasonIndex.set(key, new Set<string>());
    compSeasonIndex.get(key)?.add(stat.playerId);
  }

  for (const [key, playerIds] of compSeasonIndex) {
    const [seasonId, competitionId] = key.split(":");
    compSeasonComps.push(...pairUpComps(playerIds, playersById, "CTX-COMPETITION-SEASON", {seasonId, competitionId}))
  }

  return compSeasonComps;
}


function generateLeagueCareerComparisons() {
  const playersById = new Map(players.map(p => [p.id, p]));
  const byLeague = new Map<string, Set<string>>();

  for (const stat of stats) {
    if (stat.competitionType !== "league") continue;
    if (!byLeague.has(stat.competitionId)) byLeague.set(stat.competitionId, new Set());
    byLeague.get(stat.competitionId)!.add(stat.playerId);
  }
  const comparisons: BaseComparisonType[] = [];
  for (const [leagueId, playerIds] of byLeague) {
    comparisons.push(...pairUpComps(playerIds, playersById, "CTX-LEAGUE-CAREER", { leagueId }));
  }
  return comparisons;
}


function generateCompetitionCareerComparisons() {
  const playersById = new Map(players.map(p => [p.id, p]));
  const byCompetition = new Map<string, Set<string>>();

  for (const stat of stats) {
    if (stat.competitionType === "league") continue;
    if (!byCompetition.has(stat.competitionId)) byCompetition.set(stat.competitionId, new Set());
    byCompetition.get(stat.competitionId)!.add(stat.playerId);
  }

  const comparisons: BaseComparisonType[] = [];
  for (const [competitionId, playerIds] of byCompetition) {
    comparisons.push(
      ...pairUpComps(playerIds, playersById, "CTX-COMPETITION-CAREER", { competitionId })
    );
  }
  return comparisons;
}


function generateOverallCareerComparisons() {
  const playersById = new Map(players.map(p => [p.id, p]));
  const playerIds = new Set(stats.map(stat => stat.playerId));

  return pairUpComps(playerIds, playersById, "CTX-OVERALL-CAREER", {});
}


export function generateAllBaseComparisons() {
  return [
    ...generateSeasonComparisons(),
    ...generateLeagueSeasonComparisons(),
    ...generateCompetitionSeasonComparisons(),
    ...generateLeagueCareerComparisons(),
    ...generateCompetitionCareerComparisons(),
    ...generateOverallCareerComparisons()
  ];
}
