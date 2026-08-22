import Image from "next/image";
import { poppins } from "@/app/font-icons/fonts";

import { CommentType } from "../types/comment";
import { getPostCountsById } from "../selectors/get-post-counts-by-id";

import { getUserById } from "@/features/users/selectors/get-user-by-id";

import { timeAgo } from "../utils/time-ago";
import { getQuickActionIcon } from "../utils/quick-actions";

export function CommentDisplay({
  comment,
  mounted,
  isDark,
}: {
  comment: CommentType;
  mounted: boolean;
  isDark: boolean;
}) {
  const commentAuthor = getUserById(comment.userId);
  const commentCounts = getPostCountsById(comment.id);

  return (
    <div
      key={comment.id}
      className="relative px-2 py-4 md:px-3 flex items-start justify-between gap-3 border-b border-light-ui-border dark:border-white/20 last:border-b-0"
    >
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

        <div className="min-w-0 flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
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
            <span
              className={`${poppins.className} text-[11px] text-light-text-muted dark:text-dark-text-muted`}
            >
              • {timeAgo(comment.createdAt)}
            </span>
          </div>
          <div className={`${poppins.className}`}>
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
      </div>

      <button
        type="button"
        className="shrink-0 flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded-md hover:bg-slate-200 dark:hover:bg-white/10 transition-colors h-16"
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
          className="object-cover"
        />
      </button>
    </div>
  );
}
