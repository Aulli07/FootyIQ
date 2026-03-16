"use client";

import Link from "next/link";

import Header from "../components/header";
import Comparison from "../components/comparison-row";
import Compares from "../components/top-compare-cards";
import HomeTitleSection from "../components/section-title";

import { useEffect, useState } from "react";

import { players } from "./data/players";
import { PlayerType } from "./types/players";

import SearchedComparisonResults from "@/components/search-comparison-results";
import SearchInput from "../components/search-bar";

import { getTotalComparisons, getSearchedPlayers, foundComparisons } from "./utils/playerFilters";

import {
  ComparisonResult,
  generatePlayersMatchup,
  getComparisons,
} from "./engine/comparison-generator";
import { getPlayersSubset } from "./engine/subset-selector";
import { SYSTEM_COMPARISON_THEMES } from "./data/comparison-themes";

export const totalComparedPlayers = getTotalComparisons(players);
// Render the first three system themes as sections on the home page




function getPlayerPairFromComparison(
  comparison: ComparisonResult,
): [PlayerType, PlayerType, string, string] | null {
  const leftPlayer = players.find(
    (player) => player.id === comparison.data.playerA.id,
  );

  const leftPlayerSeason = ["season", "competition"].includes(comparison.data.playerA.comparisonMode.kind)
    ? comparison.data.playerA.comparisonMode.bestSeasonDate
    : null;

  const leftPlayerCompetition = ["season", "competition"].includes(comparison.data.playerA.comparisonMode.kind)
    ? comparison.data.playerA.comparisonMode.bestCompetitionId
    : null;

  const leftPlayerSeasonOrCompetition = leftPlayerSeason + " " + leftPlayerCompetition;


  const rightPlayer = players.find(
    (player) => player.id === comparison.data.playerB.id,
  );

  const rightPlayerSeason = ["season", "competition"].includes(comparison.data.playerB.comparisonMode.kind)
    ? comparison.data.playerB.comparisonMode.bestSeasonDate
    : null;

  const rightPlayerCompetition = ["season", "competition"].includes(comparison.data.playerB.comparisonMode.kind)
    ? comparison.data.playerB.comparisonMode.bestCompetitionId
    : null;

  const rightPlayerSeasonOrCompetition = rightPlayerSeason + " " + rightPlayerCompetition;

  if (!leftPlayer || !rightPlayer) {
    return null;
  }

  // return [leftPlayer, rightPlayer, leftPlayerSeason || leftPlayerCompetition || "career", rightPlayerSeason || rightPlayerCompetition || "career"];
  return [ leftPlayer, rightPlayer, leftPlayerSeasonOrCompetition, rightPlayerSeasonOrCompetition]
}

function getThemeMatchups(
  comparisonGroups: ComparisonResult[][],
  themeId: string,
): Array<[PlayerType, PlayerType, string, string]> {
  return comparisonGroups
    .flat()
    .filter(
      (comparison) =>
        comparison.theme !== "general" && comparison.theme.id === themeId,
    )
    .map(getPlayerPairFromComparison)
    .filter(
      (playerPair): playerPair is [PlayerType, PlayerType, string, string] =>
        playerPair !== null,
    );
}




function ThemeSection({
  comparisons,
  theme,
}: {
  comparisons: ComparisonResult[][];
  theme: any;
}) {
  const matchups = getThemeMatchups(comparisons, theme.id);

  if (!matchups || matchups.length === 0) return null;

  return (
    <Link
      href={{
        pathname: `/${theme.id}`,
        query: { fieldType: theme.id, title: theme.title },
      }}
    >
      <Comparison playersData={matchups} title={theme.title} categoryType={theme.id} />
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

  const [comparisons, setComparisons] = useState<ComparisonResult[][]>([]);

  function handleSearch(query: string) {
    const compared = getSearchedPlayers(players, query);
    const fetchedComparisons = foundComparisons(totalComparedPlayers, compared);

    setResults(fetchedComparisons);
  }

  useEffect(() => {
    const systemComparisons = sessionStorage.getItem("comparisons");

    if (systemComparisons) {
      setComparisons(JSON.parse(systemComparisons));
      return;
    }

    const allComparisons: ComparisonResult[][] = [];

    for (let i = 0; i < (SYSTEM_COMPARISON_THEMES.length); i++) {
      const currentTheme = SYSTEM_COMPARISON_THEMES[i];
      const playerSubset = getPlayersSubset(players, currentTheme);
      const matchups = generatePlayersMatchup(playerSubset, currentTheme.matchupType as any);
      const PLAYER_COMPARISONS = getComparisons(matchups, currentTheme);
      allComparisons.push(PLAYER_COMPARISONS);
    }

    setComparisons(allComparisons);
    sessionStorage.setItem("comparisons", JSON.stringify(allComparisons));
  }, []);

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

      {!isSearch &&
        SYSTEM_COMPARISON_THEMES.map((theme) => (
          <ThemeSection key={theme.id} theme={theme} comparisons={comparisons} />
        ))}

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
