"use client";

import { buildHydratedPostCommentsStore } from "@/features/posts/data/new/post-comments-storage";
import { CommentType } from "@/features/posts/types/comment";

export function getPostCommentsById(postId: string): CommentType[] {
  const hydratedCommentsStore = buildHydratedPostCommentsStore();

  return Object.values(hydratedCommentsStore).filter(
    (comment) => comment.postId === postId,
  );
}
