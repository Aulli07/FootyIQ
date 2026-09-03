import { CompStatsForImageCardType } from "@/features/compare/types/comp-image-type";

export type PostAttachmentComparisonStatsType = CompStatsForImageCardType

export type PostAttachmentType = {
  id: string;
  postId: string;
  comparisonId?: string;
  stats?: PostAttachmentComparisonStatsType;
};

export type PostMappedAttachmentType = Record<string, PostAttachmentType>;

export type PostAttachmentsByPostIdType = Record<string, string[]>;


// When you are done, you are going to proceed to the post-attachment legacy data and using those comparison ids already created in the indexed comparisons file, generate post attachments in a new post-attachments-new file, allowing for different post ids present (this does not have to be orderly in the data set), and for different stats (which can contain three individual stats, two, one or nothing - randomize these within the dataset). It should be more than 10 in number. Then, re-implement the correct precompute logic and it should be precomputed to a new file called indexed-post-attachments-new file, leaving the old one bare and unused.

// After this is correctly done, you are ging to build the post legacy data with a new file posts-new, creating posts that includes all the post attachments already created in them (randomized as well), has all players present in different post references (randomized as well, not every post has to be tied to players), also with different post authors (randomized), also has its own independent posts (with empty attachment ids pr player references), essentially a conglomeration of posts that is between 40-50 in number. Then, re-implement the correct precompute logic and it should be precomputed to a new file called indexed-posts-new file, leabing the old one bare and unused.