import type { PlayerCompetitionStats } from "@/features/players/types/stats-legacy";

export type PostAttachmentComparisonStatsType = Partial<
  Record<keyof PlayerCompetitionStats, number[]>
>;

export type PostAttachmentType = {
  id: string;
  comparisonId?: string;
  stats?: PostAttachmentComparisonStatsType;
};

export type PostMappedAttachmentType = Record<string, PostAttachmentType>;

export type PostAttachmentsByPostIdType = Record<string, string[]>;
