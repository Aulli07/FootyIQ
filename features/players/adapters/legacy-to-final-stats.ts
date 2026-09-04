// Converts the old player stats format into the newer canonical store shape.

import fs from "fs";

import { players as legacyPlayers } from "../data/legacy/players";
import type { StatsType as LegacyStatsType } from "../types/stats-legacy";
import allPlayerStatsLegacy from "../data/legacy/index";
import { uniqueById, seasonEndYearFromLabel, seasonYearFromLabel } from "../utils/adapter-utils";
import { mapSeasonStats } from "../selectors/map-season-stats";

import type {
  Club,
  Competition,
  FootballDataStore,
  Player,
  PlayerSeasonStats,
  Season,
} from "@/shared/types/stats-schema";




/* Build the players store from the legacy stats */
function buildPlayers(): Player[] {
  return legacyPlayers.map((player) => ({
    id: normalizeId(player.id),
    fullName: player.name,
    nationality: player.nationality,
    dateOfBirth: `${player.birthYear}-01-01`,
    heightCm: player.heightCm,
    primaryPosition: player.position,
    imageUrl: player.image,
    currentClubId: normalizeId(player.currentClubId),
    active: true,
  }));
}

/* Build the unique clubs store from the legacy stats for every player */
function buildClubs(): Club[] {
  const fromPlayers: Club[] = legacyPlayers.map((player) => ({
    id: normalizeId(player.currentClubId),
    name: player.team,
    country: player.teamCountry,
  }));

  return uniqueById(fromPlayers);
}

/* Build the competitions store from the legacy stats */
function buildCompetitions(legacyStats: LegacyStatsType[]): Competition[] {
  const allCompetitions: Competition[] = legacyStats.flatMap((playerStats) =>
    playerStats.seasons.flatMap((season) =>
      season.competitions.map((competition) => ({
        id: normalizeId(competition.id || competition.name),
        name: competition.name,
        type: (competition as any).type ? (competition as any).type.toLowerCase() : inferCompetitionType(competition.name, competition.id),
        aliases: [(competition.id || competition.name).toString()],
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

  legacyStats.forEach((playerStats) => {
    const legacyPlayer = playersStore.find((player) => player.id === normalizeId(playerStats.id));

    playerStats.seasons.forEach((season) => {
      const clubId = normalizeId(season.clubId || legacyPlayer?.currentClubId || "unknown-club");
      season.competitions.forEach((competition) => {
        const compId = normalizeId(competition.id || competition.name);
        const row = mapSeasonStats(normalizeId(playerStats.id), season, competition, clubId);

        
        // attach canonical competitionId and type
        const competitionMeta = competitionsStore.find((c) => c.id === compId);
        (row as any).competitionId = competitionMeta?.id ?? compId;
        (row as any).competitionType = competitionMeta?.type ?? inferCompetitionType(competition.name, competition.id);

        // ensure club id normalized
        (row as any).clubId = clubId;

        totalPlayerStats.push(row);
      });
    });
  });

  return {
    players: playersStore,
    clubs: clubsStore,
    competitions: competitionsStore,
    seasons: seasonsStore,
    totalPlayerStats
  };
}

/* Precompute canonical store at module load so other modules can import it.
   This writes the canonical JSON to disk and exports the store. */
const footballDataStore = buildCanonicalStoreFromLegacy(allPlayerStatsLegacy);
fs.writeFileSync(
  "features/players/data/new/canonical-store.json",
  JSON.stringify(footballDataStore, null, 2),
);

export default footballDataStore;

/* Helpers used by this adapter */
function normalizeId(id?: string) {
  return (id || "unknown").toString().trim().toLowerCase().replace(/[_\s]+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function inferCompetitionType(name = "", id = ""): "league" | "cup" | "continental" | "international" {
  const n = (name || "").toLowerCase();
  const i = (id || "").toLowerCase();
  if (/champions|uefa|europa|acl|continental/.test(n) || /ucl|uel|acl/.test(i)) return "continental";
  if (/world|fifa|international|club-world|world-cup/.test(n) || /world|club_world|club-world/.test(i)) return "international";
  if (/cup|fa|carabao|copa|king|club/.test(n) || /cup/.test(i)) return "cup";
  return "league";
}
