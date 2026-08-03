import { Player } from "@/shared/types/stats-schema";

export type PlayerAnalyticsType = {
  playerId: string;
  searchCount: number;
  viewCount: number;
}

export type PlayerFullAnalyticsType = Record<string, PlayerAnalyticsType>;

export type PlayerCombinedType = {
  id: string;
  fullName: string;
  nationality: string;
  dateOfBirth: string;
  heightCm: number;
  primaryPosition: string;
  imageUrl: string;
  currentClubId: string;
  active: boolean;
  searchCount: number;
  viewCount: number;
}

export type PopularPlayerCardProps = {
  player: Player;
  searchCount: number;
}

