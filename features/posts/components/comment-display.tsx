import Image from "next/image";
import { poppins } from "@/app/font-icons/fonts";

import { CommentType } from "../types/comment";
import { getPostCountsById, getPostLikesById } from "../selectors/get-post-details-by-id";

import { getUserById } from "@/features/users/selectors/get-user-by-id";

import { timeAgo } from "../utils/time-ago";
import { getQuickActionIcon } from "../utils/quick-actions";
import { handleLike } from "../utils/post-handlers";
import { useState } from "react";

export function CommentDisplay({
  comment,
  mounted,
  isDark,
}: {
  comment: CommentType;
  mounted: boolean;
  isDark: boolean;
}) {
  const [ localLikeCount, setLocalLikeCount ] = useState<number>(0)

  const commentAuthor = getUserById(comment.userId);
  const commentCounts = getPostCountsById(comment.id);

  const hasCommentUserLiked = getPostLikesById(comment.id).some((like) => like.userId === comment.userId);

  return (
    <div
      key={comment.id}
      className="relative px-2 py-4 md:px-3 flex items-start justify-between gap-3 border-b border-light-ui-border dark:border-white/30 last:border-b-1 rounded-xl bg-light-background-card/40 dark:bg-white/[0.04]"
    >
      <div className="space-y-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="relative h-9 w-9 shrink-0">
            <Image
              src={commentAuthor?.avatarUrl ?? "/images/default-avatar.png"}
              alt={commentAuthor?.name ?? "User Avatar"}
              fill
              sizes="36px"
              className="object-cover rounded-full border border-light-ui-border dark:border-white/20"
            />
          </div>

          <div className="w-full flex flex-row justify-between">
            <div>
              <p
                className={`${poppins.className} text-sm text-light-text-primary dark:text-dark-text-primary font-medium truncate`}
              >
                {commentAuthor?.name ?? "Unknown user"}
              </p>
              <p
                className={`${poppins.className} text-xs text-light-text-muted dark:text-dark-text-muted truncate`}
              >
                @{commentAuthor?.username ?? "unknown"}
              </p>
            </div>
            {/* <div className="mr-2">
              <span className={`${poppins.className} text-[11px] text-light-text-muted dark:text-dark-text-muted`}>
              • {timeAgo(comment.createdAt)}
              </span>
            </div> */}
          </div>
        </div>
        <div className={`${poppins.className} pl-3`}>
          {comment.tags.length > 0 && (
            <p className="text-xs leading-5 mb-0.5 flex flex-wrap gap-1">
              {comment.tags.map((tag) => (
                <span key={tag} className="text-emerald-300">
                  @{getUserById(tag)?.username ?? tag}
                </span>
              ))}
            </p>
          )}
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-6 whitespace-pre-line">
            {comment.content}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => handleLike(comment.id, comment.userId, hasCommentUserLiked, setLocalLikeCount)}
        disabled={hasCommentUserLiked}
        className="shrink-0 flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded-md hover:bg-slate-200 dark:hover:bg-white/10 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span
          className={`${poppins.className} text-xs text-light-text-secondary dark:text-dark-text-secondary`}
        >
          {commentCounts.likeCount}
        </span>
        <Image
          src={getQuickActionIcon("like", mounted, isDark)}
          alt="Like"
          width={20}
          height={20}
          className={`object-cover ${hasCommentUserLiked && "bg-red-400"}`}
        />
      </button>
    </div>
  );
}
