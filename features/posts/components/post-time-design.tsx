import { poppins } from "@/app/font-icons/fonts";
import { PostType } from "@/features/posts/types/post";
import { timeAgo } from "@/features/posts/utils/time-ago";

export function PostTimeDesign({ post }: { post: PostType }) {
  return (
    <div className="flex border border-emerald-400/20 bg-emerald-500/10 rounded-full px-3 h-6 items-center gap-2">
      <p
        className={`text-xs text-light-text-secondary dark:text-dark-text-secondary ${poppins.className}`}
      >
        {timeAgo(post.createdAt)}
      </p>
    </div>
  );
}
