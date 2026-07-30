"use client";

import { buildHydratedFollowersStore } from "@/features/users/data/followers-store";

export function getFollowersByUserId(userId: string): string[] {
  const hydratedFollowers = buildHydratedFollowersStore();

  return hydratedFollowers[userId] ?? [];
}