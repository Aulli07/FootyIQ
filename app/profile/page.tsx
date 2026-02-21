"use client"

import PageTitle from "@/components/page-title";
import Image from "next/image";
import { poppins } from "../fonts";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { PersonalTalks } from "../talks/page";

import SearchBar from "../../components/search-bar";
import { totalComparedPlayers } from "../page";
import Compares from "../../components/top-compare-cards";

function Profile () {

  const talkTabs = [
      { key: "talks", label: "Talks" },
      { key: "history", label: "History" },
      { key: "friends", label: "Friends"}
    ] as const;
  
    type talkTabType = (typeof talkTabs)[number]["key"];
  
    const [talkTab, setTalkTab] = useState<talkTabType>("talks");
  
    const profileTabContent = {
      talks: <PersonalTalks />,
      history: <History />,
      friends: <div className="p-4">Friends content</div>,
    };
  
  return (
    <main className="px-4">
      <PageTitle title="Profile" />

      <div className="flex flex-col gap-2 px-3 py-6  ">
        <div className="flex gap-4 items-center justify-start h-27">
          <div className="relative h-18 w-18 flex">
            <div className="relative h-full w-full overflow-hidden rounded-full ring-2 ring-white/10">
              <Image
                src="/images/ronaldo.jpg"
                alt="profile-pic"
                fill
                sizes="68px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="items-left">
              <p className={`text-xl ${poppins.className} font-semibold`}>dev_boy</p>
            </div>
            <div className="items-left">
              <p className={`text-sm ${poppins.className} font-semibold`}>@c_aulli</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-wrap min-h-10">
            <p className={`text-sm ${poppins.className} font-medium text-white/80`}>I'm a passionate football fan and developer. I love creating apps that bring fans closer to their favorite teams and players.</p>
          </div>
          <div className="flex gap-1 items-center">
            <img src="/images/history-light-fill.png" alt="bio-date-icon" className="h-5 w-5 inline" />

            <p className={`text-sm ${poppins.className} font-medium text-white/80`}>Joined January 2024</p>
          </div>
        </div>  
      </div>
      <div className="flex flex-row justify-around items-center w-full border-b border-white/30">
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
      <div className="overflow-hidden relative w-full px-3">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={talkTab} className="mt-4">
            {profileTabContent[talkTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}




const History = () => {
  const [isSearch, setIsSearch] = useState(false);

  return (
    <main className="w-full pt-2 text-white flex flex-col gap-2">
      {/* <Header headerText="History" /> */}
      <SearchBar
        setIsSearch={setIsSearch}
        isSearch={isSearch}
        comparedPlayers={totalComparedPlayers}
      />
      <div >
        <Compares compareList={totalComparedPlayers.slice(0, 10)} categoryType="history"/>
      </div>
    </main>
  );
};

export default Profile;