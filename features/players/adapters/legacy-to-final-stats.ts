// Converts the old player stats format into the newer canonical store shape.

import fs from "fs";

/* To import the player biodata */
import { players } from "@/features/players/data/legacy/players";

/* To import the new player schema types */
import type {
  Club,
  Competition,
  FootballDataStore,
  Player,
  PlayerCareerStats,
  PlayerSeasonStats,
  Season,
} from "@/shared/types/stats-schema";
import type {
  CompetitionStats as LegacyCompetitionStats,
  SeasonStats as LegacySeasonStats,
  StatsType as LegacyStatsType,
} from "@/features/players/types/stats-legacy";

import allPlayerStatsLegacy from "@/features/players/data/legacy/index";

/* Items (club store, competition store) filtered from the uniqueness of ids for each player */

function uniqueById<T extends { id: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

/* Getting the season years (start and end) from a season label such as 23/24
   Returns 2023 , 2024 */

function seasonYearFromLabel(label: string): number {
  const parts = String(label ?? "").split("/");
  const start = Number(parts[0]);
  if (Number.isNaN(start)) return new Date().getFullYear();
  return start < 100 ? 2000 + start : start;
}

function seasonEndYearFromLabel(label: string): number {
  const parts = String(label ?? "").split("/");
  const end = Number(parts[1]);
  if (Number.isNaN(end)) return seasonYearFromLabel(label) + 1;
  return end < 100 ? 2000 + end : end;
}

/* Ensure that a value is a finite number, otherwise return 0 */

function ensureNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

/* Map the full stats of each player into the new format*/

function mapSeasonStats(
  playerId: string,
  season: LegacySeasonStats,
  competition: LegacyCompetitionStats,
  clubId: string,
): PlayerSeasonStats {
  const stats = competition.stats ?? {};
  const appearances = ensureNumber(stats.appearances ?? stats.matchesPlayed);
  const seasonId = season.season.trim();
  const competitionId = competition.id;

  return {
    id: `${playerId}:${seasonId}:${competitionId}`,
    playerId,
    seasonId,
    clubId,
    competitionId,
    appearances,
    starts: ensureNumber(stats.matchesPlayed),
    minutes: ensureNumber(stats.minutes),
    goals: ensureNumber(stats.goals),
    assists: ensureNumber(stats.assists),
    shots: ensureNumber(stats.shots ?? stats.totalShots),
    shotsOnTarget: ensureNumber(stats.shotsOnTarget),
    keyPasses: ensureNumber(stats.keyPasses),
    chancesCreated: ensureNumber(stats.chancesCreated),
    dribbles: ensureNumber(stats.dribbles),
    dribblesCompleted:
      stats.dribblesCompleted !== undefined
        ? ensureNumber(stats.dribblesCompleted)
        : undefined,
    interceptions: ensureNumber(stats.interceptions),
    tackles: ensureNumber(stats.tackles),
    dribbledPast: ensureNumber(stats.dribbledPast),
    clearances: ensureNumber(stats.clearances),
    groundDuelsWon: ensureNumber(stats.groundDuelsWon),
    blockedShots: ensureNumber(stats.blockedShots),
    yellowCards: ensureNumber(stats.yellowCards),
    yellowToRedCards: ensureNumber(stats.yellowToRedCards),
    redCards: ensureNumber(stats.redCards),
    rating: ensureNumber(stats.footyRating),
    source: "legacy",
    updatedAt: new Date().toISOString(),
  };
}

/* Aggregate the season stats of each player into career stats */

function aggregateCareerStats(
  playerId: string,
  seasonRows: PlayerSeasonStats[],
): PlayerCareerStats {
  const totals = seasonRows.reduce(
    (accumulator, row) => ({
      appearances: accumulator.appearances + row.appearances,
      starts: accumulator.starts + ensureNumber(row.starts),
      minutes: accumulator.minutes + row.minutes,
      goals: accumulator.goals + row.goals,
      assists: accumulator.assists + row.assists,
      shots: accumulator.shots + row.shots,
      shotsOnTarget: accumulator.shotsOnTarget + row.shotsOnTarget,
      keyPasses: accumulator.keyPasses + row.keyPasses,
      chancesCreated: accumulator.chancesCreated + row.chancesCreated,
      dribbles: accumulator.dribbles + row.dribbles,
      dribblesCompleted:
        accumulator.dribblesCompleted + ensureNumber(row.dribblesCompleted),
      interceptions: accumulator.interceptions + row.interceptions,
      tackles: accumulator.tackles + row.tackles,
      dribbledPast: accumulator.dribbledPast + row.dribbledPast,
      clearances: accumulator.clearances + row.clearances,
      groundDuelsWon: accumulator.groundDuelsWon + row.groundDuelsWon,
      blockedShots: accumulator.blockedShots + row.blockedShots,
      yellowCards: accumulator.yellowCards + row.yellowCards,
      yellowToRedCards: accumulator.yellowToRedCards + row.yellowToRedCards,
      redCards: accumulator.redCards + row.redCards,
      ratingSum:
        accumulator.ratingSum + ensureNumber(row.rating) * row.appearances,
      ratingAppearances: accumulator.ratingAppearances + row.appearances,
    }),
    {
      appearances: 0,
      starts: 0,
      minutes: 0,
      goals: 0,
      assists: 0,
      shots: 0,
      shotsOnTarget: 0,
      keyPasses: 0,
      chancesCreated: 0,
      dribbles: 0,
      dribblesCompleted: 0,
      interceptions: 0,
      tackles: 0,
      dribbledPast: 0,
      clearances: 0,
      groundDuelsWon: 0,
      blockedShots: 0,
      yellowCards: 0,
      yellowToRedCards: 0,
      redCards: 0,
      ratingSum: 0,
      ratingAppearances: 0,
    },
  );

  const averageRating =
    totals.ratingAppearances > 0
      ? totals.ratingSum / totals.ratingAppearances
      : 0;

  return {
    id: playerId,
    playerId,
    appearances: totals.appearances,
    starts: totals.starts,
    minutes: totals.minutes,
    goals: totals.goals,
    assists: totals.assists,
    shots: totals.shots,
    shotsOnTarget: totals.shotsOnTarget,
    keyPasses: totals.keyPasses,
    chancesCreated: totals.chancesCreated,
    dribbles: totals.dribbles,
    dribblesCompleted: totals.dribblesCompleted,
    interceptions: totals.interceptions,
    tackles: totals.tackles,
    dribbledPast: totals.dribbledPast,
    clearances: totals.clearances,
    groundDuelsWon: totals.groundDuelsWon,
    blockedShots: totals.blockedShots,
    yellowCards: totals.yellowCards,
    yellowToRedCards: totals.yellowToRedCards,
    redCards: totals.redCards,
    averageRating,
    source: "legacy",
    updatedAt: new Date().toISOString(),
  };
}

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

  return uniqueById(
    fromPlayers,
  ); /* To ensure that the club ids are unique for each player */
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

  const totalPlayerStats: PlayerSeasonStats[] =
    []; /* To hold the season and competition stats for all players */
  const totalPlayerCareerStats: PlayerCareerStats[] =
    []; /* To hold the aggregated career stats for all players */

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
