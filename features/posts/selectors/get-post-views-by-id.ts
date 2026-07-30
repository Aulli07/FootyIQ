"use client";

import { buildHydratedPostViewsStore } from "@/features/posts/data/new/post-views-storage";
import { ViewType } from "@/features/posts/types/view";

export function getPostViewsById(postId: string): ViewType[] {
  const hydratedViewsStore = buildHydratedPostViewsStore();

  return Object.values(hydratedViewsStore).filter(
    (view) => view.postId === postId,
  );
}
