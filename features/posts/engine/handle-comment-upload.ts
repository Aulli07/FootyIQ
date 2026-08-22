import { useEffect } from "react";

import { createPostKey } from "@/shared/utils/identity";
import { CommentInfoType } from "../types/comment-upload-info";
import { saveCommentFromUpload } from "../services/uploadComments";


export function useUploadComment(commentInfo: CommentInfoType) {
  useEffect(() => {
    if (!commentInfo.shouldUpload) return;

    const commentContent = commentInfo.myCommentRef.current?.value;
    if (!commentContent) {
      return;
    }

    const normalizedCommentContent = commentContent.trim();
    const hasCompletedUpload = normalizedCommentContent.length > 0;
    const commentKey = createPostKey([normalizedCommentContent]);

    if (!hasCompletedUpload) {
      commentInfo.lastCommentKeyRef.current = null;
      // postInfo.setCurrentPostId(null);
      return;
    }
    
    if (commentInfo.lastCommentKeyRef.current === commentKey) {
      return;
    }

    const currentPost = saveCommentFromUpload({
      postId: commentInfo.postId,
      commentContent: normalizedCommentContent,
      timestamp: Date.now(),
      authorId: commentInfo.userId,
    });

    // postInfo.setCurrentPostId(currentPost?.id ?? null);
    commentInfo.lastCommentKeyRef.current = commentKey;
  }, [commentInfo.shouldUpload]);
}