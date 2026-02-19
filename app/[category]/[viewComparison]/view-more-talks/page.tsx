"use client";

import { players } from "../../../data/players";
import { getPostsInDiscussion } from "../../../utils/playerFilters";
import PageTitle from "@/components/page-title";
import { PostType } from "../../../types/posts";
import { PostDisplay } from "@/components/post-display";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ViewMorePage() {
  const searchParams = useSearchParams();
  const leftPlayerId = searchParams.get("leftPlayerId");
  const rightPlayerId = searchParams.get("rightPlayerId");

  const leftPlayer = players.find((player) => player.id === leftPlayerId);
  const rightPlayer = players.find((player) => player.id === rightPlayerId);

  const postsInDiscussion = getPostsInDiscussion(leftPlayer, rightPlayer);

  return (
    
    <div className="px-3 pt-5 pb-5 flex flex-col gap-5">
      <PageTitle
        title={`TALKS ON ${leftPlayer?.id.toUpperCase()} AND ${rightPlayer?.id.toUpperCase()}`}
      />
      <div className="flex flex-col gap-4 px-4 mt-1">
        {postsInDiscussion.map((post: PostType) => (
          <Link href={`/talks/${post.id}`} key={post.id}>
            <PostDisplay key={post.id} post={post} />
          </Link> 
        ))}
      </div>
    </div>
  );
}
