"use client";

import { buildHydratedPostAttachmentsStore } from "@/features/posts/data/new/post-attachments-storage";
import type { PostAttachmentType } from "@/features/posts/types/attachment";

export function getPostAttachmentById(attachmentId: string): PostAttachmentType {
  const hydratedAttachmentsStore = buildHydratedPostAttachmentsStore();

  return (
    Object.values(hydratedAttachmentsStore).find(
      (attachment) => attachment.id === attachmentId,
    ) ?? { id: "", comparisonId: "", stats: undefined }
  );
}
