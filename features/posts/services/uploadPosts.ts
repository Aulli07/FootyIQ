import { findComparisonFromHistory } from "@/features/compare/selectors/find-comparison";
import { ComparisonStatKey } from "@/features/players/types/comparison-stat-options";

import { managePostInStorage } from "@/features/posts/data/new/post-storage";
import { PostType, UploadPostInput, UploadPostAttachmentInput } from "@/features/posts/types/post";

import { buildHashId, createPostKey } from "@/shared/utils/identity";
import { buildHydratedPostAttachmentsStore, manageAttachmentInStorage } from "../data/new/post-attachments-storage";



export function savePostFromUpload(newPost: UploadPostInput & {timestamp: number}) {
  if (!newPost.postContent.trim()) {
    return;
  }

  const postId = createNewPostId(newPost);
  const postEntry = buildPostEntry(postId, newPost);

  return managePostInStorage(postEntry);
}

function createNewPostId(newPost: UploadPostInput & {timestamp: number}): string {
  const key = createPostKey([
    newPost.postContent,
    newPost.compId ?? "",
    JSON.stringify(newPost.compStats ?? {}),
    String(newPost.timestamp),
  ]);

  return buildHashId(key, "t-");
}

function buildPostEntry(id: string, post: UploadPostInput & {timestamp: number}): PostType {
  const comparison = post.compId ? findComparisonFromHistory(post.compId) : null;

  const attachmmentId = post.compId ? getPostAttachmentEntry(post.compId, post.compStats) : "";

  return {
    id,
    authorId: post.authorId ?? "u-1",
    type: post.compId ? "comparison-post" : "post",
    content: post.postContent.trim(),
    attachmentIds: attachmmentId,
    references: {
      players: comparison ? [comparison.playerA, comparison.playerB] : [],
      comparisons: post.compId ? [post.compId] : [],
    },
    tags: [],
    createdAt: String(post.timestamp),
  };
}


function getPostAttachmentEntry(compId: string, compStats?: Partial<Record<ComparisonStatKey, number[]>>) : string {
  const hydatedPostAttachmentStore = buildHydratedPostAttachmentsStore();

  const attachedId = Object.values(hydatedPostAttachmentStore).find(attachment => (
    attachment.comparisonId === compId && attachment.stats === compStats
  ))?.id

  if (!attachedId) {
    const attachmentId = createNewAttachmentId(compId, compStats);

    const attachmentEntry : UploadPostAttachmentInput = {
      id: attachmentId,
      comparisonId: compId,
      stats: compStats
    }

    return manageAttachmentInStorage(attachmentEntry).id;
  }

  return attachedId
}

function createNewAttachmentId(compId: string, compStats?: Partial<Record<ComparisonStatKey, number[]>>): string {
  const key = createPostKey([
    compId ?? "",
    JSON.stringify(compStats ?? {}),
  ]);

  return buildHashId(key, "pa-");
}