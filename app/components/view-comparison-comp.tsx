"use client";

import { players } from "../data/players";
import { oswald, poppins } from "../fonts";
import ShowStat from "./show-stat";

import Image from "next/image";

import { PlayerType } from "../types/players";
import ShowFullStat from "./show-stat";
import VotesBar from "./comparison-votes-bar";
import TitleSection from "./pageTitleSection";

import { Posts } from "../data/posts";
import { PostType } from "../types/posts";
import { PostDisplay } from "../talks/page";

import ComparisonVotesSection from "./comp-votes-section";
import ComparisonTalksSection from "./comp-talks-section";

function FixedFieldBox({
  player,
  season,
}: {
  player: PlayerType;
  season: string;
}) {
  return (
    <div
      className={`relative z-0 h-55 flex flex-col justify-center items-center gap-3 rounded-lg px-2 border border-white/30 bg-black/20 ${poppins.className} shadow-lg backdrop-blur`}
    >
      <div className="relative flex flex-col justify-center items-center">
        <div className="relative h-20 w-20 rounded-full overflow-hidden ring-2 ring-emerald-400/30 flex justify-center items-center bg-black/20">
          <Image
            src={player.image}
            alt={player.name}
            sizes="80px"
            fill
            className="object-cover relative"
          />
        </div>
        <p
          className={`flex justify-center items-center ${poppins.className} text-sm text-white/80 mt-3`}
        >
          {player.name}
        </p>
      </div>
      <div
        className={`w-full bg-white/5 border border-white/15 rounded-md px-3 py-2 text-left flex justify-center items-center ${poppins.className} text-sm text-white/90`}
      >
        <span className="truncate pr-2">{season}</span>
      </div>
    </div>
  );
}

// export function ComparisonVotesSection({leftPlayer, rightPlayer} : {leftPlayer: PlayerType | null, rightPlayer: PlayerType | null}) {
//   return (
//     <div className="flex flex-col gap-3 px-4 mt-3 ">
//       <TitleSection title="User Votes" />
//       <VotesBar players={[leftPlayer, rightPlayer]} />
//     </div>
//   )
// }

// export function ComparisonCommentsSection({leftPlayer, rightPlayer} : {leftPlayer: PlayerType | null, rightPlayer: PlayerType | null}) {

//   const postsInDiscussion = Posts.filter(post => 
//     post.playersInDiscussion.includes(leftPlayer?.name || "") && post.playersInDiscussion.includes(rightPlayer?.name || "") 
//   );
//   return (
//     <div className="flex flex-col gap-3 h-full w-full mt-5">
//       <TitleSection title="Comments" />
//       <div className="flex flex-col gap-3 px-4 mt-3">
//         {postsInDiscussion.map((post) => (
//           <PostDisplay key={post.id} post={post} />
//         ))}
//       </div>
//     </div> 
//   )
// }

export default function ViewComparison({
  leftPlayerId,
  rightPlayerId,
}: {
  leftPlayerId: string | null;
  rightPlayerId: string | null;
}) {
  const leftPlayer = players.find((p) => p.id === leftPlayerId);
  const rightPlayer = players.find((p) => p.id === rightPlayerId);

  if (!leftPlayer || !rightPlayer) {
    return <div className="p-4">Player not found</div>;
  }
  
  return (
    <main className="px-3 pt-5 pb-5">
      <div className="flex flex-col gap-5">
        <div className="flex justify-start items-center gap-4 text-white border-b border-white/70 pb-6">
          <img
            src="/images/go-back-light.png"
            alt="go back"
            className="h-8 w-8 object-cover cursor-pointer"
          />
          <p className={`text-lg ${oswald.className} font-semibold`}>
            {leftPlayer.id.toUpperCase()} & {rightPlayer.id.toUpperCase()}{" "}
            COMPARISON
          </p>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          <div className="grid grid-cols-2 gap-3 px-2">
            <FixedFieldBox player={leftPlayer} season="23/24" />
            <FixedFieldBox player={rightPlayer} season="23/24" />
          </div>

          <div className="px-3">
            <ShowFullStat
            players={[leftPlayer, rightPlayer]}
            seasons={["23/24", "23/24"]}
          />
          </div>

          <ComparisonVotesSection leftPlayer={leftPlayer} rightPlayer={rightPlayer} />

          <ComparisonTalksSection leftPlayer={leftPlayer} rightPlayer={rightPlayer} />
          {/* <ShowFullStat
            players={[leftPlayer, rightPlayer]}
            seasons={["23/24", "23/24"]}
          /> */}

          {/* <div className="grid grid-rows-2 px-3 mt-5">
            <div className="flex justify-left items-center">
              <p className={`text-white/80 ${oswald.className} text-md font-medium`}>
                User Votes
              </p>
            </div>
            <VotesBar playerPair={[leftPlayer, rightPlayer]} />
          </div> */}

          {/* <div className="flex flex-col gap-3 mt-3">
            <div className="flex flex-row gap-3 w-full relative overflow-x-auto pb-4">
              {compareStatsField.map((field, index) => (
                <div key={index} className="flex justify-center items-center px-3 py-1 bg-gray-200/30 rounded-3xl border-2 h-10 border-white/70">
                  <span
                    className={`${poppins.className} text-xs font-medium tracking-wide w-full whitespace-nowrap`}
                  >
                    {field}
                  </span>
                </div>
              ))}
            </div>
          </div> */}

          {/* <div className="relative z-0 text-white/70 flex flex-col text-center gap-3 px-3">
            <div className="relative z-0 flex flex-col gap-4 p-2 w-full border border-white/20 rounded-lg bg-white/5 shadow-lg backdrop-blur">
              <ShowStat
                players={[leftPlayer, rightPlayer]}
                seasons={["23/24", "23/24"]}
              />
            </div>
          </div> */}
        </div>
      </div>
    </main>
  )
}
