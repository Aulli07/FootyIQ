import { players } from "../../players";
import { clubs as clubMap } from "../../clubs";

const COMPETITION_META = {
  epl: {
    type: "league",
    country: "England",
    tier: 1,
    logoUrl: "/images/epl.png",
  },
  laliga: {
    type: "league",
    country: "Spain",
    tier: 1,
    logoUrl: "/images/laliga.png",
  },
  ligue1: {
    type: "league",
    country: "France",
    tier: 1,
    logoUrl: "/images/ligue1.png",
  },
  serie_a: {
    type: "league",
    country: "Italy",
    tier: 1,
    logoUrl: "/images/serie-a.png",
  },
  bundesliga: {
    type: "league",
    country: "Germany",
    tier: 1,
    logoUrl: "/images/bundesliga.png",
  },
  mls: { type: "league", country: "USA", tier: 1, logoUrl: "/images/mls.png" },
  spl: {
    type: "league",
    country: "Saudi Arabia",
    tier: 1,
    logoUrl: "/images/spl.png",
  },
  ucl: {
    type: "continental",
    country: "Europe",
    tier: 1,
    logoUrl: "/images/ucl.png",
  },
  acl: {
    type: "continental",
    country: "Asia",
    tier: 1,
    logoUrl: "/images/acl.png",
  },
  copa_del_rey: {
    type: "cup",
    country: "Spain",
    tier: 1,
    logoUrl: "/images/copa-del-rey.png",
  },
  world_cup: {
    type: "international",
    country: "World",
    tier: 1,
    logoUrl: "/images/world-cup.png",
  },
};

const TEAM_TO_CLUB_ID = {
  "Al Nassr": "alnassr",
  "Inter Miami": "intermiami",
  "Santos FC": "santos",
  "Al-Ittihad": "alittihad",
  "Paris Saint-Germain": "psg",
  "FC Barcelona": "barcelona",
  Barcelona: "barcelona",
  "Manchester City": "manchester_city",
  "Real Madrid": "real_madrid",
  "Atlético Madrid": "atletico_madrid",
  "Al-Hilal": "alhilal",
  "Al-Ettifaq": "alettifaq",
};

