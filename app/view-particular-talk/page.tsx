"use client"

import { Posts } from "../data/posts";
import { useSearchParams } from "next/navigation";

import { oswald, poppins } from "../fonts";

export default function ParticularPost () {
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");

  const post = Posts.find(post => post.id === postId);

  return (
    // It should be similar to the existing post structure with the remove of bg and borders

    <div className="px-3 pb-5 pt-5 flex flex-col gap-5">
      <div className="flex justify-start items-center gap-4 text-white border-b border-white/70 pb-6">
        <img
          src="/images/go-back-light.png"
          alt="go back"
          className="h-8 w-8 object-cover cursor-pointer"
        />
        <p className={`text-lg ${oswald.className} font-semibold`}>
          POST
        </p>
      </div>
    </div>
  )
}