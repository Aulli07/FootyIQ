// Central store that turns legacy player stats into the app-friendly format.

import { allPlayerStatsLegacy } from "./index.js";
import { buildCanonicalStoreFromLegacy } from "./adapters/legacy-to-api-football";
import { Club, Competition, Season } from "../../types/stats-schema.js";

export const footballDataStore =
  buildCanonicalStoreFromLegacy(allPlayerStatsLegacy);

export const canonicalPlayers = footballDataStore.players;
export const canonicalClubs = footballDataStore.clubs;
export const canonicalCompetitions = footballDataStore.competitions;
export const canonicalSeasons = footballDataStore.seasons;
export const canonicalPlayerSeasonStats = footballDataStore.playerSeasonStats;
export const canonicalPlayerMatchStats = footballDataStore.playerMatchStats;
export const canonicalPlayerCareerStats = footballDataStore.playerCareerStats;

export function getCanonicalPlayerById(playerId: string) {
  return canonicalPlayers.find((player) => player.id === playerId) ?? null;
}

export function getCanonicalClubById(clubId: string) {
  return canonicalClubs.find((club: Club) => club.id === clubId) ?? null;
}

export function getCanonicalCompetitionById(competitionId: string) {
  return (
    canonicalCompetitions.find(
      (competition: Competition) => competition.id === competitionId,
    ) ?? null
  );
}

export function getCanonicalSeasonById(seasonId: string) {
  return (
    canonicalSeasons.find((season: Season) => season.id === seasonId) ?? null
  );
}

export function getCanonicalPlayerSeasonRows(playerId: string) {
  return canonicalPlayerSeasonStats.filter((row) => row.playerId === playerId);
}

export function getCanonicalPlayerSeasonRowsBySeasonLabel(
  playerId: string,
  seasonLabel: string,
) {
  const season = canonicalSeasons.find(
    (entry: Season) => entry.label === seasonLabel,
  );

  if (!season) {
    return [];
  }

  return canonicalPlayerSeasonStats.filter(
    (row) => row.playerId === playerId && row.seasonId === season.id,
  );
}

export function getCanonicalPlayerCareerStats(playerId: string) {
  return (
    canonicalPlayerCareerStats.find((career) => career.playerId === playerId) ??
    null
  );
}

export function getCanonicalPlayerCompetitionIds(playerId: string) {
  return Array.from(
    new Set(
      getCanonicalPlayerSeasonRows(playerId).map((row) => row.competitionId),
    ),
  );
}

export function getCanonicalPlayerSeasonLabels(playerId: string) {
  return Array.from(
    new Set(getCanonicalPlayerSeasonRows(playerId).map((row) => row.seasonId)),
  )
    .map((seasonId) => getCanonicalSeasonById(seasonId)?.label ?? seasonId)
    .filter(Boolean);
}
