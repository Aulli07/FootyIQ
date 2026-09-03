"use client";

import indexedViews from "@/features/posts/data/new/indexed-post-views.json";

import { ViewMappedType, ViewType } from "@/features/posts/types/view";

const STORAGE_KEY = "post_views_storage";

const precomputedViewsStore = indexedViews as ViewMappedType;

export function buildHydratedPostViewsStore() {
  const hydratedPostViewsStore = {
    ...precomputedViewsStore,
    ...getStoredPostViews(),
  };

  // initializePostViewsStorage(hydratedPostViewsStore);

  return hydratedPostViewsStore;
}

export function initializePostViewsStorage(viewsHistory: ViewMappedType) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(viewsHistory));
}

export function manageViewInStorage(entry: ViewType) {
  if (typeof window === "undefined") {
    return entry;
  }

  const viewsHistory = getStoredPostViews();
  storeViewInStorage(entry, viewsHistory);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(viewsHistory));
  window.dispatchEvent(new Event("posts-updated"));

  console.log("Your view is stored");
  return entry;
}

export function storeViewInStorage(
  entry: ViewType,
  viewsHistory: ViewMappedType,
) {
  viewsHistory[entry.id] = entry;
  return entry;
}

export function getStoredPostViews(): ViewMappedType {
  if (typeof window === "undefined") {
    return {};
  }

  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}