function toSlug(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeFoot(value) {
  const foot = String(value ?? "")
    .trim()
    .toLowerCase();
  if (foot === "left" || foot === "right" || foot === "both") return foot;
  return "both";
}

function slugifySeason(label) {
  const parts = String(label ?? "").split("/");
  if (parts.length !== 2) return toSlug(label);
  const start = Number(parts[0]);
  const end = Number(parts[1]);
  if (Number.isNaN(start) || Number.isNaN(end)) return toSlug(label);
  const fullStart = start < 100 ? 2000 + start : start;
  const fullEnd = end < 100 ? 2000 + end : end;
  return `${fullStart}-${fullEnd}`;
}

function seasonYearFromLabel(label) {
  const parts = String(label ?? "").split("/");
  const start = Number(parts[0]);
  if (Number.isNaN(start)) return new Date().getFullYear();
  return start < 100 ? 2000 + start : start;
}

function seasonEndYearFromLabel(label) {
  const parts = String(label ?? "").split("/");
  const end = Number(parts[1]);
  if (Number.isNaN(end)) return seasonYearFromLabel(label) + 1;
  return end < 100 ? 2000 + end : end;
}

function splitName(fullName) {
  const pieces = String(fullName ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (pieces.length === 0) return { firstname: "Unknown", lastname: "Player" };
  if (pieces.length === 1) return { firstname: pieces[0], lastname: "" };

  return {
    firstname: pieces[0],
    lastname: pieces.slice(1).join(" "),
  };
}

function ensureNumber(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function uniqueById(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function getClubIdFromTeam(teamName) {
  if (TEAM_TO_CLUB_ID[teamName]) return TEAM_TO_CLUB_ID[teamName];
  return toSlug(teamName);
}

function getClubNameById(clubId) {
  const club = Object.values(clubMap).find((entry) => entry.id === clubId);
  if (club) return club.name;

  const player = players.find(
    (entry) => getClubIdFromTeam(entry.team) === clubId,
  );
  return player?.team ?? clubId;
}

function getClubLogoById(clubId) {
  const club = Object.values(clubMap).find((entry) => entry.id === clubId);
  return club?.logo ?? `/clubs/${clubId}.png`;
}

function getCompetitionMeta(competitionId) {
  return (
    COMPETITION_META[competitionId] ?? {
      type: "other",
      country: undefined,
      tier: 1,
      logoUrl: `/images/${toSlug(competitionId)}.png`,
    }
  );
}

function createSeasonId(seasonLabel) {
  return slugifySeason(seasonLabel);
}

function mapSeasonStats(playerId, season, competition, clubId) {
  const stats = competition.stats ?? {};
  const appearances = ensureNumber(stats.appearances ?? stats.matchesPlayed);
  const seasonId = createSeasonId(season.season);
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

function aggregateCareerStats(playerId, legacyCareer, seasonRows) {
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
      ratingSum: accumulator.ratingSum + row.rating * row.appearances,
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
      : ensureNumber(legacyCareer?.averageRating);

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
    titlesWon: ensureNumber(legacyCareer?.titlesWon),
    awards: ensureNumber(legacyCareer?.awards),
    source: "legacy",
    updatedAt: new Date().toISOString(),
  };
}

function buildPlayers() {
  return players.map((player) => {
    const clubId = getClubIdFromTeam(player.team);

    return {
      id: player.id,
      fullName: player.name,
      slug: player.id,
      nationality: player.nationality,
      dateOfBirth: `${player.birthYear}-01-01`,
      heightCm: player.heightCm,
      preferredFoot: normalizeFoot(player.preferredFoot),
      primaryPosition: player.position,
      imageUrl: player.image,
      currentClubId: clubId,
      active: true,
    };
  });
}

function buildClubs() {
  const fromPlayers = players.map((player) => {
    const clubId = getClubIdFromTeam(player.team);
    return {
      id: clubId,
      name: player.team,
      country: player.nationality,
      logoUrl: getClubLogoById(clubId),
    };
  });

  const fromClubMap = Object.values(clubMap).map((club) => ({
    id: club.id,
    name: club.name,
    country: club.country,
    logoUrl: club.logo,
  }));

  return uniqueById([...fromClubMap, ...fromPlayers]);
}

function buildCompetitions(legacyStats) {
  const allCompetitions = legacyStats.flatMap((playerStats) =>
    playerStats.seasons.flatMap((season) =>
      season.competitions.map((competition) => ({
        id: competition.id,
        name: competition.name,
        ...getCompetitionMeta(competition.id),
      })),
    ),
  );

  return uniqueById(allCompetitions);
}

function buildSeasons(legacyStats) {
  const seasons = legacyStats.flatMap((playerStats) =>
    playerStats.seasons.map((season) => ({
      id: createSeasonId(season.season),
      label: season.season,
      startYear: seasonYearFromLabel(season.season),
      endYear: seasonEndYearFromLabel(season.season),
      isCurrent: season.season === "23/24",
    })),
  );

  return uniqueById(seasons);
}

export function buildCanonicalStoreFromLegacy(legacyStats) {
  const playersStore = buildPlayers();
  const clubsStore = buildClubs();
  const competitionsStore = buildCompetitions(legacyStats);
  const seasonsStore = buildSeasons(legacyStats);

  const playerSeasonStats = [];
  const playerCareerStats = [];

  legacyStats.forEach((playerStats) => {
    const legacyPlayer = playersStore.find(
      (player) => player.id === playerStats.id,
    );
    const seasonRows = [];

    playerStats.seasons.forEach((season) => {
      const clubId =
        season.clubId ||
        legacyPlayer?.currentClubId ||
        getClubIdFromTeam(legacyPlayer?.primaryPosition ?? "");

      season.competitions.forEach((competition) => {
        const row = mapSeasonStats(playerStats.id, season, competition, clubId);
        seasonRows.push(row);
        playerSeasonStats.push(row);
      });
    });

    playerCareerStats.push(
      aggregateCareerStats(playerStats.id, playerStats.career, seasonRows),
    );
  });

  return {
    players: playersStore,
    clubs: clubsStore,
    competitions: competitionsStore,
    seasons: seasonsStore,
    playerSeasonStats,
    playerMatchStats: [],
    playerCareerStats,
  };
}

export function buildApiFootballStatsFromLegacy(legacyStats) {
  return buildCanonicalStoreFromLegacy(legacyStats);
}
