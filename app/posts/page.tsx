"use client";

import Header from "../../components/header";

import { useState } from "react";
import { poppins } from "../fonts";

import { AllPosts } from "../data/posts";
import { PostType } from "../types/posts";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { PostDisplay } from "../../components/post-display";
import { users } from "../data/users";
import { follows } from "../data/follows";

import { getFollowers } from "../utils/playerFilters";

import AddPost from "@/components/add-post";
import Stats from "../utils/post-stats";

const MAIN_USER_ID = "u-1";

const shuffleArray = (posts: PostType[]) => {
  const arr = [...posts];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};

const getFollowerCountMap = () => {
  const followerCountMap: Record<string, number> = {};

  for (const follow of follows) {
    const userBeingFollowedId = follow.followingId;

    if (!followerCountMap[userBeingFollowedId]) {
      followerCountMap[userBeingFollowedId] = 0;
    }

    followerCountMap[userBeingFollowedId] += 1;
  }

  return followerCountMap;
};

const getForYouScore = ({
  post,
  followingIds,
  followerCountMap,
}: {
  post: PostType;
  followingIds: string[];
  followerCountMap: Record<string, number>;
}) => {
  const totalLikes = Stats.likesByPost[post.id] ?? 0;
  const totalComments = Stats.commentsByPost[post.id] ?? 0;
  const totalViews = Stats.viewsByPost[post.id] ?? 0;

  const now = Date.now();
  const createdAt = new Date(post.createdAt).getTime();
  const ageInHours = Number.isNaN(createdAt)
    ? 72
    : Math.max(0, (now - createdAt) / (1000 * 60 * 60));

  const recencyScore = 320 / (1 + ageInHours / 9);
  const engagementScore =
    totalLikes * 1 + totalComments * 2 + totalViews * 0.04;

  const isFollowingAuthor = followingIds.includes(post.authorId);
  const followingBoost = isFollowingAuthor ? 260 : 25;
  const popularityBoost = (followerCountMap[post.authorId] ?? 0) * 120;

  const author = users.find((user) => user.id === post.authorId);
  const joinedAt = author ? new Date(author.dateJoined).getTime() : 0;
  const accountAgeDays = joinedAt
    ? (now - joinedAt) / (1000 * 60 * 60 * 24)
    : 9999;
  const recentCreatorBoost = accountAgeDays <= 800 ? 70 : 0;

  const randomBoost = Math.random() * 160;

  return (
    recencyScore +
    engagementScore +
    followingBoost +
    popularityBoost +
    recentCreatorBoost +
    randomBoost
  );
};

const buildForYouPosts = () => {
  const { followingIds } = getFollowers(MAIN_USER_ID);
  const followerCountMap = getFollowerCountMap();

  const scoredPosts = AllPosts.filter((post) => post.authorId !== MAIN_USER_ID)
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
};

const SHUFFLED_FOR_YOU_POSTS = buildForYouPosts();

export function PersonalPosts({ id }: { id?: string }) {
  let personalPosts = AllPosts as PostType[];

  personalPosts = AllPosts.filter((post) => post.authorId === id);

  return (
    <div className="display flex flex-col gap-5">
      {personalPosts.map((post) => (
        <Link href={{ pathname: `/posts/${post.id}` }} key={post.id}>
          <PostDisplay post={post} />
        </Link>
      ))}
    </div>
  );
}

function ForYouPosts() {
  return (
    <div className="display flex flex-col gap-5">
      {SHUFFLED_FOR_YOU_POSTS.map((post) => (
        <Link href={{ pathname: `/posts/${post.id}` }} key={post.id}>
          <PostDisplay post={post} />
        </Link>
      ))}
    </div>
  );
}

function PublicPosts({ userId }: { userId: string }) {
  const getFollowingPosts = (userId: string | null) => {
    const { followingIds } = getFollowers(userId);
    return AllPosts.filter((post) => followingIds.includes(post.authorId));
  };

  const followingPosts = getFollowingPosts(userId);

  return (
    <div className="display flex flex-col gap-4">
      {followingPosts.map((post) => (
        <Link href={{ pathname: `/posts/${post.id}` }} key={post.id}>
          <PostDisplay post={post} />
        </Link>
      ))}
    </div>
  );
}

const Posts = () => {
  const postTabs = [
    { key: "for_you", label: "For You" },
    { key: "following", label: "Following" },
  ] as const;

  type postTabType = (typeof postTabs)[number]["key"];

  const [postTab, setPostTab] = useState<postTabType>("for_you");

  const postTabContent = {
    for_you: <ForYouPosts />,
    following: <PublicPosts userId={MAIN_USER_ID} />,
  };

  return (
    <main className="w-full px-6 pt-2 text-light-text-primary dark:text-dark-text-primary">
      <Header headerText="Posts" />

      <div className="flex flex-row justify-around items-center w-full border-b border-light-ui-border dark:border-white/40">
        {postTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className="cursor-pointer relative px-3 py-2 text-md font-medium tracking-wide"
            onClick={() => setPostTab(tab.key)}
          >
            <span
              className={`${poppins.className} text-sm text-light-text-secondary dark:text-dark-text-primary ${postTab === tab.key ? "font-semibold" : "font-medium"}`}
            >
              {tab.label}

              {postTab === tab.key && (
                <motion.span
                  layoutId="underline"
                  initial={{ x: 0, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 0, opacity: 0 }}
                  className="absolute -bottom-0 left-0 right-0 h-1 bg-emerald-400 rounded-full"
                />
              )}
            </span>
          </button>
        ))}
      </div>
      <div className="overflow-hidden relative w-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={postTab} className="mt-4">
            {postTabContent[postTab]}
          </motion.div>
        </AnimatePresence>
      </div>

      <AddPost />
    </main>
  );
};

export default Posts;
