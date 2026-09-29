import { PlayerCompetitionStats } from "@/features/players/types/stats-legacy";

export type ComparisonImageStatKey =
  | keyof PlayerCompetitionStats
  | "footyRating";

export type compStatRecord = Record<ComparisonImageStatKey, number[]>;

export type compStatKeys = [ComparisonImageStatKey, number[]];

export type CompStatsForImageCardType = Partial<compStatRecord>;

export type ComparisonImageCardProps = {
  comparisonId?: string;
  compStats: CompStatsForImageCardType | undefined;
};
