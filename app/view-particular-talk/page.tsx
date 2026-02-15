"use client";

import Image from "next/image";
import { Posts } from "../data/posts";
import { useSearchParams } from "next/navigation";

import { oswald, poppins } from "../fonts";

export default function ParticularPost() {
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");

  const post = Posts.find((post) => post.id === postId);

  const timeAgo = (date: string) => {
    const elapsedInMinutes = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / (1000 * 60),
    );

    if (elapsedInMinutes < 60) return `${Math.max(elapsedInMinutes, 1)}m`;
    if (elapsedInMinutes < 1440) return `${Math.floor(elapsedInMinutes / 60)}h`;
    return `${Math.floor(elapsedInMinutes / 1440)}d`;
  };

  if (!post) {
    return (
      <main className="px-4 py-6 min-h-[80vh] text-white">
        <div className="max-w-3xl mx-auto border border-white/20 rounded-2xl bg-white/5 p-6">
          <p className={`${poppins.className} text-white/80 text-sm`}>
            Post not found.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 md:px-6 pb-10 pt-5 min-h-[88vh] text-white">
      <div className="max-w-3xl mx-auto flex flex-col ">
        <div className="flex justify-start items-center gap-4 text-white border-b border-white/25 pb-5">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="cursor-pointer"
          >
            <Image
              src="/images/go-back-light.png"
              alt="go back"
              width={30}
              height={30}
              className="object-cover"
            />
          </button>
          <div>
            <p className={`text-lg ${oswald.className} font-semibold`}>POST</p>
            <p className={`${poppins.className} text-xs text-white/60`}>
              View discussion
            </p>
          </div>
        </div>

        <article className="w-full border border-white/20 rounded-2xl bg-white/4 backdrop-blur p-5 md:p-7 mt-5">
          <div className="flex justify-start items-start gap-4">
            <div className="relative h-14 w-14">
              <Image
                src={post.user.avatarUrl}
                alt={post.user.name}
                fill
                sizes="56px"
                className="object-cover rounded-full border border-emerald-700 shadow-md"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <div>
                <p className={`text-lg text-white ${poppins.className} font-semibold`}>{post.user.name}</p>
                <p className={`text-sm text-white/60 ${poppins.className}`}>@{post.user.username}</p>
              </div>

              <div className="flex border border-white/20 justify-left h-8 items-center">
                <span className="text-white/40">•</span>
                <p className={`text-sm text-white/70 ${poppins.className}`}>{timeAgo(post.createdAt)}</p>
              </div>
            </div>              
          </div>

          <div>
            <p className={`mt-5 text-base md:text-lg leading-8 text-white/90 ${poppins.className}`}>{post.content}</p>
          </div>
          

          {/* <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 mt-4 flex items-center justify-between w-[90%] py-3">
            <div className="flex items-center gap-2">
              <Image
                src="/images/comment-light.png"
                alt="Comment"
                width={18}
                height={18}
                className="object-cover"
              />
              <span className={`text-sm text-white/80 ${poppins.className}`}>
                {post.stats.comments}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="/images/like-light.png"
                alt="Like"
                width={18}
                height={18}
                className="object-cover"
              />
              <span className={`text-sm text-white/80 ${poppins.className}`}>
                {post.stats.likes}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="/images/view-light.png"
                alt="View"
                width={18}
                height={18}
                className="object-cover"
              />
              <span className={`text-sm text-white/80 ${poppins.className}`}>
                {post.stats.views}
              </span>
            </div>
          </div> */}
        </article>

        <div className="py-3 px-2 flex gap-5 border-y border-white/50 mt-4">
          <p className={`${poppins.className} text-sm text-white/70 font-medium`}>{post.stats.likes} Likes</p>
          <p className={`${poppins.className} text-sm text-white/70 font-medium`}>{post.stats.comments} Comments</p>
          <p className={`${poppins.className} text-sm text-white/70 font-medium`}>{post.stats.views} Views</p>
        </div>

        <div className="flex items-center justify-between w-[100%] py-3 px-4 border border-white/20 rounded-2xl bg-white/4 backdrop-blur px-10 my-6">
          <div className="flex items-center gap-2">
            <Image
              src="/images/comment-light.png"
              alt="Comment"
              width={18}
              height={18}
              className="object-cover"
            />
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/images/like-light.png"
              alt="Like"
              width={18}
              height={18}
              className="object-cover"
            />
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/images/view-light.png"
              alt="View"
              width={18}
              height={18}
              className="object-cover"
            />
          </div>
        </div>

        <section className="mt-6 w-full border border-white/20 rounded-2xl bg-white/5 p-5 md:p-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/20">
            <h2 className={`${oswald.className} text-xl text-white`}>
              COMMENTS
            </h2>
            <p className={`${poppins.className} text-xs text-white/60`}>
              Join the conversation
            </p>
          </div>

          <div className="relative mt-5 rounded-xl border border-dashed border-white/20 bg-black/15 p-4 ">
            <p className={`${poppins.className} text-sm text-white/70`}>
              No comments yet. Be the first to add one.
            </p>
          </div>


          <div className="fixed z-1 bottom-0 left-0 right-0 flex items-center rounded-xl border border-white/30 bg-black/20 px-5 py-2">
            <input
              placeholder="Write a comment..."
              className={`${poppins.className} flex w-full bg-transparent text-sm text-white placeholder:text-white/50 outline-none resize-none items-center justify-center`}
            />
            <div>
              <button
                type="button"
                className={`${poppins.className} py-2 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-500 transition-colors tracking-wide px-5 `}
              >
                Post
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
