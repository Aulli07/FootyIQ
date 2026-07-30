import fs from "fs";
import path from "path";

import { AllPosts as legacyPosts } from "@/features/posts/data/legacy/posts";
import AllLikes from "@/features/posts/data/legacy/likes";
import AllComments from "@/features/posts/data/legacy/comments";
import AllViews from "@/features/posts/data/legacy/views";
import AllAttachments from "@/features/posts/data/legacy/post-attachments";

import type { PostMappedType } from "@/features/posts/types/post";
import { LikeMappedType, LikesByPostIdType } from "@/features/posts/types/like";
import { commentsByPostIdType, commentsMappedType } from "@/features/posts/types/comment";
import { ViewMappedType, ViewsByPostIdType } from "@/features/posts/types/view";
import type { PostMappedAttachmentType } from "@/features/posts/types/attachment";
import { getCanonicalPlayerIdByName } from "@/shared/utils/canonical-lookups";

const GENERATED_DIR = path.resolve(process.cwd(), "features");




export function buildPostsData() {
  const storedPosts = buildStoredPostsFromLegacy();
  const storedLikes = buildStoredLikesFromLegacy();
  const storedComments = buildStoredCommentsFromLegacy();
  const storedViews = buildStoredViewsFromLegacy();
  const storedAttachments = buildStoredAttachmentsFromLegacy();

  const storedLikesByPostId = buildStoredLikesByPostIdFromLegacy();
  const storedCommentsByPostId = buildStoredCommentsByPostIdFromLegacy();
  const storedViewsByPostId = buildStoredViewsByPostIdFromLegacy();

  fs.mkdirSync(GENERATED_DIR, { recursive: true });

  writeGeneratedFile("posts/data/new/indexed-posts.json", storedPosts);
  writeGeneratedFile("posts/data/new/indexed-post-likes.json", storedLikes);
  writeGeneratedFile("posts/data/new/indexed-post-comments.json", storedComments);
  writeGeneratedFile("posts/data/new/indexed-post-views.json", storedViews);
  writeGeneratedFile("posts/data/new/indexed-post-attachments.json", storedAttachments);

  writeGeneratedFile("posts/data/new/likes-by-post-id.json", storedLikesByPostId);
  writeGeneratedFile("posts/data/new/comments-by-post-id.json", storedCommentsByPostId);
  writeGeneratedFile("posts/data/new/views-by-post-id.json", storedViewsByPostId);

  return {
    storedPosts,
    storedLikes,
    storedComments,
    storedViews,
    storedAttachments,
    storedLikesByPostId,
    storedCommentsByPostId,
    storedViewsByPostId,
  };
}

function writeGeneratedFile(fileName: string, data: unknown) {
  const filePath = path.join(GENERATED_DIR, fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function buildStoredPostsFromLegacy() {
  const storedPosts: PostMappedType = {};

  legacyPosts.forEach((post) => {
    storedPosts[post.id] = {
      ...post,
      references: {
        ...post.references,
        players: post.references.players.map((playerRef) => {
          return getCanonicalPlayerIdByName(playerRef) ?? playerRef;
        }),
      },
    };
  });

  return storedPosts;
}

function buildStoredLikesFromLegacy() {
  const storedLikes: LikeMappedType = {};

  AllLikes.forEach((like) => {
    storedLikes[like.id] = like;
  });

  return storedLikes;
}

function buildStoredLikesByPostIdFromLegacy() {
  const storedLikesByPostId: LikesByPostIdType = {};

  AllLikes.forEach((like) => {
    if (!storedLikesByPostId[like.postId]) {
      storedLikesByPostId[like.postId] = [];
    }
    storedLikesByPostId[like.postId].push(like.id);
  });

  return storedLikesByPostId;
}

function buildStoredCommentsFromLegacy() {
  const storedComments: commentsMappedType = {};

  AllComments.forEach((comment) => {
    storedComments[comment.id] = comment;
  });

  return storedComments;
}

function buildStoredCommentsByPostIdFromLegacy() {
  const storedCommentsByPostId: commentsByPostIdType = {};

  AllComments.forEach((comment) => {
    if (!storedCommentsByPostId[comment.postId]) {
      storedCommentsByPostId[comment.postId] = [];
    }
    storedCommentsByPostId[comment.postId].push(comment.id);
  });

  return storedCommentsByPostId;
}

function buildStoredViewsFromLegacy() {
  const storedViews: ViewMappedType = {};

  AllViews.forEach((view) => {
    storedViews[view.id] = view;
  });

  return storedViews;
}

function buildStoredViewsByPostIdFromLegacy() {
  const storedViewsByPostId: ViewsByPostIdType = {};

  AllViews.forEach((view) => {
    if (!storedViewsByPostId[view.postId]) {
      storedViewsByPostId[view.postId] = [];
    }
    storedViewsByPostId[view.postId].push(view.id);
  });

  return storedViewsByPostId;
}

function buildStoredAttachmentsFromLegacy() {
  const storedAttachments: PostMappedAttachmentType = {};

  AllAttachments.forEach((attachment) => {
    storedAttachments[attachment.id] = attachment;
  });

  return storedAttachments;
}


if (process.argv[1]?.includes("posts-builder.tsx")) {
  buildPostsData();
}
