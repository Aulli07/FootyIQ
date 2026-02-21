"use client";

import Image from "next/image";
import { Posts } from "../../data/posts";
import { useParams } from "next/navigation";

import Link from "next/link";

import { oswald, poppins } from "../../fonts";
import PageTitle from "../../../components/page-title";

export default function ParticularPost() {
  const params = useParams<{ "view-particular-talk": string, talks: string }>();
  const postId = params["view-particular-talk"];
  const talks = params.talks;

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

  const statChips = [
    { label: "likes", value: post.stats.likes },
    { label: "comments", value: post.stats.comments },
    { label: "views", value: post.stats.views },
  ];

  const quickActions = [
    { alt: "Comment", src: "/images/comment-light.png" },
    { alt: "Like", src: "/images/like-light.png" },
    { alt: "View", src: "/images/view-light.png" },
  ];

  const emptyCardContent = (
    <>
      <div className="h-9 w-9 rounded-full border border-emerald-400/30 bg-emerald-500/10 flex items-center justify-center shrink-0">
        <Image
          src="/images/comment-light.png"
          alt="comment"
          width={16}
          height={16}
          className="object-cover"
        />
      </div>
      <div className="space-y-1">
        <p className={`${poppins.className} text-sm text-white/80 font-medium`}>
          No comments yet
        </p>
        <p className={`${poppins.classNagme} text-xs text-white/55`}>
          Be the first to drop your thoughts on this post.
        </p>
      </div>
    </>
  );

  return (
    <main className="px-4 md:px-6 text-white h-[calc(100vh-6rem)] overflow-y-auto">
      <div className="max-w-3xl mx-auto flex flex-col h-full gap-1">
        <PageTitle title="POST" />

        <div className="pt-4 shrink-0 px-3">
          <article className="w-full border border-white/20 rounded-2xl bg-white/5 backdrop-blur p-5 md:p-7 shadow-[0_8px_28px_rgba(0,0,0,0.32)] flex flex-col h-auto space-y-5">
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

              <div className="flex flex-wrap items-start gap-3 md:gap-4">
                <div>
                  <p
                    className={`text-lg text-white ${poppins.className} font-semibold`}
                  >
                    {post.user.name}
                  </p>
                  <p className={`text-sm text-white/60 ${poppins.className}`}>
                    @{post.user.username}
                  </p>
                </div>

                <div className="flex border border-emerald-400/20 bg-emerald-500/10 rounded-full px-3 h-8 items-center gap-2">
                  <p className={`text-sm text-white/70 ${poppins.className}`}>
                    {timeAgo(post.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p
                className={`text-base md:text-lg leading-8 text-white/90 ${poppins.className}`}
              >
                {post.content}
              </p>
            </div>
          </article>
        </div>

        <div className="py-4 px-3 flex gap-2 md:gap-3 shrink-0 flex-wrap">
          {statChips.map((chip) => (
            <p
              key={chip.label}
              className={`${poppins.className} text-xs text-white/75 font-medium border border-white/20 bg-white/5 rounded-full px-3 py-1 flex items-center`}
            >
              {chip.value} {chip.label}
            </p>
          ))}
        </div>

        <div className="h-20 shrink-0 px-3">
          <div className="flex items-center justify-between w-[100%] py-1 px-10 border border-white/20 rounded-2xl bg-white/4 backdrop-blur">
            {quickActions.map((action) => (
              <button
                key={action.alt}
                type="button"
                className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-white/10 transition-colors"
              >
                <Image
                  src={action.src}
                  alt={action.alt}
                  width={25}
                  height={25}
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <section className="mt-5 w-full flex-1 min-h-0 flex flex-col px-3">
          <div className="flex items-center justify-between pb-4 px-1 border-b border-white/20">
            <h2 className={`${oswald.className} text-xl text-white`}>
              COMMENTS
            </h2>
            <p className={`${poppins.className} text-xs text-white/60`}>
              Join the conversation
            </p>
          </div>

          <div className="mt-5 flex-1 min-h-0 pr-1 space-y-3 pb-4">
            <Link
              href={{ pathname: `/talks/${talks}/view-particular-talk`, query: { postId: post.id } }}
              className="relative rounded-xl border border-white/30 bg-black/90 p-4 flex items-start gap-3"
            >
              {emptyCardContent}
            </Link>
            <div className="relative rounded-xl border border-white/30 bg-black/90 p-4 flex items-start gap-3">
              <div className="h-9 w-9 rounded-full border border-emerald-400/30 bg-emerald-500/10 flex items-center justify-center shrink-0">
                <Image
                  src="/images/comment-light.png"
                  alt="comment"
                  width={16}
                  height={16}
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <p
                  className={`${poppins.className} text-sm text-white/80 font-medium`}
                >
                  No comments yet
                </p>
                <p className={`${poppins.className} text-xs text-white/55`}>
                  Be the first to drop your thoughts on this post.
                </p>
              </div>
            </div>
            <div className="relative rounded-xl border border-white/30 bg-black/90 p-4 flex items-start gap-3">
              <div className="h-9 w-9 rounded-full border border-emerald-400/30 bg-emerald-500/10 flex items-center justify-center shrink-0">
                <Image
                  src="/images/comment-light.png"
                  alt="comment"
                  width={16}
                  height={16}
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <p
                  className={`${poppins.className} text-sm text-white/80 font-medium`}
                >
                  No comments yet
                </p>
                <p className={`${poppins.className} text-xs text-white/55`}>
                  Be the first to drop your thoughts on this post.
                </p>
              </div>
            </div>
            <div className="relative rounded-xl border border-white/30 bg-black/90 p-4 flex items-start gap-3">
              <div className="h-9 w-9 rounded-full border border-emerald-400/30 bg-emerald-500/10 flex items-center justify-center shrink-0">
                <Image
                  src="/images/comment-light.png"
                  alt="comment"
                  width={16}
                  height={16}
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <p
                  className={`${poppins.className} text-sm text-white/80 font-medium`}
                >
                  No comments yet
                </p>
                <p className={`${poppins.className} text-xs text-white/55`}>
                  Be the first to drop your thoughts on this post.
                </p>
              </div>
            </div>
            <div className="relative rounded-xl border border-white/30 bg-black/90 p-4 flex items-start gap-3">
              <div className="h-9 w-9 rounded-full border border-emerald-400/30 bg-emerald-500/10 flex items-center justify-center shrink-0">
                <Image
                  src="/images/comment-light.png"
                  alt="comment"
                  width={16}
                  height={16}
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <p
                  className={`${poppins.className} text-sm text-white/80 font-medium`}
                >
                  No comments yet
                </p>
                <p className={`${poppins.className} text-xs text-white/55`}>
                  Be the first to drop your thoughts on this post.
                </p>
              </div>
            </div>
            <div className="relative rounded-xl border border-white/30 bg-black/90 p-4 flex items-start gap-3">
              <div className="h-9 w-9 rounded-full border border-emerald-400/30 bg-emerald-500/10 flex items-center justify-center shrink-0">
                <Image
                  src="/images/comment-light.png"
                  alt="comment"
                  width={16}
                  height={16}
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <p
                  className={`${poppins.className} text-sm text-white/80 font-medium`}
                >
                  No comments yet
                </p>
                <p className={`${poppins.className} text-xs text-white/55`}>
                  Be the first to drop your thoughts on this post.
                </p>
              </div>
            </div>
            <div className="relative rounded-xl border border-white/30 bg-black/90 p-4 flex items-start gap-3">
              <div className="h-9 w-9 rounded-full border border-emerald-400/30 bg-emerald-500/10 flex items-center justify-center shrink-0">
                <Image
                  src="/images/comment-light.png"
                  alt="comment"
                  width={16}
                  height={16}
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <p
                  className={`${poppins.className} text-sm text-white/80 font-medium`}
                >
                  No comments yet
                </p>
                <p className={`${poppins.className} text-xs text-white/55`}>
                  Be the first to drop your thoughts on this post.
                </p>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 mt-2 shrink-0 flex items-center gap-3 bg-gradient-to-t from-black via-black to-transparent pt-3 pb-2">
            <div className="w-full flex items-center gap-3 rounded-xl border-2 border-white/70 bg-black/90 px-4 py-2 shadow-inner shadow-emerald-500/10">
              <input
                placeholder="Write a comment..."
                className={`${poppins.className} flex w-full bg-transparent text-sm text-white placeholder:text-white/50 outline-none resize-none items-center justify-center`}
              />
              <div>
                <button
                  type="button"
                  className={`${poppins.className} py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 transition-colors tracking-wide px-5`}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
