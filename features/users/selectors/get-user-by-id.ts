"use client";

import { buildHydratedUsersStore } from "@/features/users/data/users-store";
import { UserType } from "@/features/users/types/users";

export function getUserById(userId: string): UserType | null {
  const hydratedUsers = buildHydratedUsersStore();

  return hydratedUsers[userId] ?? null;
}
