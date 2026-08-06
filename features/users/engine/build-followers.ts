import fs from "fs";
import path from "path";

import { follows } from "@/features/users/data/follows";
import { FollowMappedType } from "@/features/posts/types/follow";

const GENERATED_DIR = path.resolve(process.cwd(), "features");


export function buildFollowerData() {
  const storedFollowers = buildStoredFollowersFromLegacy();

  fs.mkdirSync(GENERATED_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(GENERATED_DIR, "users/data/indexed-followers.json"),
    JSON.stringify(storedFollowers, null, 2),
  );

  return storedFollowers;
}

function buildStoredFollowersFromLegacy() {
  const storedUserFollowers: FollowMappedType = {};

  for (const follow of follows) {
    const { followerId, followingId } = follow;

    if (!storedUserFollowers[followingId]) {
      storedUserFollowers[followingId] = [];
    }
    storedUserFollowers[followingId].push(followerId);
  }

  return storedUserFollowers;
}

if (process.argv[1]?.includes("build-followers.ts")) {
  buildFollowerData();
}
