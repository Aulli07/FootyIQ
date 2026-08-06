"use client";

import { UserMappedType } from "../types/users";
import { buildHydratedUserStore } from "../data/user-storage";

export function buildHydratedUsersStore(): UserMappedType {
  return buildHydratedUserStore();
}
