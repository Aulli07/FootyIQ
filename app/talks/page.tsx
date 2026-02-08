"use client";

import Header from "../components/header";

import { useState } from "react";
import Image from "next/image";
import { poppins } from "../fonts";

import { Posts } from "../data/posts";
import { PostType } from "../types/posts";


import { AnimatePresence, motion } from "framer-motion";

function PostDisplay({ post }: { post: PostType }) {
  return (
    <div className="flex justify-start items-start gap-4 w-full border-b border-white/30 pb-7 pt-3">
      <div>
        <div className="relative h-12 w-12 object-cover">
          <Image src={post.user.avatarUrl} alt={post.user.name} sizes="32px" fill className="object-cover rounded-full border border-emerald-700 shadow-md" />
        </div>
      </div>
      <div className="flex flex-col ml-1 gap-2">
        <div className="flex items-center h-4">
          <p className={`text-md text-white ${poppins.className} tracking-wide font-semibold`}>{post.user.name}</p>
          <span className="ml-2 px-1.5 py-0.5 text-xs text-white/70 bg-emerald-700 rounded">{((new Date().getTime() -  new Date(post.createdAt).getTime()) / (1000 * 60 * 60)).toPrecision(1)}h</span>
        </div>
        <p className={`text-sm text-white/80 ${poppins.className} tracking-wide`}>{post.content}</p>
        <div className="flex justify-between items-center w-[90%] mt-3">
          <div className="flex items-center gap-2">
            <Image src="/images/like-light.png" alt="Like" width={20} height={20} className="object-cover" />
            <span className={`text-sm text-white/70 ${poppins.className}`}>{post.stats.likes}</span>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/images/comment-light.png" alt="Comment" width={20} height={20} className="object-cover" />
            <span className={`text-sm text-white/70 ${poppins.className}`}>{post.stats.comments}</span>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/images/view-light.png" alt="View" width={20} height={20} className="object-cover" />
            <span className={`text-sm text-white/70 ${poppins.className}`}>{post.stats.views}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function PersonalTalks() {
  let personalPosts = Posts as PostType[]; // Type assertion
  personalPosts = Posts.filter((post) => post.id === "01"); // Example filter for personal posts

  return (
    <div className="display flex flex-col py-4">
      {personalPosts.map((post) => (
        <PostDisplay key={post.id} post={post} />
      ))}
    </div>
  );
}
      {/* <div className="flex justify-start items-start gap-4 w-full">
        <div>
          <div className="relative h-12 w-12 object-cover">
            <Image src="/images/ronaldo.jpg" alt="Ronaldo" sizes="32px" fill className="object-cover rounded-full border border-emerald-700 shadow-md" />
          </div>
        </div>
        <div className="flex flex-col ml-1 gap-2">
          <div className="flex items-center h-4">
            <p className={`text-md text-white/80 ${poppins.className} tracking-wide`}>Alwell Chukwuka</p>
            <span className="ml-2 px-1.5 py-0.5 text-xs text-white bg-emerald-700 rounded">2 mins ago</span>
          </div>

          <p className={`text-sm text-white ${poppins.className} tracking-wide`}>Hey, I just wanted to say that your performance in the last match was incredible! Your dribbling skills and quick thinking on the field really stood out. Keep up the great work!</p>

          <div className="flex justify-between items-center w-[90%] mt-3">
            <div className="flex items-center gap-2">
              <Image src="/images/like-light.png" alt="Like" width={20} height={20} className="object-cover" />
              <span className={`text-sm text-white/70 ${poppins.className}`}>12</span>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/images/comment-light.png" alt="Comment" width={20} height={20} className="object-cover" />
              <span className={`text-sm text-white/70 ${poppins.className}`}>4</span>
            </div>  
            <div className="flex items-center gap-2">   
              <Image src="/images/view-light.png" alt="View" width={20} height={20} className="object-cover" />
              <span className={`text-sm text-white/70 ${poppins.className}`}>200</span>
            </div>

          </div>
        </div>
      </div> */}

function PublicTalks() {
  return <div className="text-white font-medium">This is public</div>;
}


const Talks = () => { 
  const talkTabs = [
    { key: "Personal", label: "Personal" },
    { key: "Public", label: "Public" },
  ] as const;

  type talkTabType = (typeof talkTabs)[number]["key"];

  const [talkTab, setTalkTab] = useState<talkTabType>("Personal");

  const talkTabContent = {
    "Personal": <PersonalTalks />,
    "Public": <PublicTalks />,
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
            <span className={`${poppins.className} text-sm text-white ${talkTab === tab.key ? "font-semibold" : "font-medium"}`}>
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
          <motion.div
          key={talkTab}
          className="mt-6"
          // initial={{ x: 50, opacity: 0 }}
          // animate={{ x: 0, opacity: 1 }}
          // exit={{ x: -50, opacity: 0 }}
          // transition={{ duration: 0.4, ease: "easeIn" }}
        >
          {talkTabContent[talkTab]}
        </motion.div>
      </AnimatePresence>
      </div>
      {/* <AnimatePresence mode="wait">
        <motion.div
        key={talkTab}
        initial={{ x: 48, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -48, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex flex-row justify-center items-center"
      >
        {talkTab === "You" && <PersonalTalks />}
        {talkTab === "You" && <PublicTalks />}
      </motion.div>
      </AnimatePresence> */}
      {/* <div className="pt-6 text-lg">This is the talks page</div> */}
    </main>
  );
};

export default Talks;
