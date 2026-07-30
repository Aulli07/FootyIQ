"use client"

import { getPostsInDiscussion } from "@/features/posts/selectors/get-post-discussions-by-ids";

import { useParams } from "next/navigation";

import { PostType } from "@/features/posts/types/post";

import { PostDisplay } from "@/features/posts/components/post-display";
import { getCanonicalPlayerById } from "@/shared/utils/canonical-lookups";
import PageTitle from "@/shared/components/page-title";



export default function ViewMorePage() {

  const params = useParams<{ "player-id": string }>();
  const playerId = params["player-id"];

  console.log(playerId)
  const playerPostDiscussions = getPostsInDiscussion(playerId);
  const player = getCanonicalPlayerById(playerId);

  if (!player) {
    return <p>Player not found</p>
  }

  return (
    <div className="px-3">
      <PageTitle title={player.fullName.toUpperCase()} />

      <div className="flex flex-col gap-4 h-full w-full mt-5 px-3">
        <div className="flex flex-col gap-4">
          {playerPostDiscussions.map((post: PostType) => (
            <PostDisplay key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}