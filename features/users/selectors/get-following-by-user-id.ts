"use client";

import { buildHydratedFollowingStore } from "@/features/users/data/following-store";

export function getFollowingByUserId(userId: string): string[] {
  const hydratedFollowing = buildHydratedFollowingStore();

  return hydratedFollowing[userId] ?? [];
}