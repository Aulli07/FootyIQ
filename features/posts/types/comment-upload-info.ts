import { Dispatch, SetStateAction } from "react";
import { RefObject } from "react";

export type CommentInfoType = {
  shouldUpload: boolean;
  setShouldUpload: Dispatch<SetStateAction<boolean>>;
  myCommentRef: RefObject<HTMLInputElement | null>,
  lastCommentKeyRef: RefObject<string | null>;
  postId: string;
  userId: string;
}