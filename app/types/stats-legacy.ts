export interface PlayerCompetitionStats {
  appearances: number;
  age: number;
  height: number;
  team: string;
  footyRating: number;
  matchesPlayed: number;
  goals: number;
  assists: number;
  minutes: number;
  shots: number;
  totalShots: number;
  shotsOnTarget: number;
  keyPasses: number;
  chancesCreated: number;
  dribbles: number;
  dribblesCompleted: number;
  interceptions: number;
  tackles: number;
  dribbledPast: number;
  clearances: number;
  groundDuelsWon: number;
  blockedShots: number;
  yellowCards: number;
  yellowToRedCards: number;
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

export interface StatsType {
  id: string;
  seasons: SeasonStats[];
}