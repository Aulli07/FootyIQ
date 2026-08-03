// Converts the old player stats format into the newer canonical store shape.

import fs from "fs";

import { players } from "../data/legacy/players";
import type { StatsType as LegacyStatsType } from "../types/stats-legacy";
import allPlayerStatsLegacy from "../data/legacy/index";
import { uniqueById, seasonEndYearFromLabel, seasonYearFromLabel } from "../utils/adapter-utils";
import { mapSeasonStats } from "../selectors/map-season-stats";
import { aggregateCareerStats } from "../selectors/map-career-stats";

import type {
  Club,
  Competition,
  FootballDataStore,
  Player,
  PlayerCareerStats,
  PlayerSeasonStats,
  Season,
} from "@/shared/types/stats-schema";




/* Build the players store from the legacy stats */
function buildPlayers(): Player[] {
  return players.map((player) => {
    return {
      id: player.id,
      fullName: player.name,
      nationality: player.nationality,
      dateOfBirth: `${player.birthYear}-01-01`,
      heightCm: player.heightCm,
      primaryPosition: player.position,
      imageUrl: player.image,
      currentClubId: player.currentClubId,
      active: true,
    };
  });
}

/* Build the unique clubs store from the legacy stats for every player */
function buildClubs(): Club[] {
  const fromPlayers: Club[] = players.map((player) => {
    return {
      id: player.currentClubId,
      name: player.team,
      country: player.nationality,
    };
  });

  return uniqueById(fromPlayers); /* To ensure that the club ids are unique for each player */
}

/* Build the competitions store from the legacy stats */
function buildCompetitions(legacyStats: LegacyStatsType[]): Competition[] {
  const allCompetitions: Competition[] = legacyStats.flatMap((playerStats) =>
    playerStats.seasons.flatMap((season) =>
      season.competitions.map((competition) => ({
        id: competition.id,
        name: competition.name,
      })),
    ),
  );

  return uniqueById(allCompetitions);
}

/* Build the seasons store from the legacy stats */
function buildSeasons(legacyStats: LegacyStatsType[]): Season[] {
  const seasons: Season[] = legacyStats.flatMap((playerStats) =>
    playerStats.seasons.map((season) => ({
      id: season.season.trim(),
      label: season.season,
      startYear: seasonYearFromLabel(season.season),
      endYear: seasonEndYearFromLabel(season.season),
      isCurrent: season.season === "23/24",
    })),
  );

  return uniqueById(seasons);
}

/* Main function to build the full canonical store of the app from the legacy stats or API football data */
export function buildCanonicalStoreFromLegacy(
  legacyStats: LegacyStatsType[],
): FootballDataStore {
  const playersStore = buildPlayers();
  const clubsStore = buildClubs();
  const competitionsStore = buildCompetitions(legacyStats);
  const seasonsStore = buildSeasons(legacyStats);

  const totalPlayerStats: PlayerSeasonStats[] = []; /* To hold the season and competition stats for all players */
  const totalPlayerCareerStats: PlayerCareerStats[] = []; /* To hold the aggregated career stats for all players */

  legacyStats.forEach((playerStats) => {
    const legacyPlayer = playersStore.find(
      (player) => player.id === playerStats.id,
    );
    const playerSeasonStats: PlayerSeasonStats[] = [];

    playerStats.seasons.forEach((season) => {
      const clubId =
        season.clubId || legacyPlayer?.currentClubId || "unknown-club";
      season.competitions.forEach((competition) => {
        const row = mapSeasonStats(playerStats.id, season, competition, clubId);

        playerSeasonStats.push(
          row,
        ); /* To accumulate the season stats for the current player, which will be used to calculate the career stats */

        totalPlayerStats.push(
          row,
        ); /* To accumulate the season stats for all players, which will be used in the app to display season and competition stats for each player */
      });
    });

    totalPlayerCareerStats.push(
      aggregateCareerStats(playerStats.id, playerSeasonStats),
    );
  });

  return {
    players: playersStore,
    clubs: clubsStore,
    competitions: competitionsStore,
    seasons: seasonsStore,
    totalPlayerStats,
    totalPlayerCareerStats,
  };
}


const footballDataStore = buildCanonicalStoreFromLegacy(allPlayerStatsLegacy);
fs.writeFileSync(
  "features/players/data/new/canonical-store.json",
  JSON.stringify(footballDataStore, null, 2),
);
