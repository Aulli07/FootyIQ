"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";

import { buildHydratedPostsStore } from "@/features/posts/data/new/posts-store";
import { buildPersonalPosts } from "@/features/posts/selectors/build-personal-posts";
import { PostDisplay } from "@/features/posts/components/post-display";
import { profileTabs } from "@/features/posts/selectors/profile-tabs";
import { poppins } from "@/app/font-icons/fonts";
import AddPost from "@/features/posts/components/add-post";
import SearchBar from "@/features/search/components/search-bar";
import Compares from "@/features/compare/components/top-compare-cards";

import { ComparisonStoredType } from "@/features/compare/types/comparison-main-type";
import { getStoredComparisons } from "@/features/compare/services/comparison-storage";
import { handleSearch } from "@/features/compare/utils/history-search-handler";
import {
  getProfileFollowCounts,
  getProfileJoinedLabel,
  getProfileUserById,
  getProfileUserByUsername,
} from "@/features/users/selectors/profile-meta";

const MAIN_PROFILE_USERNAME = "alwell";

export default function FullProfile() {
  const user = getProfileUserByUsername(MAIN_PROFILE_USERNAME);
  return <Profile userId={user?.id || ""} />;
}

export function Profile({ userId }: { userId?: string }) {
  type PostTabType = (typeof profileTabs)[number]["key"];

  const [postTab, setPostTab] = useState<PostTabType>("posts");
  const profileTabContent: Record<PostTabType, React.ReactNode> = {
    posts: <PersonalPosts id={userId ?? ""} />,
    history: <History />,
  };

  const user = getProfileUserById(userId);
  const followCounts = getProfileFollowCounts(userId);
  const formattedDate = getProfileJoinedLabel(user?.dateJoined ?? null);
  const followList = [
    { label: "followers", number: followCounts.followerCount },
    { label: "following", number: followCounts.followingCount },
  ];

  const { theme } = useTheme();
  const [mounted, setMounted] = useState<boolean>();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="px-4 flex flex-col gap-4">
      <div className="flex flex-col gap-4 px-3 py-3 mt-4 ">
        <div className="flex gap-4 items-center justify-start min-h-25">
          <div className="relative h-18 w-18 flex">
            <div className="relative h-full w-full overflow-hidden rounded-full ring-2 ring-black/10 dark:ring-white/10">
              <Image
                src={user?.avatarUrl ?? "/images/default-avatar.png"}
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
              src={
                theme === "dark"
                  ? "/images/history-light-fill.png"
                  : "/images/history-dark-fill.png"
              }
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
          {profileTabs.map((tab) => (
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

export function PersonalPosts({ id }: { id: string }) {
  const postsStore = useMemo(() => buildHydratedPostsStore(), []);
  const personalPosts = buildPersonalPosts({ postsStore, userId: id });

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

export const History = () => {
  const currentHistory = getStoredComparisons();

  const [isSearch, setIsSearch] = useState(false);
  const [results, setResults] = useState<ComparisonStoredType>(
    () => currentHistory,
  );

  function handleHistorySearch(query: string) {
    const searchedResults = handleSearch(query);

    if (!query.trim()) {
      setResults(currentHistory);
      return;
    }
    setResults(searchedResults);
  }

  if (Array.from(Object.values(currentHistory)).length === 0) {
    return (
      <div className="flex flex-col gap-3 items-center justify-center mt-10">
        <p>No comparison history available.</p>
      </div>
    );
  }

  return (
    <main className="w-full pt-2 text-light-text-primary dark:text-dark-text-primary flex flex-col gap-5">
      <SearchBar
        setIsSearch={setIsSearch}
        // isSearch={isSearch}
        onSearch={handleHistorySearch}
      />

      <div className="flex flex-col gap-3">
        <Compares compareList={results} categoryType="history" />
      </div>
    </main>
  );
};
