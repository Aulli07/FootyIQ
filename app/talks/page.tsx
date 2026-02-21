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


export function PersonalTalks() {
  let personalPosts = AllTalks as TalkType[]; // Type assertion

  personalPosts = AllTalks.filter((post) => post.authorId === "u-1"); // Example filter for personal posts

  return (
    <div className="display flex flex-col gap-5">
      {personalPosts.map((talk) => (
        <Link
          href={{ pathname: `/talks/${talk.id}` }}
          key={talk.id}
        >
          <PostDisplay talk={talk} />
        </Link>
      ))}
    </div>
  );
}

function PublicTalks({userId} : {userId : string}) {
  const getFollowerPosts = (userId: string | null) => {
    const followingIds = follows.filter(f => f.followerId === userId).map(f => f.followingId);

    return AllTalks.filter(talk => followingIds.includes(talk.authorId));
  }

  const followerPosts = getFollowerPosts(userId)

  return (
    <div className="display flex flex-col gap-4">
      {followerPosts.map((talk) => (
        <Link href={{ pathname: `/talks/${talk.id}`}} key={talk.id}>
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
    for_you: <PersonalTalks />,
    following: <PublicTalks userId="u-1"/>,
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
    </main>
  );
};

export default Talks;
