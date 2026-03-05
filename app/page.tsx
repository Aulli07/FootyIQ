"use client";

import Link from "next/link";

import Header from "../components/header";
import Comparison from "../components/comparison-row";
import Compares from "../components/top-compare-cards";
import HomeTitleSection from "../components/section-title";

import { useState } from "react";

import { players } from "./data/players";
import { PlayerType } from "./types/players";

import SearchedComparisonResults from "@/components/search-comparison-results";
import SearchInput from "../components/search-bar";

import {
  getHotProspects,
  getTotalComparisons,
  getLegends,
  getSearchedPlayers,
  foundComparisons,
} from "./utils/playerFilters";

export const totalComparedPlayers = getTotalComparisons(players);

function LegendsSection() {
  const legends = getLegends();
  const legendType = "legends";
  const legendTitle = "Legends";

  return (
    <Link
      href={{
        pathname: `/${legendType}`,
        query: { fieldType: legendType, title: legendTitle },
      }}
    >
      <Comparison
        playersData={legends}
        title={legendTitle}
        categoryType={legendType}
      />
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
        pathname: `/${hotProspectsType}`,
        query: { fieldType: hotProspectsType, title: hotProspectsTitle },
      }}
    >
      <Comparison
        playersData={hotProspects}
        title={hotProspectsTitle}
        categoryType={hotProspectsType}
      />
    </Link>
  );
}

function TopComparisonList() {
  const allComparisons = getTotalComparisons(players);
  const topSearchComparisons: Array<Array<PlayerType>> = [];

  const topComparisonsType = "topComparisons";
  const topComparisonsTitle = "Top Comparisons";

  for (let i = 0; i < 5; i++) {
    let randomNum = Math.floor(Math.random() * allComparisons.length);
    topSearchComparisons.push(allComparisons[randomNum]);
  }

  return (
    <div className="gap-3 flex flex-col rounded-2xl border border-light-ui-border bg-light-background-card/70 p-3 shadow-md shadow-slate-300/30 dark:border-white/10 dark:bg-white/5 dark:shadow-black/20">
      <HomeTitleSection title="Top Comparisons" />
      <Link href={`/${topComparisonsType}`}>
        <div className="flex flex-col gap-4">
          <Compares
            compareList={topSearchComparisons}
            categoryType={topComparisonsType}
          />
        </div>
      </Link>
    </div>
  );
}

function HomePage() {
  const [isSearch, setIsSearch] = useState(false);
  const [results, setResults] = useState<Array<Array<PlayerType>>>([]);

  function handleSearch(query: string) {
    const compared = getSearchedPlayers(players, query);
    const fetchedComparisons = foundComparisons(totalComparedPlayers, compared);

    setResults(fetchedComparisons);
  }

  return (
    <div className="flex flex-col gap-3 px-6">
      <div className="flex flex-col gap-4">
        <SearchInput
          setIsSearch={setIsSearch}
          isSearch={isSearch}
          onSearch={handleSearch}
        />

        {isSearch && <SearchedComparisonResults data={results} />}
      </div>

      {!isSearch && <LegendsSection />}
      {!isSearch && <HotProspectsSection />}
      {!isSearch && <HotProspectsSection />}
      {!isSearch && <TopComparisonList />}
    </div>
  );
}

export default function Home() {
  return (
    <main className="w-full pt-2 text-light-text-primary dark:text-dark-text-primary">
      <Header headerText="FOOTY IQ" showLightMode />
      <HomePage />
    </main>
  );
}
