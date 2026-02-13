import { PlayerType } from "../types/players";
import { Posts } from "../data/posts";
import TitleSection from "./pageTitleSection";
import { PostDisplay } from "../talks/page";

export default function ComparisonTalksSection({leftPlayer, rightPlayer} : {leftPlayer: PlayerType | null, rightPlayer: PlayerType | null}) {

  const postsInDiscussion = Posts.filter(post => 
    post.playersInDiscussion.includes(leftPlayer?.name || "") && post.playersInDiscussion.includes(rightPlayer?.name || "") 
  );

  return (
    <div className="flex flex-col gap-3 h-full w-full mt-5">
      <TitleSection title="Talks" />
      <div className="flex flex-col gap-3 px-4 mt-3">
        {postsInDiscussion.map((post) => (
          <PostDisplay key={post.id} post={post} />
        ))}
      </div>
    </div> 
  )
}