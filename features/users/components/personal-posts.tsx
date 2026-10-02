import { useMemo } from "react";
import Link from "next/link";

import { buildHydratedPostsStore } from "@/features/posts/data/new/posts-store";
import { buildPersonalPosts } from "@/features/posts/selectors/build-personal-posts";
import { PostDisplay } from "@/features/posts/components/post-display";

export function PersonalPosts({ id }: { id: string }) {
  const postsStore = useMemo(() => buildHydratedPostsStore(), []);
  const personalPosts = buildPersonalPosts({ postsStore, userId: id });

  return (
    <div className="display flex flex-col gap-5">
      {personalPosts.map((post) => (
        // <Link href={{ pathname: `/posts/${post.id}` }} key={post.id}>
          <PostDisplay key={post.id} post={post} />
      ))}
    </div>
  );
}
