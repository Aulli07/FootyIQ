"use client";

import { UserMappedType } from "@/features/users/types/users";

import { buildHydratedUserStore } from "@/features/users/data/user-storage";

export function buildHydratedUsersStore(): UserMappedType {
  return buildHydratedUserStore();
}
