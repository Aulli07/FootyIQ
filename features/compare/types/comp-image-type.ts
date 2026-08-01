import { PlayerCompetitionStats } from "@/features/players/types/stats-legacy";

export type compStatRecord = Record<keyof PlayerCompetitionStats, number[]>

export type compStatKeys = [keyof PlayerCompetitionStats, number[]];

export type CompStatsForImageCardType = Partial<compStatRecord>;

export type ComparisonImageCardProps = {
  comparisonId?: string;
  compStats: CompStatsForImageCardType | undefined;
};
