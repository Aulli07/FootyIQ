import Link from "next/link";

/* Import the header component used at the top of the home page */
import Header from "../../shared/components/header";

/* Import the row section for comparisons used in the home page predominantly */
import Comparison from "@/features/compare/components/comparison-row";
import { SYSTEM_COMPARISON_THEMES } from "@/features/compare/types/comparison-themes";
import { ComparisonThemeType } from "@/features/compare/types/comparison-theme-type";
import TopWeeklyComparisons from "@/features/compare/components/top-weekly-comparisons";
import { getThemeMatchups } from "@/features/compare/selectors/get-theme-matchups";

import PopularPlayers from "@/features/players/components/popular-players";
import HomePageClient from "@/features/home/components/home-page-client";



/* This is the default home screen */
export default function Home() {
  return (
    <main className="w-full mt-3 px-4 text-light-text-primary dark:text-dark-text-primary">
      <Header headerText="FOOTY IQ" showLightMode />

      <HomePageClient>
        <div className="mt-2">
          {SYSTEM_COMPARISON_THEMES.map((theme) => (
            <ThemeComparisonSection key={theme.id} theme={theme} />
          ))}
          <TopWeeklyComparisons />
          <PopularPlayers />
        </div>
      </HomePageClient>
    </main>
  );
}

function ThemeComparisonSection({ theme }: { theme: ComparisonThemeType }) {
  const matchups = getThemeMatchups(theme.id);
  if (!matchups || matchups.length === 0) return null;

  return (
    <div>
      <Comparison comparisonIds={matchups} title={theme.title} />
    </div>
  );
}


// href={{ pathname: `/themes/${theme.id}` }}