import Image from "next/image";

import { useEffect, useState } from "react";

import { oswald, poppins } from "../fonts";

import { PlayerType } from "../types/players";

import VotesBar from "./comparison-votes-bar";
import Link from "next/link";

// function RandomId() {
//   const [id, setId] = useState<number | null>(null);

//   useEffect(() => {
//     setId(Math.random());
//   }, [])

//   if (id === null) return null
//   return <span>{id}</span>;
// }

// export type ComparableLegend = {
//   id: string;
//   image: string;
//   name: string;
//   age: number;
//   height: number;
//   nationality: string;
//   rating: number;
//   positionPlayed: string;
// };

// T must have those fields defined in ComparableLegend

// LegendsData is an array of pairs of legends to compare and its relation with T is that each legend in the pair is of type T into multiple arrays
type ComparisonProps<T extends PlayerType> = {
  playersData: T[][];
  title?: string;
};

const Comparison = <T extends PlayerType>({
  playersData,
  title,
}: ComparisonProps<T>) => {
  
  const renderLegend = (legend: T) => (
    <div key={legend.id} className="flex flex-row">
      <div className="p-2 flex flex-col w-32 items-center gap-2">
        <div className="relative h-18 w-18 flex">
          <div className="relative h-full w-full overflow-hidden rounded-full ring-2 ring-white/10">
            <Image
              src={legend.image}
              alt={legend.name}
              fill
              sizes="68px"
              className="object-cover"
            />
          </div>

          {/* rating badge */}
          {/* <div className={`absolute -bottom-1 -right-1 z-10 h-7 w-7 rounded-full bg-emerald-600 text-white text-xs font-sans font-semibold tabular-nums shadow-md ring-2 ring-black/30 flex items-center justify-center ${poppins.className}`}>
            {legend.rating}
          </div> */}
        </div>

        <p className={`w-full text-center text-xs font-semibold ${poppins.className} text-white leading-tight truncate`}>
          {legend.name}
        </p>

        {/* <div className="flex flex-row flex-wrap justify-center gap-1 w-full">
          <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-sans text-white/75 tabular-nums">
            {legend.age}y
          </span>
          <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-sans text-white/75 uppercase tracking-wide">
            {legend.positionPlayed.slice(0, 3)}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-sans text-white/75 uppercase tracking-wide">
            {legend.nationality.slice(0, 3)}
          </span>
        </div> */}
      </div>
    </div>
  );

  // const getPreferenceForPair = (pair: T[]) => {
  //   const left = pair[0];
  //   const right = pair[1];

  //   if (!left || !right) {
  //     return {
  //       left,
  //       right,
  //       leftPct: 50,
  //       rightPct: 50,
  //     };
  //   }

  //   const total = Math.max(1, left.rating + right.rating);
  //   const leftPct = Math.max(
  //     0,
  //     Math.min(100, Math.round((left.rating / total) * 100)),
  //   );
  //   const rightPct = 100 - leftPct;

  //   return { left, right, leftPct, rightPct };
  // };

  return (
    <div className="px-5 py-2 flex flex-col gap-3">
      <div className="text-white/80 flex items-center gap-2">
        <p className={`font-heading text-lg tracking-wide text-white ${oswald.className}`}>{title}</p>
      </div>
      <div className="flex flex-row gap-3 overflow-x-auto pb-4 flex-nowrap">
        {playersData.map((playerPair, index) => {
          // const pref = getPreferenceForPair(playerPair);
          const left = playerPair[0];
          const right = playerPair[1];

          return (
            <div
              key={index}
              className="flex flex-col gap-5 p-3 rounded-xl border border-white/10 bg-white/5 shadow-sm backdrop-blur"
            >
              <div className="relative flex flex-row items-start justify-between gap-6 px-1">
                <div className="flex-1 flex justify-center">
                  {left && renderLegend(left)}
                </div>

                {/* VS badge centered between the two avatars */}
                {left && right && (
                  <div className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 z-10">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-white/10 border border-white/20 shadow-md backdrop-blur flex items-center justify-center ring-1 ring-emerald-400/20">
                        <span className={`text-xs ${poppins.className} tracking-widest text-white/90`}>
                          VS
                        </span>
                      </div>
                      <div className="pointer-events-none absolute -inset-2 rounded-full bg-emerald-500/15 blur-md" />
                    </div>
                  </div>
                )}

                <div className="flex-1 flex justify-center">
                  {right && renderLegend(right)}
                </div>
              </div>

              <div className="flex justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white w-full rounded-xl p-2">
                <Link href={{pathname: "/view-comparison", query: {leftPlayerId: left.id, rightPlayerId: right.id},}}><span className={`text-md ${poppins.className} font-semibold tracking-wide `}>Compare</span></Link>
              </div>

              <div className="flex flex-row justify-end items-center">
                <p className={`${poppins.className} text-sm font-medium text-white/50 font-italic`}>20.8K votes</p>
              </div>

              {/* <VotesBar playerPair={playerPair} /> */}

              {/* <div className="w-full flex flex-col gap-1">
                <div className={`mt-1 flex justify-between items-center text-xxs text-white/70 ${poppins.className}`}>
                  <span className={`max-w-[45%] truncate text-xs ${poppins.className}`}>
                    {pref.left?.name.split(" ")[0][0] +
                      ". " +
                      pref.left?.name.split(" ")[1]}{" "}
                    {pref.leftPct}%
                  </span>
                  <span className={`max-w-[45%] truncate text-right text-xs ${poppins.className}`}>
                    {pref.rightPct}%{" "}
                    {pref.right?.name.split(" ")[0][0] +
                      ". " +
                      pref.right?.name.split(" ")[1]}
                  </span>
                </div>

                <div className="relative w-full h-2 rounded-lg bg-white/10 overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${pref.leftPct}%` }}
                    aria-label="Left player preference"
                  />
                  <div
                    className="absolute inset-y-0 right-0 bg-white/90"
                    style={{ width: `${pref.rightPct}%` }}
                    aria-label="Right player preference"
                  />
                </div>

                <span className="right-0 text-xs font-sans text-white/20">
                  *Based on user's votes
                </span>
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comparison;
