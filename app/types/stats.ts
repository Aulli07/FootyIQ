export interface PlayerCompetitionStats {
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
}

export interface CompetitionStats {
  id: string;
  name: string;
  stats: PlayerCompetitionStats;
}

export interface SeasonStats {
  season: string;
  clubId: string;
  competitions: CompetitionStats[];
}

export interface CareerStats {
  totalGoals: number;
  totalAssists: number;
  totalAppearances: number;
  averageRating: number;
  titlesWon: number;
  awards: number;
}

export interface StatsType {
  id: string;
  seasons: SeasonStats[];
  career: CareerStats;
}
