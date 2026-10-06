"use client";

import { create } from "zustand";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { poppins } from "@/app/font-icons/fonts";
import { postTabs } from "@/features/posts/selectors/post-tabs";
import { buildForYouPosts } from "@/features/posts/selectors/build-for-you-posts";
import { buildPublicPosts } from "@/features/posts/selectors/build-public-posts";

import { PostMappedType, PostType } from "@/features/posts/types/post";
import { PostTabType } from "@/features/posts/types/post-tabs";

import AddPost from "@/features/posts/components/add-post";
import Header from "@/shared/components/header";
import { PostDisplay } from "@/features/posts/components/post-display";

import { buildHydratedPostsStore } from "@/features/posts/data/new/posts-store";

const MAIN_USER_ID = "u-1";



type PostState = {
  posts: PostMappedType;
  followingPosts: PostType[];
  forYouPosts: PostType[];
  hasLoaded: boolean;
  loadPosts: () => Promise<void>;
}

const usePostStore = create<PostState>((set, get) => ({
  posts: {},
  forYouPosts: [],
  followingPosts: [],
  hasLoaded: false,
  loadPosts: async () => {
    if (get().hasLoaded) return;

    const posts = buildHydratedPostsStore();
    const forYouPosts = buildForYouPosts({
      postsStore: posts,
      userId: MAIN_USER_ID,
    });
    const followingPosts = buildPublicPosts({
      postsStore: posts,
      userId: MAIN_USER_ID,
    });

    set({ posts, forYouPosts, followingPosts, hasLoaded: true });
  }
}))
 
function PostsPage() {
  const [postTab, setPostTab] = useState<PostTabType["key"]>("for_you");

  const forYouPosts = usePostStore((s) => s.forYouPosts);
  const followingPosts = usePostStore((s) => s.followingPosts);
  const hasLoaded = usePostStore((s) => s.hasLoaded);
  const loadPosts = usePostStore((s) => s.loadPosts);

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  if (!hasLoaded) return null;

  const postTabContent: Record<string, React.ReactNode> = {
    for_you: <ForYouPosts posts={forYouPosts} />,
    following: <PublicPosts posts={followingPosts} />,
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

function ForYouPosts({ posts }: { posts: PostType[] }) {
  return (
    <div className="display flex flex-col gap-5">
      {posts.map((post) => (
        <PostDisplay key={post.id} post={post} />
      ))}
    </div>
  );
}

function PublicPosts({ posts }: { posts: PostType[] }) {
  return (
    <div className="display flex flex-col gap-4">
      {posts.map((post) => (
        <PostDisplay key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostsPage;




// setSelectedPlayers: (nextPlayers) =>
//     set((state) => ({
//       selectedPlayers:
//         typeof nextPlayers === "function"
//           ? nextPlayers(state.selectedPlayers)
//           : nextPlayers,
//     })),
//   setSelectedContexts: (nextContexts) =>
//     set((state) => ({
//       selectedContexts:
//         typeof nextContexts === "function"
//           ? nextContexts(state.selectedContexts)
//           : nextContexts,
//     })),
//   confirmedComparisonKey: null,
//   setConfirmedComparisonKey: (nextKey) => 
//     set((state) => ({
//       confirmedComparisonKey:
//         typeof nextKey === "function"
//           ? nextKey(state.confirmedComparisonKey)
//           : nextKey,
//     }))