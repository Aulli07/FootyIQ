import { buildApiFootballStatsFromLegacy } from "../api-football-utils";

export const benzemaStats = {
  id: "benzema",
  seasons: [
    {
      season: "23/24",
      clubId: "alittihad",
      clubCareer: [
        {
          clubId: "alittihad",
          team: "Al-Ittihad",
          career: {
            totalAppearances: 26,
            averageRating: 9.1,
            totalGoals: 17,
            totalAssists: 8,
            totalMinutes: 2105,
            totalShots: 79,
            shotsOnTarget: 39,
            keyPasses: 27,
            chancesCreated: 27,
            dribbles: 14,
            yellowCards: 2,
            redCards: 0,
          },
        },
      ],
      competitions: [
        {
          id: "spl",
          name: "Saudi Pro League",
          stats: {
            appearances: 26,
            age: 35,
            height: 185,
            team: "Al-Ittihad",
            matchesPlayed: 26,
            footyRating: 9.1,
            goals: 17,
            assists: 8,
            minutes: 2105,
            shots: 79,
            totalShots: 79,
            shotsOnTarget: 39,
            keyPasses: 27,
            chancesCreated: 27,
            dribbles: 14,
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
    totalGoals: 600,
    totalAssists: 190,
    totalAppearances: 1000,
    averageRating: 9.1,
    titlesWon: 27,
    awards: 13,
  },
};

export const benzemaApiFootballStats =
  buildApiFootballStatsFromLegacy(benzemaStats);
