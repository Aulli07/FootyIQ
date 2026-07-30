"use client";

import { buildHydratedPostAnalyticsStore } from "@/features/posts/data/new/post-analytics-storage";
import { PostAnalyticsType } from "@/features/posts/types/hydrated";

export function getPostAnalyticsById(postId: string): PostAnalyticsType | null {
  const hydratedPostAnalytics = buildHydratedPostAnalyticsStore();
  return hydratedPostAnalytics[postId] ?? null;
}
