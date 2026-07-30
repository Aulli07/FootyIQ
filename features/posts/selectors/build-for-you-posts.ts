import { buildHydratedPostsStore } from "@/features/posts/data/new/posts-store";
import { getPostAnalyticsById } from "@/features/posts/selectors/get-post-analytics-by-id";
import { getPostCountsById } from "@/features/posts/selectors/get-post-counts-by-id";
import { getFollowingByUserId } from "@/features/users/selectors/get-following-by-user-id";
import { getUserFollowCountsById } from "@/features/users/selectors/get-user-follow-counts-by-id";
import { PostMappedType, PostType } from "@/features/posts/types/post";

import { shuffleArray } from "../utils/shuffle-array";

type BuildForYouPostsArgs = {
  postsStore?: PostMappedType;
  userId: string;
};

export function buildForYouPosts({
  postsStore = buildHydratedPostsStore(),
  userId,
}: BuildForYouPostsArgs): PostType[] {
  const allPosts = Object.values(postsStore);
  const followingIds = getFollowingByUserId(userId);
  const followerCountMap = getUserFollowCountsById(userId);

  const scoredPosts = allPosts
    .filter((post) => post.authorId !== userId)
    .map((post) => ({
      post,
      score: getForYouScore({
        post,
        followingIds,
        followerCountMap,
      }),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 30)
    .map((item) => item.post);

  const followingPosts = scoredPosts.filter((post) =>
    followingIds.includes(post.authorId),
  );
  const otherPosts = scoredPosts.filter(
    (post) => !followingIds.includes(post.authorId),
  );

  const mostlyFollowing = followingPosts.slice(0, 20);
  const exploreChunk = otherPosts.slice(0, 10);

  return shuffleArray([...mostlyFollowing, ...exploreChunk]);
}

function getForYouScore({
  post,
  followingIds,
  followerCountMap,
}: {
  post: PostType;
  followingIds: string[];
  followerCountMap: Record<string, number>;
}) {
  const counts = getPostCountsById(post.id);
  const analytics = getPostAnalyticsById(post.id);

  const now = Date.now();
  const createdAt = new Date(post.createdAt).getTime();
  const ageInHours = Number.isNaN(createdAt)
    ? 72
    : Math.max(0, (now - createdAt) / (1000 * 60 * 60));

  const recencyScore = 320 / (1 + ageInHours / 9);
  const statsScore =
    counts.likeCount * 4 + counts.commentCount * 6 + counts.viewCount * 0.04;
  const analyticsScore =
    (analytics?.likeIds.length ?? 0) * 1.5 +
    (analytics?.commentIds.length ?? 0) * 2 +
    (analytics?.viewIds.length ?? 0) * 0.1 +
    (analytics?.attachmentIds.length ?? 0) * 8;

  const isFollowingAuthor = followingIds.includes(post.authorId);
  const followingBoost = isFollowingAuthor ? 260 : 25;
  const popularityBoost = (followerCountMap[post.authorId] ?? 0) * 120;
  const randomBoost = Math.random() * 160;

  return (
    recencyScore +
    statsScore +
    analyticsScore +
    followingBoost +
    popularityBoost +
    randomBoost
  );
}
