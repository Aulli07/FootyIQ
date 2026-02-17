"use client";

import Header from "../components/header";

import { useState } from "react";
import { poppins } from "../fonts";

import { Posts } from "../data/posts";
import { PostType } from "../types/posts";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { PostDisplay } from "../components/post-display";

function PersonalTalks() {
  let personalPosts = Posts as PostType[]; // Type assertion
  personalPosts = Posts.filter((post) => post.id === "01"); // Example filter for personal posts

  return (
    <div className="display flex flex-col gap-4">
      {personalPosts.map((post) => (
        <PostDisplay key={post.id} post={post} />
      ))}
    </div>
  );
}

function PublicTalks() {
  return (
    <div className="display flex flex-col gap-4">
      {Posts.map((post) => (
        <PostDisplay key={post.id} post={post} />
      ))}
    </div>
  );
}

const Talks = () => {
  const talkTabs = [
    { key: "Personal", label: "Personal" },
    { key: "Public", label: "Public" },
  ] as const;

  type talkTabType = (typeof talkTabs)[number]["key"];

  const [talkTab, setTalkTab] = useState<talkTabType>("Personal");

  const talkTabContent = {
    Personal: <PersonalTalks />,
    Public: <PublicTalks />,
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
