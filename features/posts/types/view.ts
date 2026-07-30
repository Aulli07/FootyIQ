export type ViewType = {
  id: string;
  
  postId: string;
  userId: string;
  createdAt: string
}

export type ViewMappedType = Record<string, ViewType>;

export type ViewsByPostIdType = Record<string, string[]>;