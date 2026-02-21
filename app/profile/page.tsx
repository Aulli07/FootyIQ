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
import Header from "../../components/header";

import { users } from "../data/users";
import { userType } from "../types/users";
import Link from "next/link";

import { follows } from "../data/follows";


export function Profile ({ userId }: { userId?: string }) {

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
    friends: <Friends id={userId || ""}/>,
  };

  const user = users.find(user => user.id === userId) as userType;

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dateObj = new Date(user?.dateJoined || "");
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  const formattedDate = `Joined ${month} ${year}`;
  
  return (
    <main className="px-4">
      <Header headerText="Profile" />

      <div className="flex flex-col gap-2 px-3 py-6  ">
        <div className="flex gap-4 items-center justify-start h-27">
          <div className="relative h-18 w-18 flex">
            <div className="relative h-full w-full overflow-hidden rounded-full ring-2 ring-white/10">
              <Image
                src={user?.avatarUrl}
                alt="profile-pic"
                fill
                sizes="68px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="items-left">
              <p className={`text-xl ${poppins.className} font-semibold`}>{user?.name}</p>
            </div>
            <div className="items-left">
              <p className={`text-sm ${poppins.className} font-semibold`}>@{user?.username}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-wrap min-h-10">
            <p className={`text-sm ${poppins.className} font-medium text-white/80`}>{user?.bio || "No bio available."}</p>
          </div>
          <div className="flex gap-1 items-center">
            <img src="/images/history-light-fill.png" alt="bio-date-icon" className="h-5 w-5 inline" />

            <p className={`text-sm ${poppins.className} font-medium text-white/80`}>{formattedDate}</p>
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




const Friends = ({ id }: { id: string }) => {

  const getFollowers = (userId: string) => {
    const followingIds = follows.filter(f => f.followerId === userId).map(f => f.followingId);

    return users.filter(u => followingIds.includes(u.id));
  }

  const followers = getFollowers(id);

  return (
    <section className="w-full pt-2 pb-3 text-white">
      <div className="flex items-center justify-between pb-3 px-1">
        <p className={`${poppins.className} text-sm font-semibold text-white/90`}>
          Connected Friends
        </p>
        <p className={`${poppins.className} text-xs font-medium text-white/60`}>
          {followers.length} total
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {followers.map((friend) => (
          <Link href={{ pathname: `/profile/${friend.username}` }} key={friend.id}>
            <article
              key={friend.id}
              className="w-full rounded-2xl border border-white/20 bg-white/5 backdrop-blur px-4 py-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-emerald-500/35 shrink-0">
                  <Image
                    src={friend.avatarUrl}
                    alt={friend.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <p
                    className={`${poppins.className} text-sm sm:text-base font-semibold text-white truncate`}
                  >
                    {friend.name}
                  </p>
                  <p
                    className={`${poppins.className} text-xs sm:text-sm font-medium text-white/60 truncate`}
                  >
                    @{friend.username}
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label={`Open options for ${friend.name}`}
                className="h-9 w-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center text-white/85 text-xl leading-none"
              >
                ⋯
              </button>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};




function FullProfile() {
  const user = users.find(user => user.username === "alwell");
  return <Profile userId={user?.id || ""} />;
}

export default FullProfile;