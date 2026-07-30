"use client";

import indexedFollowers from "@/features/users/data/indexed-followers.json";

import { FollowMappedType } from "@/features/posts/types/follow";

const STORAGE_KEY = "followers_storage";

const precomputedFollowersStore = indexedFollowers as FollowMappedType;

export function buildHydratedFollowersStore() {
  const hydratedFollowersStore = {
    ...precomputedFollowersStore,
    ...getStoredFollowers(),
  };

  initializeFollowersStorage(hydratedFollowersStore);

  return hydratedFollowersStore;
}

export function initializeFollowersStorage(followersHistory: FollowMappedType) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(followersHistory));
}

export function getStoredFollowers(): FollowMappedType {
  if (typeof window === "undefined") {
    return {};
  }

  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}
