"use client";

import indexedUsers from "@/features/users/data/indexed-users.json"
import { UserMappedType, UserType } from "@/features/users/types/users";

const STORAGE_KEY = "users_storage";
const precomputedUserStore = indexedUsers as UserMappedType;


export function buildHydratedUserStore() {
  const hydratedUserStore = { ...precomputedUserStore, ...getStoredUsers() };
  return hydratedUserStore;
}

export function initializeUsersStorage(usersHistory: UserMappedType) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(usersHistory));
}

export function storeUserInStorage(
  entry: UserType,
  usersHistory: UserMappedType,
) {
  usersHistory[entry.id] = entry;
  return entry;
}

export function getStoredUsers(): UserMappedType {
  if (typeof window === "undefined") {
    return {};
  }

  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}