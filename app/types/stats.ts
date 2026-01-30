export interface StatsType {
  id: string;
  seasons: [
    {
      season: string;
      clubId: string;
      competitions: [
        {
          id: string;
          name: string;
          stats: {
            appearances: number;
            goals: number;
            assists: number;
            minutes: number;
            shots: number;
            shotsOnTarget: number;
            keyPasses: number;
            dribblesCompleted: number;
            yellowCards: number;
            redCards: number;
          };
        },
      ];
    },
  ],
  career: {
    totalGoals: number;
    totalAssists: number;
    totalAppearances: number;
    averageRating: number;
    titlesWon: number;
    awards: number;
  }
}
