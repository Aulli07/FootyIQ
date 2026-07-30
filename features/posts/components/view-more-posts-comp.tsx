"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { getPostsInDiscussion } from "@/features/posts/selectors/get-post-discussions-by-ids";
import { PostType } from "@/features/posts/types/post";

import PageTitle from "@/shared/components/page-title";
import { PostDisplay } from "@/features/posts/components/post-display";

export default function ViewMorePostsContent() {
  const searchParams = useSearchParams();
  const leftPlayerId = searchParams.get("leftPlayerId");
  const rightPlayerId = searchParams.get("rightPlayerId");

  if (!leftPlayerId || !rightPlayerId) {
    return <span>Players not found</span>;
  }

  const postsInDiscussion = getPostsInDiscussion(leftPlayerId, rightPlayerId);

  return (
    <div className="px-3 pt-5 pb-5 flex flex-col gap-5">
      <PageTitle
        title={`POSTS ON ${leftPlayerId?.toUpperCase()} AND ${rightPlayerId?.toUpperCase()}`}
      />

      <div className="flex flex-col gap-4 px-4 mt-1">
        {postsInDiscussion.map((post: PostType) => (
          <Link href={{ pathname: `/posts/${post.id}` }} key={post.id}>
            <PostDisplay post={post} />
          </Link>
        ))}
      </div>
    </div>
  );
}
