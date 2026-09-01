import { buildHashId, createPostKey } from "@/shared/utils/identity";
import { manageViewInStorage } from "../data/new/post-views-storage";
import { ViewType } from "../types/view";

export type viewInputType = {
  postId: string;
  userId: string;
  timestamp: number;
};

export function createViewPayload(
  postId: string,
  userId: string,
): viewInputType {
  return {
    postId,
    userId,
    timestamp: Date.now(),
  };
}

export function saveViewFromUpload(newView: viewInputType) {
  if (!newView.postId || !newView.userId) {
    return;
  }

  const viewId = createNewViewId(newView);
  const viewEntry = buildViewEntry(viewId, newView);
  return manageViewInStorage(viewEntry);
}

function createNewViewId(newView: viewInputType): string {
  const key = createPostKey([
    newView.postId,
    newView.userId,
    String(newView.timestamp),
  ]);

  return buildHashId(key, "v-");
}

function buildViewEntry(id: string, newView: viewInputType): ViewType {
  return {
    id,
    postId: newView.postId,
    userId: newView.userId,
    createdAt: String(newView.timestamp),
  };
}
