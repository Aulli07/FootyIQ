"use client";

import React from "react";
import Image from "next/image";


import Comparison from "./components/comparison-card";
// import { comparisonList } from "./components/app-shell";
import Compares from "./components/compares";
import TitleSection from "./components/section-title";
import SearchBar from "./home/page";


import { players } from "./data/players";
import { PlayerType } from "./types/players";
import { playerStats } from "./data/playerStats";

import { getTotalComparisons } from "./utils/playerFilters";
import { computeLegends } from "./utils/playerFilters";
import { computeHotProspects } from "./utils/playerFilters";





function LegendsSection() {
  const legendsList = computeLegends(playerStats);
  const legendsComparisons = getTotalComparisons(legendsList);

  return (
    <Comparison playersData={legendsComparisons} title="Legends" />
  )
}

function HotProspectsSection() {
  const hotProspectsList = computeHotProspects(playerStats);
  const hotProspectsComparisons = getTotalComparisons(hotProspectsList);

  return (
    <Comparison playersData={hotProspectsComparisons} title="Hot Prospects" />
  )
}


function TopComparisonList() {
  const allComparisons = getTotalComparisons(players)
  const topSearchComparisons: Array<Array<PlayerType>> = [];

  for (let i = 0; i < 5; i++) {
    let randomNum = Math.floor(Math.random() * allComparisons.length);
    topSearchComparisons.push(allComparisons[randomNum]);
  }

  return (
    <div className="px-5 gap-3 flex flex-col">
      <TitleSection title="Legends" />
      <Compares compareList={topSearchComparisons} />
    </div>
  );
}

function HomePage() {
  return (
    <div className="flex flex-col gap-3">
      <SearchBar  />
      <LegendsSection />
      <HotProspectsSection />
      <HotProspectsSection />
      <TopComparisonList />
    </div>
  );
}

export default function Home() {
  return (
    <main className="w-full pl-2 pt-2 pb-20 text-white">
      <HomePage />
    </main>
  );
}
