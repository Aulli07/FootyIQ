import fs from "fs";
import path from "path";

import { users as legacyUsers } from "@/features/users/data/users";
import { UserMappedType } from "@/features/users/types/users";

const GENERATED_DIR = path.resolve(process.cwd(), "features");

export function buildUsersData() {
  const storedUsers = buildStoredUsersFromLegacy();

  fs.mkdirSync(GENERATED_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(GENERATED_DIR, "users/data/indexed-users.json"),
    JSON.stringify(storedUsers, null, 2),
  );

  return storedUsers;
}

function buildStoredUsersFromLegacy() {
  const storedUsers: UserMappedType = {};

  legacyUsers.forEach((user) => {
    storedUsers[user.id] = user;
  });

  return storedUsers;
}

if (process.argv[1]?.includes("build-users.ts")) {
  buildUsersData();
}
