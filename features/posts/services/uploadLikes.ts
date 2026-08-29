import { buildHashId, createPostKey } from "@/shared/utils/identity";
import { manageLikeInStorage } from "../data/new/post-likes-storage";
import { LikeType } from "../types/like";

export type likeInputType = {
  postId: string;
  userId: string;
  timestamp: number;
};

export function createLikePayload(
  postId: string,
  userId: string,
): likeInputType {
  return {
    postId,
    userId,
    timestamp: Date.now(),
  };
}

export function saveLikeFromUpload(newLike: likeInputType) {
  if (!newLike.postId || !newLike.userId) {
    return;
  }

  const likeId = createNewLikeId(newLike);
  const likeEntry = buildLikeEntry(likeId, newLike);
  return manageLikeInStorage(likeEntry);
}

function createNewLikeId(newLike: likeInputType): string {
  const key = createPostKey([
    newLike.postId,
    newLike.userId,
    String(newLike.timestamp),
  ]);

  return buildHashId(key, "l-");
}

function buildLikeEntry(id: string, newLike: likeInputType): LikeType {
  return {
    id,
    postId: newLike.postId,
    userId: newLike.userId,
    postType: "post",
    createdAt: String(newLike.timestamp),
  };
}
