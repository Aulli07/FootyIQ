const COMPETITION_ID_MAP = {
  140: "laliga",
  2: "ucl",
  143: "copa_del_rey",
  1: "world_cup",
  61: "ligue1",
};

const SEASON_LABEL_MAP = {
  2023: "23/24",
  2022: "22/23",
};

const PRIMARY_CLUB_BY_SEASON = {
  "23/24": {
    clubId: "real_madrid",
    team: "Real Madrid",
    league: "laliga",
  },
  "22/23": {
    clubId: "psg",
    team: "Paris Saint-Germain",
    league: "ligue1",
  },
};

// API-Football-like flat dataset (ready for backend swap later).
export const mbappeApiFootballStats = {
  get: "players/statistics",
  parameters: {
    id: "276",
    season: "all",
  },
  errors: [],
  results: 6,
  response: [
    {
      player: {
        id: 276,
        name: "Kylian Mbappé",
        firstname: "Kylian",
        lastname: "Mbappé",
        age: 25,
        birth: {
          date: "1998-12-20",
          place: "Paris",
          country: "France",
        },
        nationality: "France",
        height: "178 cm",
        weight: "73 kg",
        injured: false,
        photo: "/images/messi.jpg",
      },
      team: {
        id: 541,
        name: "Real Madrid",
        logo: "/images/real-madrid.png",
      },
      league: {
        id: 140,
        name: "La Liga",
        country: "Spain",
        logo: "/images/laliga.png",
        flag: "/images/spain.png",
        season: 2023,
      },
      games: {
        appearences: 31,
        lineups: 31,
        minutes: 2635,
        number: null,
        position: "Attacker",
        rating: "9.3",
        captain: false,
      },
      substitutes: {
        in: 1,
        out: 7,
        bench: 0,
      },
      shots: {
        total: 126,
        on: 62,
      },
      goals: {
        total: 26,
        conceded: 0,
        assists: 9,
        saves: null,
      },
      passes: {
        total: 818,
        key: 39,
        accuracy: 83,
      },
      tackles: {
        total: 6,
        blocks: 2,
        interceptions: 3,
      },
      duels: {
        total: 131,
        won: 98,
      },
      dribbles: {
        attempts: 58,
        success: 40,
        past: 2,
      },
      fouls: {
        drawn: 27,
        committed: 9,
      },
      cards: {
        yellow: 3,
        yellowred: 0,
        red: 0,
      },
      penalty: {
        won: 4,
        commited: 0,
        scored: 4,
        missed: 0,
        saved: 0,
      },
    },
    {
      player: {
        id: 276,
        name: "Kylian Mbappé",
        firstname: "Kylian",
        lastname: "Mbappé",
        age: 25,
        birth: {
          date: "1998-12-20",
          place: "Paris",
          country: "France",
        },
        nationality: "France",
        height: "178 cm",
        weight: "73 kg",
        injured: false,
        photo: "/images/messi.jpg",
      },
      team: {
        id: 541,
        name: "Real Madrid",
        logo: "/images/real-madrid.png",
      },
      league: {
        id: 2,
        name: "UEFA Champions League",
        country: "World",
        logo: "/images/ucl.png",
        flag: null,
        season: 2023,
      },
      games: {
        appearences: 11,
        lineups: 11,
        minutes: 958,
        number: null,
        position: "Attacker",
        rating: "9.1",
        captain: false,
      },
      substitutes: {
        in: 0,
        out: 3,
        bench: 0,
      },
      shots: {
        total: 42,
        on: 21,
      },
      goals: {
        total: 8,
        conceded: 0,
        assists: 4,
        saves: null,
      },
      passes: {
        total: 286,
        key: 14,
        accuracy: 84,
      },
      tackles: {
        total: 2,
        blocks: 1,
        interceptions: 1,
      },
      duels: {
        total: 44,
        won: 31,
      },
      dribbles: {
        attempts: 25,
        success: 16,
        past: 1,
      },
      fouls: {
        drawn: 10,
        committed: 4,
      },
      cards: {
        yellow: 1,
        yellowred: 0,
        red: 0,
      },
      penalty: {
        won: 1,
        commited: 0,
        scored: 1,
        missed: 0,
        saved: 0,
      },
    },
    {
      player: {
        id: 276,
        name: "Kylian Mbappé",
        firstname: "Kylian",
        lastname: "Mbappé",
        age: 25,
        birth: {
          date: "1998-12-20",
          place: "Paris",
          country: "France",
        },
        nationality: "France",
        height: "178 cm",
        weight: "73 kg",
        injured: false,
        photo: "/images/messi.jpg",
      },
      team: {
        id: 541,
        name: "Real Madrid",
        logo: "/images/real-madrid.png",
      },
      league: {
        id: 143,
        name: "Copa del Rey",
        country: "Spain",
        logo: "/images/copa-del-rey.png",
        flag: "/images/spain.png",
        season: 2023,
      },
      games: {
        appearences: 5,
        lineups: 5,
        minutes: 418,
        number: null,
        position: "Attacker",
        rating: "8.8",
        captain: false,
      },
      substitutes: {
        in: 0,
        out: 2,
        bench: 0,
      },
      shots: {
        total: 18,
        on: 9,
      },
      goals: {
        total: 4,
        conceded: 0,
        assists: 2,
        saves: null,
      },
      passes: {
        total: 128,
        key: 6,
        accuracy: 82,
      },
      tackles: {
        total: 1,
        blocks: 1,
        interceptions: 0,
      },
      duels: {
        total: 16,
        won: 11,
      },
      dribbles: {
        attempts: 10,
        success: 6,
        past: 0,
      },
      fouls: {
        drawn: 4,
        committed: 1,
      },
      cards: {
        yellow: 1,
        yellowred: 0,
        red: 0,
      },
      penalty: {
        won: 0,
        commited: 0,
        scored: 0,
        missed: 0,
        saved: 0,
      },
    },
    {
      player: {
        id: 276,
        name: "Kylian Mbappé",
        firstname: "Kylian",
        lastname: "Mbappé",
        age: 25,
        birth: {
          date: "1998-12-20",
          place: "Paris",
          country: "France",
        },
        nationality: "France",
        height: "178 cm",
        weight: "73 kg",
        injured: false,
        photo: "/images/messi.jpg",
      },
      team: {
        id: 2,
        name: "France",
        logo: "/images/france.png",
      },
      league: {
        id: 1,
        name: "FIFA World Cup",
        country: "World",
        logo: "/images/world-cup.png",
        flag: null,
        season: 2023,
      },
      games: {
        appearences: 7,
        lineups: 7,
        minutes: 630,
        number: 10,
        position: "Attacker",
        rating: "9.0",
        captain: false,
      },
      substitutes: {
        in: 0,
        out: 1,
        bench: 0,
      },
      shots: {
        total: 30,
        on: 15,
      },
      goals: {
        total: 5,
        conceded: 0,
        assists: 3,
        saves: null,
      },
      passes: {
        total: 222,
        key: 10,
        accuracy: 81,
      },
      tackles: {
        total: 4,
        blocks: 1,
        interceptions: 2,
      },
      duels: {
        total: 30,
        won: 20,
      },
      dribbles: {
        attempts: 18,
        success: 12,
        past: 1,
      },
      fouls: {
        drawn: 8,
        committed: 2,
      },
      cards: {
        yellow: 2,
        yellowred: 0,
        red: 0,
      },
      penalty: {
        won: 2,
        commited: 0,
        scored: 1,
        missed: 0,
        saved: 0,
      },
    },
    {
      player: {
        id: 276,
        name: "Kylian Mbappé",
        firstname: "Kylian",
        lastname: "Mbappé",
        age: 24,
        birth: {
          date: "1998-12-20",
          place: "Paris",
          country: "France",
        },
        nationality: "France",
        height: "178 cm",
        weight: "73 kg",
        injured: false,
        photo: "/images/messi.jpg",
      },
      team: {
        id: 85,
        name: "Paris Saint-Germain",
        logo: "/images/psg.png",
      },
      league: {
        id: 61,
        name: "Ligue 1",
        country: "France",
        logo: "/images/ligue1.png",
        flag: "/images/france.png",
        season: 2022,
      },
      games: {
        appearences: 34,
        lineups: 34,
        minutes: 2840,
        number: 7,
        position: "Attacker",
        rating: "9.2",
        captain: false,
      },
      substitutes: {
        in: 0,
        out: 9,
        bench: 0,
      },
      shots: {
        total: 133,
        on: 68,
      },
      goals: {
        total: 29,
        conceded: 0,
        assists: 7,
        saves: null,
      },
      passes: {
        total: 902,
        key: 35,
        accuracy: 84,
      },
      tackles: {
        total: 5,
        blocks: 2,
        interceptions: 2,
      },
      duels: {
        total: 144,
        won: 102,
      },
      dribbles: {
        attempts: 60,
        success: 42,
        past: 2,
      },
      fouls: {
        drawn: 30,
        committed: 8,
      },
      cards: {
        yellow: 4,
        yellowred: 0,
        red: 0,
      },
      penalty: {
        won: 5,
        commited: 0,
        scored: 5,
        missed: 1,
        saved: 0,
      },
    },
    {
      player: {
        id: 276,
        name: "Kylian Mbappé",
        firstname: "Kylian",
        lastname: "Mbappé",
        age: 24,
        birth: {
          date: "1998-12-20",
          place: "Paris",
          country: "France",
        },
        nationality: "France",
        height: "178 cm",
        weight: "73 kg",
        injured: false,
        photo: "/images/messi.jpg",
      },
      team: {
        id: 85,
        name: "Paris Saint-Germain",
        logo: "/images/psg.png",
      },
      league: {
        id: 2,
        name: "UEFA Champions League",
        country: "World",
        logo: "/images/ucl.png",
        flag: null,
        season: 2022,
      },
      games: {
        appearences: 8,
        lineups: 8,
        minutes: 690,
        number: 7,
        position: "Attacker",
        rating: "8.9",
        captain: false,
      },
      substitutes: {
        in: 0,
        out: 2,
        bench: 0,
      },
      shots: {
        total: 31,
        on: 16,
      },
      goals: {
        total: 7,
        conceded: 0,
        assists: 3,
        saves: null,
      },
      passes: {
        total: 243,
        key: 11,
        accuracy: 83,
      },
      tackles: {
        total: 2,
        blocks: 1,
        interceptions: 1,
      },
      duels: {
        total: 39,
        won: 28,
      },
      dribbles: {
        attempts: 21,
        success: 13,
        past: 1,
      },
      fouls: {
        drawn: 9,
        committed: 3,
      },
      cards: {
        yellow: 1,
        yellowred: 0,
        red: 0,
      },
      penalty: {
        won: 1,
        commited: 0,
        scored: 1,
        missed: 0,
        saved: 0,
      },
    },
  ],
};

