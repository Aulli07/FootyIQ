import Image from "next/image";
import { poppins } from "@/app/font-icons/fonts";

import { getQuickActionIcon } from "../utils/quick-actions";

export function NoCommentsDisplay(
  {
    mounted,
    isDark
  }: {
    mounted: boolean;
    isDark: boolean;
  }
) {

  return (
    <div className="relative p-4 flex items-start gap-3">
      <div className="h-9 w-9 rounded-full border border-emerald-400/30 bg-emerald-500/10 flex items-center justify-center shrink-0">
        <Image
          src={getQuickActionIcon("comment", mounted, isDark)}
          alt="comment"
          width={16}
          height={16}
          className="object-cover"
        />
      </div>
      <div className="space-y-1">
        <p
          className={`${poppins.className} text-sm text-light-text-secondary dark:text-dark-text-secondary font-medium`}
        >
          No comments yet
        </p>
        <p
          className={`${poppins.className} text-xs text-light-text-muted dark:text-dark-text-muted`}
        >
          Be the first to drop your thoughts on this post.
        </p>
      </div>
    </div>
  )
}