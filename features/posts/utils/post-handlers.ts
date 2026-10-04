import { Dispatch, SetStateAction } from "react";
import { createLikePayload, saveLikeFromUpload } from "../services/uploadLikes";

export function handleLike(postId: string, userId: string, hasUserLiked: boolean, setLocalLikeCount: Dispatch<SetStateAction<number>>) {
  if (!postId || !userId || hasUserLiked) return;

  const likePayload = createLikePayload(postId, userId);

  const savedLike = saveLikeFromUpload(likePayload);
  if (!savedLike) return undefined;

  setLocalLikeCount((prev) => prev + 1);
}