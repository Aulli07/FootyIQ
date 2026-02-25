"use client";

import Header from "../../components/header";

import { useState } from "react";
import { poppins } from "../fonts";

import { AllTalks } from "../data/talks";
import { TalkType } from "../types/talks";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { PostDisplay } from "../../components/post-display";
import { users } from "../data/users";
import { follows } from "../data/follows";

import { getFollowers } from "../utils/playerFilters";

const MAIN_USER_ID = "u-1";

const shuffleArray = (talks: TalkType[]) => {
  const arr = [...talks];

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
  talk,
  followingIds,
  followerCountMap,
}: {
  talk: TalkType;
  followingIds: string[];
  followerCountMap: Record<string, number>;
}) => {
  const now = Date.now();
  const createdAt = new Date(talk.createdAt).getTime();
  const ageInHours = Number.isNaN(createdAt)
    ? 72
    : Math.max(0, (now - createdAt) / (1000 * 60 * 60));

  const recencyScore = 320 / (1 + ageInHours / 9);
  const engagementScore =
    talk.stats.likes * 1 + talk.stats.comments * 2 + talk.stats.views * 0.04;

  const isFollowingAuthor = followingIds.includes(talk.authorId);
  const followingBoost = isFollowingAuthor ? 260 : 25;
  const popularityBoost = (followerCountMap[talk.authorId] ?? 0) * 120;

  const author = users.find((user) => user.id === talk.authorId);
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

const buildForYouTalks = () => {
  const { followingIds } = getFollowers(MAIN_USER_ID);
  const followerCountMap = getFollowerCountMap();

  const scoredTalks = AllTalks.filter((talk) => talk.authorId !== MAIN_USER_ID)
    .map((talk) => ({
      talk,
      score: getForYouScore({
        talk,
        followingIds,
        followerCountMap,
      }),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 30)
    .map((item) => item.talk);

  const followingTalks = scoredTalks.filter((talk) =>
    followingIds.includes(talk.authorId),
  );
  const otherTalks = scoredTalks.filter(
    (talk) => !followingIds.includes(talk.authorId),
  );

  const mostlyFollowing = followingTalks.slice(0, 20);
  const exploreChunk = otherTalks.slice(0, 10);

  return shuffleArray([...mostlyFollowing, ...exploreChunk]);
};

const SHUFFLED_FOR_YOU_TALKS = buildForYouTalks();

export function PersonalTalks({ id }: { id?: string }) {
  let personalPosts = AllTalks as TalkType[]; // Type assertion

  personalPosts = AllTalks.filter((post) => post.authorId === id); // Example filter for personal posts

  return (
    <div className="display flex flex-col gap-5">
      {personalPosts.map((talk) => (
        <Link href={{ pathname: `/talks/${talk.id}` }} key={talk.id}>
          <PostDisplay talk={talk} />
        </Link>
      ))}
    </div>
  );
}

function ForYouTalks() {
  return (
    <div className="display flex flex-col gap-5">
      {SHUFFLED_FOR_YOU_TALKS.map((talk) => (
        <Link href={{ pathname: `/talks/${talk.id}` }} key={talk.id}>
          <PostDisplay talk={talk} />
        </Link>
      ))}
    </div>
  );
}

function PublicTalks({ userId }: { userId: string }) {
  const getFollowingPosts = (userId: string | null) => {
    const { followingIds } = getFollowers(userId);
    return AllTalks.filter((talk) => followingIds.includes(talk.authorId));
  };

  const followingPosts = getFollowingPosts(userId);

  return (
    <div className="display flex flex-col gap-4">
      {followingPosts.map((talk) => (
        <Link href={{ pathname: `/talks/${talk.id}` }} key={talk.id}>
          <PostDisplay talk={talk} />
        </Link>
      ))}
    </div>
  );
}

const Talks = () => {
  const talkTabs = [
    { key: "for_you", label: "For You" },
    { key: "following", label: "Following" },
  ] as const;

  type talkTabType = (typeof talkTabs)[number]["key"];

  const [talkTab, setTalkTab] = useState<talkTabType>("for_you");

  const talkTabContent = {
    for_you: <ForYouTalks />,
    following: <PublicTalks userId={MAIN_USER_ID} />,
  };

  return (
    <main className="w-full px-6 pt-2 text-white">
      <Header headerText="Talks" />

      <div className="flex flex-row justify-around items-center w-full border-b border-white/40">
        {talkTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className="cursor-pointer relative px-3 py-2 text-md font-medium tracking-wide"
            onClick={() => setTalkTab(tab.key)}
          >
            <span
              className={`${poppins.className} text-sm text-white ${talkTab === tab.key ? "font-semibold" : "font-medium"}`}
            >
              {tab.label}

              {talkTab === tab.key && (
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
          <motion.div key={talkTab} className="mt-4">
            {talkTabContent[talkTab]}
          </motion.div>
        </AnimatePresence>
      </div>
      <Link href="/talks/add-post">
        <div className="fixed right-10 bottom-30 flex justify-center items-center rounded-full bg-emerald-600 hover:bg-emerald-700 p-3">
          <img src="/images/add.png" alt="add-talk" className="object-cover w-10 h-10" />
        </div>  
      </Link>
    </main>
  );
};

export default Talks;
