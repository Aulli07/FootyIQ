"use client";

import { buildHydratedPostLikesStore } from "@/features/posts/data/new/post-likes-storage";
import { LikeType } from "@/features/posts/types/like";

export function getPostLikesById(postId: string): LikeType[] {
  const hydratedLikesStore = buildHydratedPostLikesStore();

  return Object.values(hydratedLikesStore).filter(
    (like) => like.postId === postId,
  );
}
