import { buildHashId, createPostKey } from "@/shared/utils/identity";
import { commentInputType, CommentType } from "../types/comment";
import { manageCommentInStorage } from "../data/new/post-comments-storage";



export function saveCommentFromUpload(newComment: commentInputType) {
  if (!newComment.commentContent.trim()) {
    return;
  }
  const commentId = createNewCommentId(newComment);
  const commentEntry = buildCommentEntry(commentId, newComment);
  return manageCommentInStorage(commentEntry);
}

function createNewCommentId(newComment: commentInputType): string {
  const key = createPostKey([
    newComment.commentContent,
    String(newComment.timestamp),
  ]);

  return buildHashId(key, "c-");
}

function buildCommentEntry(id: string, newComment: commentInputType): CommentType {
  return {
    id,
    postId: newComment.postId,
    userId: newComment.authorId ?? "u-1",
    type: "post",
    content: newComment.commentContent.trim(),
    tags: [],
    createdAt: String(newComment.timestamp),
  };
}