import Link from "next/link";

/* Import the header component used at the top of the home page */
import Header from "../shared/components/header";

/* Import the row section for comparisons used in the home page predominantly */
import Comparison from "@/features/compare/components/comparison-row";
import { SYSTEM_COMPARISON_THEMES } from "@/features/compare/types/comparison-themes";
import { ComparisonThemeType } from "@/features/compare/types/comparison-theme-type";
import themeIndexedComparisons from "@/features/compare/data/theme-indexed-comparisons.json";
import TopWeeklyComparisons from "@/features/compare/components/top-weekly-comparisons";

import PopularPlayers from "@/features/players/components/popular-players";
import HomePageClient from "@/features/home/components/home-page-client";

const themedComparisons = themeIndexedComparisons as Record<string, string[]>;



/* This is the default home screen */
export default function Home() {
  return (
    <main className="w-full pt-2 text-light-text-primary dark:text-dark-text-primary">
      <Header headerText="FOOTY IQ" showLightMode />

      <HomePageClient>
        <div className="mt-3">
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
    <Link href={{ pathname: `/${theme.id}` }}>
      <Comparison
        comparisonIds={matchups}
        title={theme.title}
      />
    </Link>
  );
}

export function getThemeMatchups(themeId: string): string[] {
  return themedComparisons[themeId] ?? [];
}
