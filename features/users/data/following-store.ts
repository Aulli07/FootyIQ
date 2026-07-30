"use client";

import { FollowMappedType } from "@/features/posts/types/follow";

import { buildHydratedFollowingStore as buildFollowingStorage } from "@/features/users/data/following-storage";

export function buildHydratedFollowingStore(): FollowMappedType {
  return buildFollowingStorage();
}
