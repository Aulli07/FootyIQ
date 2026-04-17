
export type CompetitionType = "league" | "cup" | "continental" | "international" | "other";

export interface Player {
  id: string;
  fullName: string;
  nationality?: string;
  dateOfBirth?: string;
  heightCm?: number;
  primaryPosition?: string;
  imageUrl?: string;
  currentClubId?: string;
  active?: boolean;
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
  type?: CompetitionType;
  country?: string;
  tier?: number;
  logoUrl?: string;
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
  rating?: number;
  source: "legacy" | "manual" | "api-football";
  updatedAt: string;
}

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

export interface FootballDataStore {
  players: Player[];
  clubs: Club[];
  competitions: Competition[];
  seasons: Season[];
  playerSeasonStats: PlayerSeasonStats[];
  playerCareerStats: PlayerCareerStats[];
}
