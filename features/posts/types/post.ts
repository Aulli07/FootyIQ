import { ComparisonStatKey } from "@/features/players/types/comparison-stat-options";

export type PostType = {
  id: string;
  authorId: string;

  type: string;

  content: string;

  attachmentIds: string;
  references: PostReferencesType;

  tags: string[];
  createdAt: string;
} 


export type PostReferencesType = {
  players: string[];
  clubs?: string[];
  comparisons?: string[];
}

export type PostMappedType = Record<string, PostType>;

export type UploadPostInput = {
  postContent: string;
  compId?: string | null;
  compStats?: Partial<Record<ComparisonStatKey, number[]>>;
  authorId?: string;
};

export type UploadPostAttachmentInput = {
  id: string
  comparisonId: string;
  stats?: Partial<Record<ComparisonStatKey, number[]>>;
};