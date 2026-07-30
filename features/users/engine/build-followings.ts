import fs from "fs";
import path from "path";

import { follows } from "@/features/users/data/follows";
import { FollowMappedType } from "@/features/posts/types/follow";

const GENERATED_DIR = path.resolve(process.cwd(), "features");



export function buildFollowingData() {
  const storedFollowings = buildStoredFollowingsFromLegacy();

  fs.mkdirSync(GENERATED_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(GENERATED_DIR, "users/data/indexed-followings.json"),
    JSON.stringify(storedFollowings, null, 2),
  );

  return storedFollowings;
}

function buildStoredFollowingsFromLegacy() {
  const storedUserFollowings: FollowMappedType = {};

  for (const follow of follows) {
    const { followerId, followingId } = follow;

    if (!storedUserFollowings[followerId]) {
      storedUserFollowings[followerId] = [];
    }
    storedUserFollowings[followerId].push(followingId);
  }

  return storedUserFollowings;
}

if (process.argv[1]?.includes("build-followings.ts")) {
  buildFollowingData();
}
