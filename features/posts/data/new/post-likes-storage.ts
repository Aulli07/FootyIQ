"use client";

import indexedLikes from "@/features/posts/data/new/indexed-post-likes.json";

import { LikeMappedType, LikeType } from "@/features/posts/types/like";

const STORAGE_KEY = "post_likes_storage";

const precomputedLikesStore = indexedLikes as LikeMappedType;

export function buildHydratedPostLikesStore() {
  const hydratedPostLikesStore = {
    ...precomputedLikesStore,
    ...getStoredPostLikes(),
  };

  // initializePostLikesStorage(hydratedPostLikesStore);

  return hydratedPostLikesStore;
}

export function initializePostLikesStorage(likesHistory: LikeMappedType) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(likesHistory));
}

export function manageLikeInStorage(entry: LikeType) {
  if (typeof window === "undefined") {
    return entry;
  }

  const likesHistory = getStoredPostLikes();
  storeLikeInStorage(entry, likesHistory);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(likesHistory));
  window.dispatchEvent(new Event("posts-updated"));

  console.log("Your like is stored");
  return entry;
}

export function storeLikeInStorage(
  entry: LikeType,
  likesHistory: LikeMappedType,
) {
  likesHistory[entry.id] = entry;
  return entry;
}

export function getStoredPostLikes(): LikeMappedType {
  if (typeof window === "undefined") {
    return {};
  }

  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}
