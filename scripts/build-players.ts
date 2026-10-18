import { LegacyPlayer } from "@/shared/types/legacy-schema";
import fs from "fs";
import path from "path";

const rawDataDir = "data/raw";
const dirs = fs
  .readdirSync(rawDataDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && /^\d+-\d{4}$/.test(entry.name))
  .map((entry) => entry.name)
  .sort();
const players = new Map<number, LegacyPlayer>();

for (const dir of dirs) {
  for (const file of fs.readdirSync(path.join(rawDataDir, dir))) {
    if (!file.endsWith(".json")) continue;
    const fileData = JSON.parse(fs.readFileSync(path.join(rawDataDir, dir, file), "utf-8"));
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
