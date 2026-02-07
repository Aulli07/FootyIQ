"use client";

import React from "react";
import Image from "next/image";

import Header from "./components/header";
import Comparison from "./components/comparison-card";
import Compares from "./components/compares";
import TitleSection from "./components/section-title";
import SearchBar from "./components/search-bar";

import { useState } from "react";

import { players } from "./data/players";
import { PlayerType } from "./types/players";
import { playerStats } from "./data/playerStats";

import { getTotalComparisons } from "./utils/playerFilters";
import { computeLegends } from "./utils/playerFilters";
import { computeHotProspects } from "./utils/playerFilters";

import { filterSearchedPlayers } from "./utils/playerFilters";
import { poppins } from "./fonts";

export const totalComparedPlayers = getTotalComparisons(players);

// This assigns the total compared players of the whole system to the variable
// const totalComparedPlayers = getTotalComparisons(players);

// Making the prop type for the React setState element

// type inputBarProps = {
//   setInputText: React.Dispatch<React.SetStateAction<string>>;
// };

// This is the search bar component that displays the actual bar right at the top
// function SearchBar({
//   setIsSearch,
//   isSearch,
// }: {
//   setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
//   isSearch: boolean;
// }) {
//   const [inputText, setInputText] = useState<string>("");

//   // This filters the searched player's comparisons from the total
//   const foundPlayers = filterSearchedPlayers(inputText);

//   return (
//     <div className="px-5 flex flex-col gap-3 overflow-hidden">
//       <div className="relative">
//         <div className="absolute left-4 top-1/2 -translate-y-1/2 z-[9999]">
//           <div className="relative h-6 w-6">
//             <Image
//               src="/images/search.png"
//               fill
//               sizes="32px"
//               alt="search"
//               className="object-cover"
//             />
//           </div>
//         </div>

//         {/* The input search section */}
//         <InputBar
//           setInputText={setInputText}
//           setIsSearch={setIsSearch}
//           isSearch={isSearch}
//         />
//       </div>

//       {/* This works to   check if input is empty, if it is not, it displays teh found players*/}
//       {inputText.trim() !== "" ? (
//         <div className="flex-1 min-h-0">
//           <DisplayFoundPlayers
//             foundPlayers={foundPlayers}
//             emptySearch={`No matches for "${inputText}"`}
//           />
//         </div>
//       ) : (
//         <div className="flex-1 min-h-0" />
//       )}
//     </div>
//   );
// }

// function DisplayFoundPlayers({
//   // Assigning each element to its individual type,
//   // foundPlayers is an array of player objects while emptySearch is simply a string
//   foundPlayers,
//   emptySearch,
// }: {
//   foundPlayers: Array<PlayerType>;
//   emptySearch: string;
// }) {
//   // Stores the individual player's comparisons in the system
//   const foundPlayerComparisons: Array<Array<PlayerType>> = [];

//   // Block of code to make player comparisons
//   foundPlayers.forEach((player) => {
//     totalComparedPlayers.forEach((compares) => {
//       let left = compares[0];
//       let right = compares[1];

//       if (player.id == left.id || player.id == right.id) {
//         foundPlayerComparisons.push(compares);
//       }
//     });
//   });

//   // The display of found player's comparisons
//   return (
//     <div className="w-full h-full rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col">
//       <div className="px-4 py-3 border-b border-white/10">
//         <p className="text-xs tracking-wide text-white/60">
//           {foundPlayers.length === 0 ? "No results" : "Matches"}
//         </p>
//       </div>

//       {foundPlayers.length === 0 ? (
//         <div className="px-4 py-4">
//           <p className="text-sm text-white/80">{emptySearch}</p>
//         </div>
//       ) : (
//         <div className="flex-1 min-h-0 overflow-auto">
//           <Compares compareList={foundPlayerComparisons} />
//         </div>
//       )}
//     </div>
//   );
// }

// // The component for inputting text in the search bar
// function InputBar({
//   setInputText,
//   setIsSearch,
//   isSearch,
// }: {
//   setInputText: React.Dispatch<React.SetStateAction<string>>;
//   setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
//   isSearch: boolean;
// }) {
//   return (
//     <input
//       type="text"
//       placeholder="Search for players or clubs"
//       className={`w-full h-14 rounded-2xl bg-white/5 text-white placeholder:text-white/40 border border-white/30 pl-12 pr-4 text-[15px] ${poppins.className} shadow-lg backdrop-blur outline-none transition focus:border-emerald-400/40 focus:ring-4 focus:ring-emerald-400/15`}
//       onChange={(e) => {
//         setInputText(e.target.value);
//         !isSearch ? setIsSearch(true) : setIsSearch(false);
//       }}
//     />
//   );
// }

function LegendsSection() {
  const legendsList = computeLegends(playerStats);
  const legendsComparisons = getTotalComparisons(legendsList);

  return <Comparison playersData={legendsComparisons} title="Legends" />;
}

function HotProspectsSection() {
  const hotProspectsList = computeHotProspects(playerStats);
  const hotProspectsComparisons = getTotalComparisons(hotProspectsList);

  return (
    <Comparison playersData={hotProspectsComparisons} title="Hot Prospects" />
  );
}

function TopComparisonList() {
  const allComparisons = getTotalComparisons(players);
  const topSearchComparisons: Array<Array<PlayerType>> = [];

  for (let i = 0; i < 5; i++) {
    let randomNum = Math.floor(Math.random() * allComparisons.length);
    topSearchComparisons.push(allComparisons[randomNum]);
  }

  return (
    <div className="px-3 gap-3 flex flex-col">
      <TitleSection title="Legends" />
      <Compares compareList={topSearchComparisons} />
    </div>
  );
}

function HomePage() {
  const [isSearch, setIsSearch] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <SearchBar setIsSearch={setIsSearch} isSearch={isSearch} comparedPlayers={totalComparedPlayers}/>
      {!isSearch && <LegendsSection />}
      {!isSearch && <HotProspectsSection />}
      {!isSearch && <HotProspectsSection />}
      {!isSearch && <TopComparisonList />}
    </div>
  );
}

export default function Home() {
  return (
    <main className="w-full px-3 pt-2 text-white">
      <Header headerText="FOOTY IQ" showLightMode showHistory/>
      <HomePage />
    </main>
  );
}
