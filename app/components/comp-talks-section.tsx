import { PlayerType } from "../types/players";
import { Posts } from "../data/posts";
import TitleSection from "./page-title-section";
import { PostDisplay } from "../talks/page";
import { poppins } from "../fonts";
import Link from "next/link";
import { getPostsInDiscussion } from "../utils/playerFilters";
import { PostType } from "../types/posts";

export default function ComparisonTalksSection({
  leftPlayer,
  rightPlayer,
}: {
  leftPlayer: PlayerType | null;
  rightPlayer: PlayerType | null;
}) {

  const postsInDiscussion = getPostsInDiscussion(leftPlayer, rightPlayer);

  return (
    <div className="flex flex-col gap-3 h-full w-full mt-5">
      <TitleSection title="Talks" />
      <div className="flex flex-col gap-4 px-4 mt-1">
        {postsInDiscussion.slice(0, 3).map((post: PostType) => (
          <PostDisplay key={post.id} post={post} />
        ))}
      </div>
      <Link href={{pathname: "/view-more-talks", query: {leftPlayerId: leftPlayer?.id, rightPlayerId: rightPlayer?.id},}} className="flex justify-end items-center px-4">
        <span className={`${poppins.className} text-sm font-semibold border-b mt-2 text-white/70`}>View More Talks</span>
      </Link>
    </div>
  );
}
