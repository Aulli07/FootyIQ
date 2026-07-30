export type LikeType = {
  id: string;

  postId: string;
  userId: string;
  
  postType: string;
  createdAt: string;
};

export type LikeMappedType = Record<string, LikeType>

export type LikesByPostIdType = Record<string, string[]>;
