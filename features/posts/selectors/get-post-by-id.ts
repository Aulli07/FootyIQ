"use client";

import { buildHydratedPostStore } from "@/features/posts/data/new/post-storage";
import { PostType } from "@/features/posts/types/post";

export function getPostById(postId: string): PostType | null {
  const hydratedPosts = buildHydratedPostStore();
  return hydratedPosts[postId] ?? null;
}