function toNumber(value) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

function getHeightInCm(height) {
  if (typeof height !== "string") return 0;
  const parsed = Number(height.replace(" cm", ""));
  return Number.isNaN(parsed) ? 0 : parsed;
}

function toLegacyCompetition(entry) {
  const competitionId =
    COMPETITION_ID_MAP[entry.league.id] ?? String(entry.league.id);
  const matchesPlayed = toNumber(entry.games.appearences);

  return {
    id: competitionId,
    name: entry.league.name,
    stats: {
      appearances: matchesPlayed,
      age: toNumber(entry.player.age),
      height: getHeightInCm(entry.player.height),
      team: entry.team.name,
      matchesPlayed,
      footyRating: toNumber(entry.games.rating),
      goals: toNumber(entry.goals.total),
      assists: toNumber(entry.goals.assists),
      minutes: toNumber(entry.games.minutes),
      shots: toNumber(entry.shots.total),
      totalShots: toNumber(entry.shots.total),
      shotsOnTarget: toNumber(entry.shots.on),
      keyPasses: toNumber(entry.passes.key),
      chancesCreated: toNumber(entry.passes.key),
      dribblesCompleted: toNumber(entry.dribbles.success),
      dribbles: toNumber(entry.dribbles.attempts),
      interceptions: toNumber(entry.tackles.interceptions),
      tackles: toNumber(entry.tackles.total),
      dribbledPast: toNumber(entry.dribbles.past),
      clearances: 0,
      groundDuelsWon: toNumber(entry.duels.won),
      blockedShots: toNumber(entry.tackles.blocks),
      yellowCards: toNumber(entry.cards.yellow),
      yellowToRedCards: toNumber(entry.cards.yellowred),
      redCards: toNumber(entry.cards.red),
    },
  };
}

