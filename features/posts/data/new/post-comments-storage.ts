"use client";

import indexedComments from "@/features/posts/data/new/indexed-post-comments.json";

import {
  CommentType,
  commentsMappedType,
} from "@/features/posts/types/comment";

const STORAGE_KEY = "post_comments_storage";

const precomputedCommentsStore = indexedComments as commentsMappedType;

export function buildHydratedPostCommentsStore() {
  const hydratedPostCommentsStore = {
    ...precomputedCommentsStore,
    ...getStoredPostComments(),
  };

  // initializePostCommentsStorage(hydratedPostCommentsStore);

  return hydratedPostCommentsStore;
}

export function initializePostCommentsStorage(
  commentsHistory: commentsMappedType,
) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(commentsHistory));
}

export function manageCommentInStorage(entry: CommentType) {
  if (typeof window === "undefined") {
    return entry;
  }

  const commentsHistory = getStoredPostComments();
  storeCommentInStorage(entry, commentsHistory);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(commentsHistory));
  window.dispatchEvent(new Event("posts-updated"));

  console.log("Your comment is stored");
  return entry;
}

export function storeCommentInStorage(
  entry: CommentType,
  commentsHistory: commentsMappedType,
) {
  commentsHistory[entry.id] = entry;
  return entry;
}

export function getStoredPostComments(): commentsMappedType {
  if (typeof window === "undefined") {
    return {};
  }

  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}
