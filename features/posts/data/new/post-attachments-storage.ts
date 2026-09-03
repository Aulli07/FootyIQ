"use client";

import indexedAttachments from "@/features/posts/data/new/indexed-post-attachments.json";

import type {
  PostAttachmentType,
  PostMappedAttachmentType,
} from "@/features/posts/types/attachment";

const STORAGE_KEY = "post_attachments_storage";

const precomputedAttachmentsStore =
  indexedAttachments as PostMappedAttachmentType;

export function buildHydratedPostAttachmentsStore() {
  const hydratedPostAttachmentsStore = {
    ...precomputedAttachmentsStore,
    ...getStoredPostAttachments(),
  };

  initializePostAttachmentsStorage(hydratedPostAttachmentsStore);

  return hydratedPostAttachmentsStore;
}

export function initializePostAttachmentsStorage(
  attachmentsHistory: PostMappedAttachmentType,
) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(attachmentsHistory));
}

export function manageAttachmentInStorage(entry: PostAttachmentType) {
  if (typeof window === "undefined") {
    return entry;
  }

  const attachmentHistory = getStoredPostAttachments();

  storeAttachmentInStorage(entry, attachmentHistory);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(attachmentHistory));
  window.dispatchEvent(new Event("posts-updated"));

  console.log("Your attachment is stored");
  return entry;
}

export function storeAttachmentInStorage(
  entry: PostAttachmentType,
  attachmentsHistory: PostMappedAttachmentType,
) {
  attachmentsHistory[entry.id] = entry;
  return entry;
}

export function getStoredPostAttachments(): PostMappedAttachmentType {
  if (typeof window === "undefined") {
    return {};
  }

  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}
