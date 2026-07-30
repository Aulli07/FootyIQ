"use client";

import { buildHydratedUsersStore } from "@/features/users/data/users-store";
import { UserType } from "@/features/users/types/users";

export function getUsersByIds(userIds: string[]): UserType[] {
  const hydratedUsers = buildHydratedUsersStore();

  return userIds.map((userId) => hydratedUsers[userId]).filter(Boolean);
}
