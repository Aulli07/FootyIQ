"use client";

import PageTitle from "@/components/page-title";
import Image from "next/image";
import { poppins } from "../fonts";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { PersonalPosts } from "../posts/page";

import SearchBar from "../../components/search-bar";
import { totalComparedPlayers } from "../page";
import Compares from "../../components/top-compare-cards";
import Header from "../../components/header";

import { users } from "../data/users";
import { userType } from "../types/users";
import Link from "next/link";

import { foundComparisons, getFollowers } from "../utils/playerFilters";
import { PlayerType } from "../types/players";

import { getSearchedPlayers } from "../utils/playerFilters";

import { players } from "../data/players";
import AddPost from "@/components/add-post";

import { useTheme } from "next-themes";

export function Profile({ userId }: { userId?: string }) {
  const postTabs = [
    { key: "posts", label: "Posts" },
    { key: "history", label: "History" },
  ] as const;

  type postTabType = (typeof postTabs)[number]["key"];

  const [postTab, setPostTab] = useState<postTabType>("posts");

  const profileTabContent = {
    posts: <PersonalPosts id={userId} />,
    history: <History />,
  };

  const user = users.find((user) => user.id === userId) as userType;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dateObj = new Date(user?.dateJoined || "");
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  const formattedDate = `Joined ${month} ${year}`;

  const followers = getFollowers(userId).followerIds;
  const following = getFollowers(userId).followingIds;

  const followList = [
    { label: "followers", number: followers.length },
    { label: "following", number: following.length },
  ];

  const { theme } = useTheme()
  const [ mounted, setMounted ] = useState<boolean>()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
 
  return (
    <main className="px-4 flex flex-col gap-4">
      <div className="flex flex-col gap-4 px-3 py-3 mt-4 ">
        <div className="flex gap-4 items-center justify-start min-h-25">
          <div className="relative h-18 w-18 flex">
            <div className="relative h-full w-full overflow-hidden rounded-full ring-2 ring-black/10 dark:ring-white/10">
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
              <p className={`text-xl ${poppins.className} font-semibold`}>
                {user?.name}
              </p>
            </div>
            <div className="items-left">
              <p className={`text-sm ${poppins.className} font-semibold`}>
                @{user?.username}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-wrap min-h-10">
            <p
              className={`text-sm ${poppins.className} font-medium text-light-text-secondary dark:text-dark-text-secondary`}
            >
              {user?.bio || "No bio available."}
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <img
              src={theme === "dark" ? "/images/history-light-fill.png" : "/images/history-dark-fill.png"}
              alt="bio-date-icon"
              className="h-5 w-5 inline"
            />

            <p
              className={`text-sm ${poppins.className} font-medium text-light-text-secondary dark:text-dark-text-secondary`}
            >
              {formattedDate}
            </p>
          </div>
        </div>
        <div className="flex gap-3 min-w-0">
          {followList.map((follow) => (
            <Link
              href={{
                pathname: `/profile/${follow.label}`,
                query: { userId: userId },
              }}
              key={follow.label}
            >
              <p
                className={`text-sm text-light-text-primary dark:text-dark-text-primary font-medium tracking-wide ${poppins.className} min-w-0`}
              >
                <span className="font-bold">{follow.number}</span>{" "}
                {follow.label}
              </p>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-around items-center w-full border-b border-light-ui-border dark:border-white/30">
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
        <div className="overflow-hidden relative w-full px-3">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={postTab}>{profileTabContent[postTab]}</motion.div>
          </AnimatePresence>
        </div>
        <AddPost />
      </div>
    </main>
  );
}

const History = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [results, setResults] = useState<Array<Array<PlayerType>>>([]);

  function handleSearch(query: string) {
    const compared = getSearchedPlayers(players, query);
    const fetchedComparisons = foundComparisons(totalComparedPlayers, compared);

    setResults(fetchedComparisons);
  }

  return (
    <main className="w-full pt-2 text-light-text-primary dark:text-dark-text-primary flex flex-col gap-5">
      <SearchBar
        setIsSearch={setIsSearch}
        isSearch={isSearch}
        onSearch={handleSearch}
      />
      <div className="flex flex-col gap-3">
        {isSearch ? (
          <Compares compareList={results} categoryType="history" />
        ) : (
          <Compares
            compareList={totalComparedPlayers.slice(0, 5)}
            categoryType="history"
          />
        )}
      </div>
    </main>
  );
};

function FullProfile() {
  const user = users.find((user) => user.username === "alwell");
  return <Profile userId={user?.id || ""} />;
}

export default FullProfile;
