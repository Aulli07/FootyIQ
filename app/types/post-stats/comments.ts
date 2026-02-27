export type CommentType = {
  id: string;
  postId: string;
  userId: string;
  content: string;
  mentions: string[];
  createdAt: number;
}