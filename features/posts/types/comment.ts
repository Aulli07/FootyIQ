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