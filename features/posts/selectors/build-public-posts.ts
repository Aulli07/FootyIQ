import { PostMappedType, PostType } from "@/features/posts/types/post";
import { getFollowingByUserId } from "@/features/users/selectors/get-following-by-user-id";

type BuildPublicPostsArgs = {
  postsStore: PostMappedType;
  userId: string;
};

export function buildPublicPosts({
  postsStore,
  userId,
}: BuildPublicPostsArgs): PostType[] {
  const followingIds = getFollowingByUserId(userId);

  return Object.values(postsStore).filter((post) =>
    followingIds.includes(post.authorId),
  );
}
