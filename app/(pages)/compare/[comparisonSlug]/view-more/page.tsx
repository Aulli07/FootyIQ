"use client";

import { getPostsInDiscussion } from "@/features/posts/selectors/get-post-discussions-by-ids";

import { PostType } from "@/features/posts/types/post";

import { PostDisplay } from "@/features/posts/components/post-display";



export default async function Page({
  params,
}: {
  params: Promise<{ comparisonSlug: string }>;
}) {
  const resolvedParams = await params;
  return <ViewMoreComparePosts params={resolvedParams} />;
}

export function ViewMoreComparePosts({
  params
}: {
  params: { comparisonSlug: string }
}) {

  const { comparisonSlug } = params;

  const leftPlayerId = comparisonSlug.split("-vs-")[0];
  const rightPlayerId = comparisonSlug.split("-vs-")[1];

  const postsInDiscussion = getPostsInDiscussion(leftPlayerId, rightPlayerId);

  return (
    <div className="flex flex-col gap-4 h-full w-full mt-5 px-3">
      <div className="flex flex-col gap-4">
        {postsInDiscussion.map((post: PostType) => (
          <PostDisplay key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}