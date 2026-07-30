import { PostMappedType, PostType } from "@/features/posts/types/post";

type BuildPersonalPostsArgs = {
  postsStore: PostMappedType;
  userId: string;
};

export function buildPersonalPosts({
  postsStore,
  userId,
}: BuildPersonalPostsArgs): PostType[] {
  return Object.values(postsStore).filter((post) => post.authorId === userId);
}
