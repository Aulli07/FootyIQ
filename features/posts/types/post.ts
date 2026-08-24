import { Dispatch, RefObject, SetStateAction } from "react";

import { ComparisonStatKey } from "@/features/players/types/comparison-stat-options";

import { ComparisonType } from "@/features/compare/types/comparison-main-type";
import { compStatRecord } from "@/features/compare/types/comp-image-type";


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

export type PostInfoType = {
  shouldUpload: boolean;
  setShouldUpload: Dispatch<SetStateAction<boolean>>;
  selectedComparisonData: ComparisonType | null;
  comparisonPostStats: compStatRecord | undefined;
  myPostRef: RefObject<HTMLTextAreaElement | null>;
  lastPostKeyRef: RefObject<string | null>;
}

export type PostCountsType = {
  likeCount: number;
  commentCount: number;
  viewCount: number;
};