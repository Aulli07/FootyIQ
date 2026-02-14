import { PostType } from "../types/posts";
import { PostDisplay } from "../talks/page";

import { oswald } from "../fonts";

import { getPostsInDiscussion } from "../utils/playerFilters"
import { players } from "../data/players";

import Image from "next/image";

export default function MoreTalks({leftPlayerId, rightPlayerId}: {leftPlayerId: string | null, rightPlayerId: string | null}) {
  const leftPlayer = players.find((player) => player.id === leftPlayerId);
  const rightPlayer = players.find((player) => player.id === rightPlayerId);

  const postsInDiscussion = getPostsInDiscussion(leftPlayer, rightPlayer);
  
  return (
    <div className="px-3 pt-5 pb-5 flex flex-col gap-5">
      <div className="flex justify-start items-center gap-4 text-white border-b border-white/70 pb-6">
        {/* <img
          src="/images/go-back-light.png"
          alt="go back"
          className="h-8 w-8 object-cover cursor-pointer"
        /> */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="cursor-pointer"
        >
          <Image
            src="/images/go-back-light.png"
            alt="go back"
            width={30}
            height={30}
            className="object-cover"
          />
        </button>
        <p className={`text-lg ${oswald.className} font-semibold`}>
          TALKS ON {leftPlayer?.id.toUpperCase()} AND {rightPlayer?.id.toUpperCase()}
        </p>
      </div>
      <div className="flex flex-col gap-4 px-4 mt-1">
        {postsInDiscussion.map((post : PostType) => (
          <PostDisplay key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}