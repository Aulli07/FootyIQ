/* Canonical data store for football player stats, built from the legacy data source. */
/* This file serves as the main interface for accessing football player stats in a consistent format. */

import type {
  Club,
  Competition,
  FootballDataStore,
  Player,
  Season,
} from "@/shared/types/stats-schema";
import {
  PlayerCareerStats,
  PlayerSeasonStats,
} from "@/shared/types/stats-schema";
import { normalizeLabel } from "@/shared/utils/identity";

import footballDataStore from "@/features/players/data/new/canonical-store.json";

const canonicalStore = footballDataStore as FootballDataStore;

export const canonicalPlayers = canonicalStore.players;
export const canonicalClubs = canonicalStore.clubs;
export const canonicalCompetitions = canonicalStore.competitions;
export const canonicalSeasons = canonicalStore.seasons;
export const canonicalPlayerSeasonStats = canonicalStore.totalPlayerStats;
export const canonicalPlayerCareerStats = canonicalStore.totalPlayerCareerStats;

const canonicalPlayersById = new Map(
  canonicalPlayers.map((player) => [player.id, player]),
);
const canonicalPlayerIdsByName = new Map(
  canonicalPlayers.map((player) => [normalizeLabel(player.fullName), player.id]),
);
const canonicalClubsById = new Map(
  canonicalClubs.map((club) => [club.id, club]),
);
const canonicalCompetitionsById = new Map(
  canonicalCompetitions.map((competition) => [competition.id, competition]),
);
const canonicalSeasonsById = new Map(
  canonicalSeasons.map((season) => [season.id, season]),
);
const canonicalPlayerSeasonStatsByPlayerId = new Map<
  string,
  PlayerSeasonStats[]
>();

for (const row of canonicalPlayerSeasonStats) {
  const rows = canonicalPlayerSeasonStatsByPlayerId.get(row.playerId) ?? [];
  rows.push(row);
  canonicalPlayerSeasonStatsByPlayerId.set(row.playerId, rows);
}

const canonicalPlayerCareerStatsByPlayerId = new Map(
  canonicalPlayerCareerStats.map((career) => [career.playerId, career]),
);

export function getCanonicalPlayersByIds(playerIds: string[]): Player[] {
  return playerIds
    .map((playerId) => canonicalPlayersById.get(playerId))
    .filter((player): player is Player => player !== undefined);
}

/* To get the specific player from the canonical store */
export function getCanonicalPlayerById(playerId: string) {
  return canonicalPlayersById.get(playerId) ?? null;
}

export function getCanonicalPlayerIdByName(playerName: string) {
  return canonicalPlayerIdsByName.get(normalizeLabel(playerName)) ?? null;
}

/* To get the specific club from the canonical store */
export function getCanonicalClubById(clubId: string) {
  return canonicalClubsById.get(clubId) ?? null;
}

/* To get the specific competition from the canonical store e.g UCL */
export function getCanonicalCompetitionById(competitionId: string) {
  return canonicalCompetitionsById.get(competitionId) ?? null;
}

/* To get the specific season from the canonical store e.g 23/24 */
export function getCanonicalSeasonById(seasonId: string) {
  return canonicalSeasonsById.get(seasonId) ?? null;
}

/* To get the specific player season stats from the canonical store */
export function getCanonicalPlayerSeasonStats(playerId: string) {
  return canonicalPlayerSeasonStatsByPlayerId.get(playerId) ?? [];
}

/* To get the specific player season stats for a given season label from the canonical store e.g Haaland 23/24*/
export function getCanonicalPlayerSeasonStatsBySeasonLabel(
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

/* To get the specific player season stats for a given season label and competition id from the canonical store e.g Haaland 23/24 UCL*/
export function getCanonicalPlayerStatsBySeasonLabelAndCompetitionId(
  playerId: string,
  seasonLabel: string,
  competitionId: string,
) {
  const playerSeasonRows = getCanonicalPlayerSeasonStatsBySeasonLabel(
    playerId,
    seasonLabel,
  );

  return playerSeasonRows.filter((row) => row.competitionId === competitionId);
}

/* To get the specific player career stats from the canonical store */
export function getCanonicalPlayerCareerStats(playerId: string) {
  return canonicalPlayerCareerStatsByPlayerId.get(playerId) ?? null;
}

/* To get the unique competition ids for a given player from the canonical store */
export function getCanonicalPlayerCompetitionIds(playerId: string) {
  return Array.from(
    new Set(
      getCanonicalPlayerSeasonStats(playerId).map((row) => row.competitionId),
    ),
  );
}

/* To get the unique season labels for a given player from the canonical store */
export function getCanonicalPlayerSeasonLabels(playerId: string) {
  return Array.from(
    new Set(getCanonicalPlayerSeasonStats(playerId).map((row) => row.seasonId)),
  )
    .map((seasonId) => getCanonicalSeasonById(seasonId)?.label ?? seasonId)
    .filter(Boolean);
}

/* To get the unique season + competition labels for a given player from the canonical store */
export function getCanonicalPlayerSeasonAndCompetitionLabels(playerId: string) {
  return Array.from(
    new Set(
      getCanonicalPlayerSeasonStats(playerId).map(
        (row) =>
          row.competitionId + " " + getCanonicalSeasonById(row.seasonId)?.label,
      ),
    ),
  );
}

export function getCareer(playerId: string) {
  return getCanonicalPlayerCareerStats(playerId) as PlayerCareerStats | null;
}

export function getPlayerCompetitionIds(playerId: string) {
  return getCanonicalPlayerCompetitionIds(playerId);
}

export function getCareerRating(career?: PlayerCareerStats | null) {
  return career?.averageRating ?? 0;
}

export function getPlayerCompetitions(playerId: string): PlayerSeasonStats[] {
  return getCanonicalPlayerSeasonStats(playerId);
}
