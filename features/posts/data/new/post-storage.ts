"use client";

import indexedPosts from "@/features/posts/data/new/indexed-posts.json";

import { PostMappedType, PostType } from "@/features/posts/types/post";
import { getCanonicalPlayerIdByName } from "@/shared/utils/canonical-lookups";

const STORAGE_KEY = "posts_storage";

const precomputedPostStore = indexedPosts as PostMappedType;

function normalizePostReferences(post: PostType): PostType {
  return {
    ...post,
    references: {
      ...post.references,
      players: post.references.players.map((playerRef) => {
        return getCanonicalPlayerIdByName(playerRef) ?? playerRef;
      }),
    },
  };
}

export function buildHydratedPostStore() {
  const hydratedPostStore = {
    ...normalizePostStore(precomputedPostStore),
    ...normalizePostStore(getStoredPosts()),
  };
  // initializePostsStorage(hydratedPostStore);

  return hydratedPostStore;
}

function normalizePostStore(postStore: PostMappedType): PostMappedType {
  return Object.fromEntries(
    Object.entries(postStore).map(([postId, post]) => [
      postId,
      normalizePostReferences(post),
    ]),
  );
}

export function initializePostsStorage(postsHistory: PostMappedType) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(postsHistory));
}

export function managePostInStorage(entry: PostType) {
  if (typeof window === "undefined") {
    return entry;
  }

  const postsHistory = getStoredPosts();
  const normalizedEntry = normalizePostReferences(entry);

  storePostInStorage(normalizedEntry, postsHistory);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(postsHistory));
  window.dispatchEvent(new Event("posts-updated"));

  console.log("Your post is stored");
  return normalizedEntry;
}

export function storePostInStorage(
  entry: PostType,
  postsHistory: PostMappedType,
) {
  postsHistory[entry.id] = entry;
  return entry;
}

export function getStoredPosts(): PostMappedType {
  if (typeof window === "undefined") {
    return {};
  }

  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}

export function findPostFromHistory(post: PostType): PostType | null {
  const currentHistory = getStoredPosts();

  if (currentHistory[post.id]) {
    return currentHistory[post.id];
  }

  return null;
}
