"use client";

import { FollowMappedType } from "@/features/posts/types/follow";

import { buildHydratedFollowersStore as buildFollowersStorage } from "@/features/users/data/followers-storage";

export function buildHydratedFollowersStore(): FollowMappedType {
  return buildFollowersStorage();
}
