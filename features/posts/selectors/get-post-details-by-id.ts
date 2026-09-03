"use client";

import { buildHydratedPostStore } from "@/features/posts/data/new/post-storage";
import { PostType } from "@/features/posts/types/post";
import { PostCountsType } from "@/features/posts/types/post";
import { LikeType } from "../types/like";
import { buildHydratedPostLikesStore } from "../data/new/post-likes-storage";
import { ViewType } from "../types/view";
import { buildHydratedPostViewsStore } from "../data/new/post-views-storage";
import { CommentType } from "../types/comment";
import { buildHydratedPostCommentsStore } from "../data/new/post-comments-storage";
import { PostAttachmentType } from "../types/attachment";
import { buildHydratedPostAttachmentsStore } from "../data/new/post-attachments-storage";
import { PostAnalyticsType } from "../types/hydrated";
import { buildHydratedPostAnalyticsStore } from "../data/new/post-analytics-storage";



export function getPostById(postId: string): PostType | null {
  const hydratedPosts = buildHydratedPostStore();
  return hydratedPosts[postId] ?? null;
}


export function getPostCountsById(postId: string): PostCountsType {
  return {
    likeCount: getPostLikesById(postId).length,
    commentCount: getPostCommentsById(postId).length,
    viewCount: getPostViewsById(postId).length,
  };
}


export function getPostsInDiscussion(leftPlayerId?: string, rightPlayerId?: string) {
  const normalizeName = (value: string | undefined) =>
    value?.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");

  const targetPlayers = [leftPlayerId, rightPlayerId]
    .filter(Boolean)
    .map(normalizeName);

  const hydratedPostStore = buildHydratedPostStore();

  const postsInDiscussion = Object.values(hydratedPostStore).filter((post) => {
    const postPlayers = post.references.players.map(normalizeName);
    return targetPlayers.some((playerName) => postPlayers.includes(playerName));
  });

  return postsInDiscussion;
}


export function getPostLikesById(postId: string): LikeType[] {
  const hydratedLikesStore = buildHydratedPostLikesStore();

  return Object.values(hydratedLikesStore).filter(
    (like) => like.postId === postId,
  );
}


export function getPostViewsById(postId: string): ViewType[] {
  const hydratedViewsStore = buildHydratedPostViewsStore();

  return Object.values(hydratedViewsStore).filter(
    (view) => view.postId === postId,
  );
}


export function getPostCommentsById(postId: string): CommentType[] {
  const hydratedCommentsStore = buildHydratedPostCommentsStore();

  return Object.values(hydratedCommentsStore).filter(
    (comment) => comment.postId === postId,
  );
}


export function getPostAttachmentById(attachmentId: string): PostAttachmentType {
  const hydratedAttachmentsStore = buildHydratedPostAttachmentsStore();

  return (
    Object.values(hydratedAttachmentsStore).find(
      (attachment) => attachment.id === attachmentId,
    ) ?? { id: "", comparisonId: "", stats: undefined }
  );
}


export function getPostAnalyticsById(postId: string): PostAnalyticsType | null {
  const hydratedPostAnalytics = buildHydratedPostAnalyticsStore();
  return hydratedPostAnalytics[postId] ?? null;
}