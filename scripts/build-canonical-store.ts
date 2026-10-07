import { buildCanonicalStore } from "@/adapters/store";
import path from "path";
import fs from "fs";
import { LegacyPlayer } from "@/shared/types/legacy-schema";

const directory = path.join("data", "processed", "players.json");
const players : LegacyPlayer[] = JSON.parse(fs.readFileSync(directory, "utf-8"));
const canonicalStore = buildCanonicalStore(players)

fs.writeFileSync("data/processed/canonical-store.json", JSON.stringify(canonicalStore, null, 2));