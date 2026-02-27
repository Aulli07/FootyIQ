export type CommentType = {
  id: string;
  postId: string;
  userId: string;
  content: string;
  parentCommmentId: string;
  createdAt: number;
}