import { useEffect, useState } from "react";

import { createPostKey } from "@/shared/utils/identity";
import { savePostFromUpload } from "../services/uploadPosts";
import { PostInfoType, PostType } from "../types/post";


export function handleUploadOfPost(postInfo: PostInfoType) {
  postInfo.setShouldUpload(true);
  useUploadPost(postInfo.shouldUpload, postInfo);
}

export function useUploadPost(shouldUpload: boolean, postInfo: PostInfoType) {
  const [currentPost, setCurrentPost] = useState<PostType | undefined>(undefined);

  useEffect(() => {
    if (!shouldUpload) return;

    const postContent = postInfo.myPostRef.current?.value;
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
    postInfo.setShouldUpload(false);

    if (postInfo.myPostRef.current) {
      postInfo.myPostRef.current.value = "";
    }
    setCurrentPost(currentPost);

    postInfo.lastPostKeyRef.current = postKey;
  }, [shouldUpload]);

  return currentPost;
}