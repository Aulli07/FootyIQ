import { allPlayerStatsLegacy } from "./index.js";
import { buildCanonicalStoreFromLegacy } from "./adapters/legacy-to-api-football";

export const footballDataStore =
  buildCanonicalStoreFromLegacy(allPlayerStatsLegacy);

export const canonicalPlayers = footballDataStore.players;
export const canonicalClubs = footballDataStore.clubs;
export const canonicalCompetitions = footballDataStore.competitions;
export const canonicalSeasons = footballDataStore.seasons;
export const canonicalPlayerSeasonStats = footballDataStore.playerSeasonStats;
export const canonicalPlayerMatchStats = footballDataStore.playerMatchStats;
export const canonicalPlayerCareerStats = footballDataStore.playerCareerStats;
