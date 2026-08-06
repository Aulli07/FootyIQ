"use client";

import indexedLikesByPostId from "@/features/posts/data/new//likes-by-post-id.json";
import indexedCommentsByPostId from "@/features/posts/data/new//comments-by-post-id.json";
import indexedViewsByPostId from "@/features/posts/data/new//views-by-post-id.json";
import indexedAttachmentsByPostId from "@/features/posts/data/new//attachments-by-post-id.json";

import {
  PostAnalyticsStoreType,
  PostAnalyticsType,
} from "@/features/posts/types/hydrated";
import { LikesByPostIdType } from "@/features/posts/types/like";
import { commentsByPostIdType } from "@/features/posts/types/comment";
import { ViewsByPostIdType } from "@/features/posts/types/view";
import { PostAttachmentsByPostIdType } from "@/features/posts/types/attachment";

const STORAGE_KEY = "posts_analytics_storage";



const precomputedPostAnalyticsStore = buildPostAnalyticsStoreFromLookups({
  likesByPostId: indexedLikesByPostId as LikesByPostIdType,
  commentsByPostId: indexedCommentsByPostId as commentsByPostIdType,
  viewsByPostId: indexedViewsByPostId as ViewsByPostIdType,
  attachmentsByPostId:
    indexedAttachmentsByPostId as PostAttachmentsByPostIdType,
});

export function buildHydratedPostAnalyticsStore() {
  const hydratedPostAnalyticsStore = {
    ...precomputedPostAnalyticsStore,
    ...getStoredPostAnalytics(),
  };

  initializePostAnalyticsStorage(hydratedPostAnalyticsStore);
  return hydratedPostAnalyticsStore;
}

export function buildPostAnalyticsStoreFromLookups({
  likesByPostId,
  commentsByPostId,
  viewsByPostId,
  attachmentsByPostId,
}: {
  likesByPostId: LikesByPostIdType;
  commentsByPostId: commentsByPostIdType;
  viewsByPostId: ViewsByPostIdType;
  attachmentsByPostId: PostAttachmentsByPostIdType;
}) {
  const postIds = new Set([
    ...Object.keys(likesByPostId),
    ...Object.keys(commentsByPostId),
    ...Object.keys(viewsByPostId),
    ...Object.keys(attachmentsByPostId),
  ]);

  const analyticsStore: PostAnalyticsStoreType = {};

  postIds.forEach((postId) => {
    analyticsStore[postId] = {
      likeIds: likesByPostId[postId] ?? [],
      commentIds: commentsByPostId[postId] ?? [],
      viewIds: viewsByPostId[postId] ?? [],
      attachmentIds: attachmentsByPostId[postId] ?? [],
    } satisfies PostAnalyticsType;
  });

  return analyticsStore;
}

export function initializePostAnalyticsStorage(
  analyticsHistory: PostAnalyticsStoreType,
) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(analyticsHistory));
}

export function getStoredPostAnalytics(): PostAnalyticsStoreType {
  if (typeof window === "undefined") {
    return {};
  }

  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}
