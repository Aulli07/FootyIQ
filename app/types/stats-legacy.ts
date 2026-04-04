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

export interface ClubCareerStats {
  totalAppearances: number;
  averageRating: number;
  totalGoals: number;
  totalAssists: number;
  totalMinutes: number;
  totalShots: number;
  shotsOnTarget: number;
  keyPasses: number;
  chancesCreated: number;
  dribbles: number;
  yellowCards: number;
  redCards: number;
}

export interface ClubCareerEntry {
  clubId: string;
  team: string;
  career: ClubCareerStats;
}

export interface SeasonStats {
  season: string;
  clubId: string;
  clubCareer: ClubCareerEntry[];
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