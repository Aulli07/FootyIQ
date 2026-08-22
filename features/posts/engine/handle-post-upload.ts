import { useEffect } from "react";

import { createPostKey } from "@/shared/utils/identity";
import { savePostFromUpload } from "../services/uploadPosts";
import { PostInfoType } from "../types/post-upload-info";


export function handleUploadOfPost(postInfo: PostInfoType) {
  postInfo.setShouldUpload(true);
  useUploadPost(postInfo.shouldUpload, postInfo);
}

export function useUploadPost(shouldUpload: boolean, postInfo: PostInfoType) {
  useEffect(() => {
    if (!shouldUpload) return;

    const postContent = postInfo.myRef.current?.value;
    if (!postContent) {
      return;
    }

    const normalizedPostContent = postContent.trim();
    const hasCompletedUpload = normalizedPostContent.length > 0;
    const compId = postInfo.selectedComparisonData?.comparisonId;
    const postKey = createPostKey([
      normalizedPostContent,
      postInfo.selectedComparisonData?.comparisonId ?? "",
      JSON.stringify(postInfo.comparisonPostStats ?? {}),
    ]);

    if (!hasCompletedUpload) {
      postInfo.lastPostKeyRef.current = null;
      // postInfo.setCurrentPostId(null);
      return;
    }

    if (postInfo.lastPostKeyRef.current === postKey) {
      return;
    }

    const currentPost = savePostFromUpload({
      postContent: normalizedPostContent,
      compId,
      compStats: postInfo.comparisonPostStats,
      timestamp: Date.now(),
      authorId: "u-1",
    });

    // postInfo.setCurrentPostId(currentPost?.id ?? null);
    postInfo.lastPostKeyRef.current = postKey;
  }, [shouldUpload]);
}