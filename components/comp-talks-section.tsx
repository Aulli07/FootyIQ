import { PlayerType } from "../app/types/players";
import { Posts } from "../app/data/posts";
import TitleSection from "./page-section-title";
import { PostDisplay } from "./post-display";
import { poppins } from "../app/fonts";
import Link from "next/link";
import { getPostsInDiscussion } from "../app/utils/playerFilters";
import { PostType } from "../app/types/posts";

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
      <Link
        href={{
          pathname: "/view-more-talks",
          query: {
            leftPlayerId: leftPlayer?.id,
            rightPlayerId: rightPlayer?.id,
          },
        }}
        className="flex justify-end items-center px-4"
      >
        <span
          className={`${poppins.className} text-sm font-semibold border-b mt-2 text-white/70`}
        >
          View More Talks
        </span>
      </Link>
    </div>
  );
}
