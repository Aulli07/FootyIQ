"use client";

import Link from "next/link";

import Header from "./components/header";
import Comparison from "./components/comparison-row";
import Compares from "./components/top-compare-cards";
import HomeTitleSection from "./components/section-title";
import SearchBar from "./components/search-bar";

import { useState } from "react";

import { players } from "./data/players";
import { PlayerType } from "./types/players";

import {
  getHotProspects,
  getTotalComparisons,
  getLegends,
} from "./utils/playerFilters";

export const totalComparedPlayers = getTotalComparisons(players);

function LegendsSection() {
  const legends = getLegends();
  const legendType = "legends";
  const legendTitle = "Legends";

  return (
    <Link
      href={{
        pathname: "/categories",
        query: { fieldType: legendType, title: legendTitle },
      }}
    >
      <Comparison playersData={legends} title={legendTitle} />
    </Link>
  );
}

function HotProspectsSection() {
  const hotProspects = getHotProspects();
  const hotProspectsType = "hotProspects";
  const hotProspectsTitle = "Hot Prospects";

  return (
    <Link
      href={{
        pathname: "/categories",
        query: { fieldType: hotProspectsType, title: hotProspectsTitle },
      }}
    >
      <Comparison playersData={hotProspects} title={hotProspectsTitle} />
    </Link>
  );
}

function TopComparisonList() {
  const allComparisons = getTotalComparisons(players);
  const topSearchComparisons: Array<Array<PlayerType>> = [];

  const topComparisonsType = "topComp";
  const topComparisonsTitle = "Top Comparisons";

  for (let i = 0; i < 5; i++) {
    let randomNum = Math.floor(Math.random() * allComparisons.length);
    topSearchComparisons.push(allComparisons[randomNum]);
  }

  return (
    <div className="px-3 gap-3 flex flex-col">
      <HomeTitleSection title="Top Comparisons" />
      <Link
        href={{
          pathname: "/categories",
          query: { fieldType: topComparisonsType, title: topComparisonsTitle },
        }}
      >
        <Compares compareList={topSearchComparisons} />
      </Link>
    </div>
  );
}

function HomePage() {
  const [isSearch, setIsSearch] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <SearchBar
        setIsSearch={setIsSearch}
        isSearch={isSearch}
        comparedPlayers={totalComparedPlayers}
      />
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
      <Header headerText="FOOTY IQ" showLightMode />
      <HomePage />
    </main>
  );
}
