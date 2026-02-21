"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { players } from "@/app/data/players";
import { getPostsInDiscussion } from "@/app/utils/playerFilters";
import { TalkType } from "@/app/types/talks";

import PageTitle from "./page-title";
import { PostDisplay } from "./post-display";

export default function ViewMoreTalksContent() {
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
        {postsInDiscussion.map((talk: TalkType) => (
          <Link href={{ pathname: `/talks/${talk.id}`}}
          key={talk.id}
        >
          <PostDisplay talk={talk} />
        </Link>
        ))}
      </div>
    </div>
  );
}