function toLegacySeason(entriesForSeason, seasonLabel) {
  const competitionRows = entriesForSeason.map(toLegacyCompetition);
  const primaryClub = PRIMARY_CLUB_BY_SEASON[seasonLabel];

  const totals = competitionRows.reduce(
    (accumulator, competition) => {
      const { stats } = competition;
      accumulator.totalAppearances += stats.matchesPlayed;
      accumulator.totalGoals += stats.goals;
      accumulator.totalAssists += stats.assists;
      accumulator.totalMinutes += stats.minutes;
      accumulator.totalShots += stats.totalShots;
      accumulator.shotsOnTarget += stats.shotsOnTarget;
      accumulator.keyPasses += stats.keyPasses;
      accumulator.chancesCreated += stats.chancesCreated;
      accumulator.dribbles += stats.dribbles;
      accumulator.yellowCards += stats.yellowCards;
      accumulator.redCards += stats.redCards;
      accumulator.ratingSum += stats.footyRating * stats.matchesPlayed;
      return accumulator;
    },
    {
      totalAppearances: 0,
      totalGoals: 0,
      totalAssists: 0,
      totalMinutes: 0,
      totalShots: 0,
      shotsOnTarget: 0,
      keyPasses: 0,
      chancesCreated: 0,
      dribbles: 0,
      yellowCards: 0,
      redCards: 0,
      ratingSum: 0,
    },
  );

  const averageRating =
    totals.totalAppearances > 0
      ? Number((totals.ratingSum / totals.totalAppearances).toFixed(1))
      : 0;

  return {
    season: seasonLabel,
    clubId: primaryClub.clubId,
    clubCareer: [
      {
        clubId: primaryClub.clubId,
        team: primaryClub.team,
        league: primaryClub.league,
        career: {
          totalAppearances: totals.totalAppearances,
          averageRating,
          totalGoals: totals.totalGoals,
          totalAssists: totals.totalAssists,
          totalMinutes: totals.totalMinutes,
          totalShots: totals.totalShots,
          shotsOnTarget: totals.shotsOnTarget,
          keyPasses: totals.keyPasses,
          chancesCreated: totals.chancesCreated,
          dribbles: totals.dribbles,
          yellowCards: totals.yellowCards,
          redCards: totals.redCards,
        },
      },
    ],
    competitions: competitionRows,
  };
}

function buildLegacySeasonsFromApiResponse(response) {
  const groupedBySeason = response.reduce((accumulator, entry) => {
    const seasonLabel =
      SEASON_LABEL_MAP[entry.league.season] ?? String(entry.league.season);
    if (!accumulator[seasonLabel]) {
      accumulator[seasonLabel] = [];
    }
    accumulator[seasonLabel].push(entry);
    return accumulator;
  }, {});

  return Object.entries(groupedBySeason)
    .map(([seasonLabel, entriesForSeason]) =>
      toLegacySeason(entriesForSeason, seasonLabel),
    )
    .sort((a, b) => b.season.localeCompare(a.season));
}

// Legacy export kept for current UI usage.
export const mbappeStats = {
  id: "mbappe",
  seasons: buildLegacySeasonsFromApiResponse(mbappeApiFootballStats.response),
  career: {
    totalGoals: 332,
    totalAssists: 141,
    totalAppearances: 440,
    averageRating: 9.2,
    titlesWon: 17,
    awards: 12,
  },
};
