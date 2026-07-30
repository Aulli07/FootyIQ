"use client";

import { getPostLikesById } from "./get-post-likes-by-id";
import { getPostCommentsById } from "./get-post-comments-by-id";
import { getPostViewsById } from "./get-post-views-by-id";
import { getPostAttachmentById } from "./get-post-attachments-by-id";

export type PostCountsType = {
  likeCount: number;
  commentCount: number;
  viewCount: number;
};

export function getPostCountsById(postId: string): PostCountsType {
  return {
    likeCount: getPostLikesById(postId).length,
    commentCount: getPostCommentsById(postId).length,
    viewCount: getPostViewsById(postId).length,
  };
}
