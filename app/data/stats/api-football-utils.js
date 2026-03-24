import { players } from "../players";

const LEAGUE_ID_MAP = {
  world_cup: 1,
  ucl: 2,
  euro: 4,
  nations_league: 5,
  acl: 17,
  epl: 39,
  fa_cup: 45,
  carabao_cup: 48,
  ligue1: 61,
  bundesliga: 78,
  argentina_primera: 128,
  argentine_primera: 128,
  serie_a: 135,
  laliga: 140,
  copa_del_rey: 143,
  mls: 253,
  spl: 307,
};

const PLAYER_ID_MAP = {
  ronaldo: 874,
  messi: 154,
  neymar: 276,
  benzema: 332,
  doue: 58219,
  yamal: 162291,
  alvarez: 1100,
  bellingham: 152463,
  foden: 5519,
  haaland: 11086,
  lewandowski: 519,
  pedri: 47832,
  rodri: 1627,
  vinicius: 20594,
  winaldum: 1609,
  mbappe: 276,
};

function toSlug(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function hashId(value, seed = 1000) {
  const text = String(value ?? "");
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) % 100000;
  }
  return seed + hash;
}

function seasonToYear(season) {
  if (!season || typeof season !== "string") return new Date().getFullYear();
  const parts = season.split("/");
  const start = Number(parts[0]);
  if (Number.isNaN(start)) return new Date().getFullYear();
  return start < 100 ? 2000 + start : start;
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

function parseRating(value) {
  if (typeof value === "number") return value.toFixed(1);
  return String(value ?? "0.0");
}

function getLeagueId(competitionId) {
  return LEAGUE_ID_MAP[competitionId] ?? hashId(competitionId, 200);
}

function buildApiRow({
  legacyStats,
  season,
  competition,
  playerProfile,
  playerApiId,
}) {
  const leagueId = getLeagueId(competition.id);
  const seasonYear = seasonToYear(season.season);
  const teamName = legacyStats?.team ?? competition.name;

  return {
    player: {
      id: playerApiId,
      name: playerProfile?.name ?? legacyStats.id,
      firstname:
        playerProfile?.firstname ?? splitName(playerProfile?.name).firstname,
      lastname:
        playerProfile?.lastname ?? splitName(playerProfile?.name).lastname,
      age: legacyStats.age,
      birth: {
        date: `${playerProfile?.birthYear ?? 2000}-01-01`,
        place: null,
        country: playerProfile?.nationality ?? null,
      },
      nationality: playerProfile?.nationality ?? null,
      height: `${legacyStats.height} cm`,
      weight: null,
      injured: false,
      photo: playerProfile?.image ?? "/images/default-player.png",
    },
    team: {
      id: hashId(teamName, 500),
      name: teamName,
      logo: `/images/${toSlug(teamName)}.png`,
    },
    league: {
      id: leagueId,
      name: competition.name,
      country: null,
      logo: `/images/${toSlug(competition.name)}.png`,
      flag: null,
      season: seasonYear,
    },
    games: {
      appearences: legacyStats.matchesPlayed,
      lineups: legacyStats.matchesPlayed,
      minutes: legacyStats.minutes,
      number: null,
      position: "Attacker",
      rating: parseRating(legacyStats.footyRating),
      captain: false,
    },
    substitutes: {
      in: 0,
      out: 0,
      bench: 0,
    },
    shots: {
      total: legacyStats.totalShots,
      on: legacyStats.shotsOnTarget,
    },
    goals: {
      total: legacyStats.goals,
      conceded: 0,
      assists: legacyStats.assists,
      saves: null,
    },
    passes: {
      total: null,
      key: legacyStats.keyPasses,
      accuracy: null,
    },
    tackles: {
      total: legacyStats.tackles,
      blocks: legacyStats.blockedShots,
      interceptions: legacyStats.interceptions,
    },
    duels: {
      total: null,
      won: legacyStats.groundDuelsWon,
    },
    dribbles: {
      attempts: legacyStats.dribbles,
      success: legacyStats.dribblesCompleted ?? null,
      past: legacyStats.dribbledPast,
    },
    fouls: {
      drawn: null,
      committed: null,
    },
    cards: {
      yellow: legacyStats.yellowCards,
      yellowred: legacyStats.yellowToRedCards,
      red: legacyStats.redCards,
    },
    penalty: {
      won: null,
      commited: null,
      scored: null,
      missed: null,
      saved: null,
    },
  };
}

export function buildApiFootballStatsFromLegacy(legacyPlayerStats) {
  const playerProfile = players.find(
    (player) => player.id === legacyPlayerStats.id,
  );
  const { firstname, lastname } = splitName(
    playerProfile?.name ?? legacyPlayerStats.id,
  );
  const playerApiId =
    playerProfile?.apiFootball?.response?.[0]?.player?.id ??
    PLAYER_ID_MAP[legacyPlayerStats.id] ??
    hashId(legacyPlayerStats.id, 1000);

  const response = legacyPlayerStats.seasons.flatMap((season) =>
    season.competitions.map((competition) =>
      buildApiRow({
        legacyStats: competition.stats,
        season,
        competition,
        playerProfile: {
          ...playerProfile,
          firstname,
          lastname,
        },
        playerApiId,
      }),
    ),
  );

  return {
    get: "players/statistics",
    parameters: {
      id: String(playerApiId),
      season: "all",
    },
    errors: [],
    results: response.length,
    response,
  };
}
