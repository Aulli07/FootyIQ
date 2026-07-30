"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";

import { ComparisonAnalyticsProvider } from "./comparison-analytics-provider";
import { PlayerAnalyticsProvider } from "./player-analytics-provider";
export { useComparisonAnalytics, usePlayerAnalytics } from "./analytics-contexts";



export function ThemeProvider({ children }: { children: React.ReactNode }) {  
  
  return (
    <NextThemeProvider
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      attribute="class"
    >
      <ComparisonAnalyticsProvider>
        <PlayerAnalyticsProvider>{children}</PlayerAnalyticsProvider>
      </ComparisonAnalyticsProvider>
    </NextThemeProvider>
  );
}
