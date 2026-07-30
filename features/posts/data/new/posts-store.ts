"use client";

import { PostMappedType } from "@/features/posts/types/post";

import { buildHydratedPostStore } from "@/features/posts/data/new/post-storage";

export function buildHydratedPostsStore(): PostMappedType {
  return buildHydratedPostStore();
}
