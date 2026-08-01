import { CompStatsForImageCardType } from "@/features/compare/types/comp-image-type";

export type PostAttachmentComparisonStatsType = CompStatsForImageCardType

export type PostAttachmentType = {
  id: string;
  comparisonId?: string;
  stats?: PostAttachmentComparisonStatsType;
};

export type PostMappedAttachmentType = Record<string, PostAttachmentType>;

export type PostAttachmentsByPostIdType = Record<string, string[]>;
