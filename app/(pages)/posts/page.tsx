"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import { poppins } from "@/app/font-icons/fonts";
import { postTabs } from "@/features/posts/selectors/post-tabs";
import { buildForYouPosts } from "@/features/posts/selectors/build-for-you-posts";
import { buildPersonalPosts } from "@/features/posts/selectors/build-personal-posts";
import { buildPublicPosts } from "@/features/posts/selectors/build-public-posts";

import { PostMappedType } from "@/features/posts/types/post";
import { PostTabType } from "@/features/posts/types/post-tabs";

import AddPost from "@/features/posts/components/add-post";
import Header from "@/shared/components/header";
import { PostDisplay } from "@/features/posts/components/post-display";

import { buildHydratedPostsStore } from "@/features/posts/data/new/posts-store";

const MAIN_USER_ID = "u-1";

function PostsPage() {
  const [postTab, setPostTab] = useState<PostTabType["key"]>("for_you");
  const postsStore = useMemo(() => buildHydratedPostsStore(), []);

  const postTabContent: Record<string, React.ReactNode> = {
    for_you: <ForYouPosts postsStore={postsStore} />,
    following: <PublicPosts userId={MAIN_USER_ID} postsStore={postsStore} />,
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
}

function ForYouPosts({ postsStore }: { postsStore: PostMappedType }) {
  const shuffledForYouPosts = buildForYouPosts({
    postsStore,
    userId: MAIN_USER_ID,
  });

  return (
    <div className="display flex flex-col gap-5">
      {shuffledForYouPosts.map((post) => (
        <Link href={{ pathname: `/posts/${post.id}` }} key={post.id}>
          <PostDisplay post={post} />
        </Link>
      ))}
    </div>
  );
}

function PublicPosts({
  userId,
  postsStore,
}: {
  userId: string;
  postsStore: PostMappedType;
}) {
  const followingPosts = buildPublicPosts({ postsStore, userId });

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

export default PostsPage;
