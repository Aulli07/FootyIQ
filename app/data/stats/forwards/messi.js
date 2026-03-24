import { buildApiFootballStatsFromLegacy } from "../api-football-utils";

export const messiStats = {
  id: "messi",
  seasons: [
    {
      season: "23/24",
      clubId: "intermiami",
      clubCareer: [
        {
          clubId: "intermiami",
          team: "Inter Miami",
          career: {
            totalAppearances: 22,
            averageRating: 9.4,
            totalGoals: 18,
            totalAssists: 11,
            totalMinutes: 1890,
            totalShots: 74,
            shotsOnTarget: 40,
            keyPasses: 48,
            chancesCreated: 48,
            dribbles: 36,
            yellowCards: 2,
            redCards: 0,
          },
        },
      ],
      competitions: [
        {
          id: "mls",
          name: "MLS",
          stats: {
            appearances: 22,
            age: 37,
            height: 180,
            team: "Inter Miami",
            matchesPlayed: 22,
            footyRating: 9.4,
            goals: 18,
            assists: 11,
            minutes: 1890,
            shots: 74,
            totalShots: 74,
            shotsOnTarget: 40,
            keyPasses: 48,
            chancesCreated: 48,
            dribbles: 36,
            interceptions: 0,
            tackles: 0,
            dribbledPast: 0,
            clearances: 0,
            groundDuelsWon: 0,
            blockedShots: 0,
            yellowCards: 2,
            yellowToRedCards: 0,
            redCards: 0,
          },
        },
      ],
    },
  ],
  career: {
    totalGoals: 901,
    totalAssists: 432,
    totalAppearances: 1080,
    averageRating: 9.4,
    titlesWon: 30,
    awards: 15,
  },
};

export const messiApiFootballStats =
  buildApiFootballStatsFromLegacy(messiStats);
