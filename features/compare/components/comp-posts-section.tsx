import { PostType } from "@/features/posts/types/post";

import { PostDisplay } from "@/features/posts/components/post-display";

import { poppins } from "@/app/font-icons/fonts";
import Link from "next/link";

import { getPostsInDiscussion } from "@/features/posts/selectors/get-post-details-by-id";
import HomeTitleSection from "@/shared/components/section-title";



export default function ComparisonPostsSection({
  leftPlayerId,
  rightPlayerId,
}: {
  leftPlayerId: string | null;
  rightPlayerId: string | null;
}) {

  if (!leftPlayerId || !rightPlayerId) {
    return null;
  }

  const uniqueFullPath = `/compare/${leftPlayerId}-vs-${rightPlayerId}`;
  const postsInDiscussion = getPostsInDiscussion(leftPlayerId, rightPlayerId);

  if (postsInDiscussion.length === 0) {
    return (
      <div className="flex flex-col gap-3 h-full w-full mt-8">
        <HomeTitleSection title="Posts" />
        <p
          className={`text-light-text-secondary dark:text-dark-text-secondary ${poppins.className} text-sm`}
        >
          No posts found for this comparison. Be the first to start the
          discussion!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4  mt-8">
      <HomeTitleSection title="Posts" />
      <div className="flex flex-col gap-4">
        {postsInDiscussion.slice(0, 3).map((post: PostType) => (
          <PostDisplay key={post.id} post={post} />
        ))}
      </div>
      {(postsInDiscussion.length > 3) && ( 
        <Link
          href={{ pathname: `${uniqueFullPath}/view-more` }}
          className="flex justify-end items-center"
        >
          <span
            className={`${poppins.className} text-sm font-semibold border-b mt-2 text-light-text-secondary dark:text-dark-text-secondary`}
          >
            View More Posts
          </span>
        </Link>
      )}
    </div>
  );
}
