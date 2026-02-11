import Image from "next/image";

import { useEffect, useState } from "react";

import { oswald, poppins } from "../fonts";

import { PlayerType } from "../types/players";

import VotesBar from "./comparison-votes-bar";
import Link from "next/link";
import ComparisonCard from "./comparison-card";

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
  
  // const renderLegend = (legend: T) => (
  //   <div key={legend.id} className="flex flex-row">
  //     <div className="p-2 flex flex-col w-32 items-center gap-2">
  //       <div className="relative h-18 w-18 flex">
  //         <div className="relative h-full w-full overflow-hidden rounded-full ring-2 ring-white/10">
  //           <Image
  //             src={legend.image}
  //             alt={legend.name}
  //             fill
  //             sizes="68px"
  //             className="object-cover"
  //           />
  //         </div>
  //       </div>
  //       <p className={`w-full text-center text-xs font-semibold ${poppins.className} text-white leading-tight truncate`}>
  //         {legend.name}
  //       </p>
  //     </div>
  //   </div>
  // );

  return (
    <div className="px-5 py-2 flex flex-col gap-3">
      <div className="text-white/80 flex items-center gap-2">
        <p className={`font-heading text-lg tracking-wide text-white ${oswald.className}`}>{title}</p>
      </div>
      <div className="flex flex-row gap-3 overflow-x-auto pb-4 flex-nowrap">
        {playersData.map((playerPair) => {
          const leftPlayer = playerPair[0];
          const rightPlayer = playerPair[1];

          return (
            <ComparisonCard leftPlayer={leftPlayer} rightPlayer={rightPlayer} />
            // <div
            //   key={index}
            //   className="flex flex-col gap-5 p-3 rounded-xl border border-white/10 bg-white/5 shadow-sm backdrop-blur"
            // >
            //   <div className="relative flex flex-row items-start justify-between gap-6 px-1">
            //     <div className="flex-1 flex justify-center">
            //       {left && renderLegend(left)}
            //     </div>

            //     {/* VS badge centered between the two avatars */}
            //     {left && right && (
            //       <div className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 z-10">
            //         <div className="relative">
            //           <div className="h-10 w-10 rounded-full bg-white/10 border border-white/20 shadow-md backdrop-blur flex items-center justify-center ring-1 ring-emerald-400/20">
            //             <span className={`text-xs ${poppins.className} tracking-widest text-white/90`}>
            //               VS
            //             </span>
            //           </div>
            //           <div className="pointer-events-none absolute -inset-2 rounded-full bg-emerald-500/15 blur-md" />
            //         </div>
            //       </div>
            //     )}

            //     <div className="flex-1 flex justify-center">
            //       {right && renderLegend(right)}
            //     </div>
            //   </div>

            //   <div className="flex justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white w-full rounded-xl p-2">
            //     <Link href={{pathname: "/view-comparison", query: {leftPlayerId: left.id, rightPlayerId: right.id},}}><span className={`text-md ${poppins.className} font-semibold tracking-wide `}>Compare</span></Link>
            //   </div>

            //   <div className="flex flex-row justify-end items-center">
            //     <p className={`${poppins.className} text-sm font-medium text-white/50 font-italic`}>20.8K votes</p>
            //   </div>
            // </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comparison;
