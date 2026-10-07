import { LegacyPlayer } from "@/shared/types/legacy-schema";
import fs from "fs";
import path from "path";

const dirs = ["39-2022", "39-2023", "39-2024", "140-2022", "140-2023", "140-2024", "135-2022"];
const players = new Map<number, LegacyPlayer>();

for (const dir of dirs) {
  for (const file of fs.readdirSync("data/raw/" + dir)) {
    if (!file.endsWith(".json")) continue;
    const fileData = JSON.parse(fs.readFileSync(path.join("data/raw/", dir, "/", file), "utf-8"));
    for (const item of (fileData.response ?? [])) {
      const existingPlayer = players.get(item.player.id);

      if (!existingPlayer) {
        players.set(item.player.id, {
          ...item,
          statistics: [...item.statistics],
        });
        continue;
      }

      const existingStatKeys = new Set(
        existingPlayer.statistics.map(
          (stat) => `${stat.team.id}:${stat.league.id}:${stat.league.season}`,
        ),
      );

      for (const stat of item.statistics) {
        const statKey = `${stat.team.id}:${stat.league.id}:${stat.league.season}`;
        if (existingStatKeys.has(statKey)) continue;

        existingPlayer.statistics.push(stat);
        existingStatKeys.add(statKey);
      }
    }
  }
}

fs.writeFileSync("data/processed/players.json", JSON.stringify(Array.from(players.values()), null, 2));