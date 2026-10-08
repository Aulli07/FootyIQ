/* Types for the football stats data store */

// export type CompetitionType = "league" | "cup" | "continental" | "international" | "other";

export interface Player {
  // id: string;
  id: string;
  fullName: string;
  nationality: string;
  dateOfBirth: string;
  heightCm: number;
  primaryPosition: string;
  imageUrl: string;
  currentClubId: string;
}

export interface Club {
  id: string;
  name: string;
  shortName?: string;
  country?: string;
  leagueId?: string;
  logoUrl?: string;
}

export interface Competition {
  id: string;
  name: string;
  country: string;
  type: string;
  logoUrl: string;
  aliases?: string[];
}

export interface Season {
  id: string;
  label: string;
  startYear: number;
  endYear: number;
  isCurrent?: boolean;
}

export interface PlayerSeasonStats {
  id: string;
  playerId: string;
  seasonId: string;
  clubId: string;
  competitionId: string;
  competitionType: string;
  appearances: number;
  minutes: number;
  goals: number;
  assists: number;
  saves: number;
  conceded: number;
  shots: number;
  shotsOnTarget: number;
  passes: number;
  keyPasses: number;
  dribbles: number;
  dribblesCompleted: number;
  interceptions: number;
  tackles: number;
  blocks: number;
  duels: number;
  duelsWon: number
  yellowCards: number;
  yellowToRedCards: number;
  redCards: number;
  source: "legacy" | "manual" | "api-football";
  rating: number
  updatedAt: string;
}

export type PlayerAggregateStats = {
  appearances: number;
  minutes: number;
  goals: number;
  assists: number;
  saves: number;
  conceded: number;
  shots: number;
  shotsOnTarget: number;
  passes: number;
  keyPasses: number;
  dribbles: number;
  dribblesCompleted: number;
  interceptions: number;
  tackles: number;
  blocks: number;
  duels: number;
  duelsWon: number
  yellowCards: number;
  yellowToRedCards: number;
  redCards: number;
  rating: number;
};

export interface PlayerCareerStats {
  id: string;
  playerId: string;
  appearances: number;
  starts?: number;
  minutes: number;
  goals: number;
  assists: number;
  shots: number;
  shotsOnTarget: number;
  keyPasses: number;
  chancesCreated: number;
  dribbles: number;
  dribblesCompleted?: number;
  interceptions: number;
  tackles: number;
  dribbledPast: number;
  clearances: number;
  groundDuelsWon: number;
  blockedShots: number;
  yellowCards: number;
  yellowToRedCards: number;
  redCards: number;
  averageRating?: number;
  titlesWon?: number;
  awards?: number;
  source: "legacy" | "manual" | "api-football";
  updatedAt: string;
}


export type StrategyScorer = (
  competitions: PlayerSeasonStats[],
  player: Player,
  career?: PlayerCareerStats | null,
) => number;


export interface FootballDataStore {
  players: Player[];
  clubs: Club[];
  competitions: Competition[];
  seasons: Season[];
  stats: PlayerSeasonStats[];
}

export type SeasonCompetitionGroup = {
  seasonId: string;
  seasonLabel: string;
  competitions: Array<{
    competitionId: string;
    competitionLabel: string;
  }>;
};