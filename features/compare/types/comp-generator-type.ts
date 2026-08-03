import { PlayerSeasonStats } from "@/shared/types/stats-schema";

export type SeasonGroup = {
  seasonId: string;
  seasonLabel: string;
  totalSeasonRows: PlayerSeasonStats[];
};