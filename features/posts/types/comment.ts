import { Dispatch, SetStateAction, RefObject } from "react";


export type CommentType = {
  id: string;
  postId: string;
  userId: string;

  type: string;
  content: string;

  tags: string[];
  createdAt: string;
}

export type commentsMappedType = Record<string, CommentType>;

export type commentsByPostIdType = Record<string, string[]>;

export type commentInputType = {
  postId: string;
  commentContent: string;
  timestamp: number;
  authorId: string;
}


export type CommentInfoType = {
  shouldUpload: boolean;
  setShouldUpload: Dispatch<SetStateAction<boolean>>;
  myCommentRef: RefObject<HTMLInputElement | null>,
  lastCommentKeyRef: RefObject<string | null>;
  postId: string;
  userId: string;
  setUploadedComments: Dispatch<SetStateAction<CommentType[]>>;
}