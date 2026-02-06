export interface PlayerCompetitionStats {
  age: number;
  height: number;
  team: string;
  footyRating: number;  
  matchesPlayed: number;
  goals: number;
  assists: number;
  minutes: number;
  shots: number;
  shotsOnTarget: number;
  keyPasses: number;
  chancesCreated: number;
  dribbles: number;
  interceptions: number;
  tackles: number;
  dribbledPast: number;
  clearances: number;
  groundDuelsWon: number;
  blockedShots: number;
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
