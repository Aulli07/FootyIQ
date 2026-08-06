"use client";

import indexedFollowings from "../data/indexed-followings.json";
import { FollowMappedType } from "@/features/posts/types/follow";

const STORAGE_KEY = "following_storage";
const precomputedFollowingsStore = indexedFollowings as FollowMappedType;

export function buildHydratedFollowingStore() {
  const hydratedFollowingStore = {
    ...precomputedFollowingsStore,
    ...getStoredFollowings(),
  };

  initializeFollowingStorage(hydratedFollowingStore);
  return hydratedFollowingStore;
}

export function initializeFollowingStorage(followingHistory: FollowMappedType) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(followingHistory));
}

export function getStoredFollowings(): FollowMappedType {
  if (typeof window === "undefined") {
    return {};
  }

  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}
