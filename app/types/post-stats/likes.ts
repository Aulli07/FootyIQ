export type LikeType = {
  id: string;
  postId: string;
  userId: string;
  postType: "post" | "commnt";
  createdAt: number;
};
