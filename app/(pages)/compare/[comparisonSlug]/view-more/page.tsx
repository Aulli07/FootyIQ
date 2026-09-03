"use client";

import { useParams } from "next/navigation";

import { getPostsInDiscussion } from "@/features/posts/selectors/get-post-details-by-id";
import { PostType } from "@/features/posts/types/post";
import { PostDisplay } from "@/features/posts/components/post-display";


export default function ViewMoreComparePosts() {

  const params = useParams<{ "comparisonSlug": string }>();
  const comp = params["comparisonSlug"];

  const leftPlayerId = comp.split("-vs-")[0];
  const rightPlayerId = comp.split("-vs-")[1];

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