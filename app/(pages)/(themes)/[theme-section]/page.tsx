"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useTheme } from "next-themes";

import { getThemeMatchups } from "@/app/page";
import { SYSTEM_COMPARISON_THEMES } from "@/features/compare/types/comparison-themes";

import PageTitle from "@/shared/components/page-title";
import ComparisonCard from "@/features/compare/components/comparison-card";
import { ComparisonThemeType } from "@/features/compare/types/comparison-theme-type";

export function ThemedComparisonsSection() {
  const params = useParams<{ "theme-section": string }>();

  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";

  const themeId = params["theme-section"];
  const themedMatchups = getThemeMatchups(themeId);

  const themeTitle =
    SYSTEM_COMPARISON_THEMES.find(
      (comparisonTheme: ComparisonThemeType) => comparisonTheme.id === themeId,
    )?.title ?? null;

  if (!mounted) {
    return;
  }

  return (
    <main className="px-3 pt-5 pb-5">
      <div className="flex flex-col gap-5">
        <PageTitle title={themeTitle} />
        <div className="flex flex-col gap-4 px-4">
          {themedMatchups.map((comparisonId, index) => {
            return (
              <ComparisonCard
                key={`${comparisonId}-${index}`}
                comparisonId={comparisonId}
                cardWidth="w-full"
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default ThemedComparisonsSection;
