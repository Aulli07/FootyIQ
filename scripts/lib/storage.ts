import fs from "fs";
import path from "path";


export function savePage(league: number, season: number, teamId: number, page: number, data: unknown) {
  const directory = path.join("data", "raw", `${league}-${season}`, `${teamId}-${page}.json`);
  fs.mkdirSync(path.dirname(directory), { recursive: true });
  fs.writeFileSync(directory, JSON.stringify(data, null, 2));
}

export function loadPage(league: number, season: number, teamId: number, page: number) {
  const directory = path.join("data", "raw", `${league}-${season}`, `${teamId}-${page}.json`);
  if (!fs.existsSync(directory)) return null;
  return JSON.parse(fs.readFileSync(directory, "utf-8"));
}

const PROGRESS_FILE = path.join("data", "progress.json");

export function loadProgress() : Record<string, number[]> {
  if (!fs.existsSync(PROGRESS_FILE)) return {}; 
  const data = fs.readFileSync(PROGRESS_FILE, "utf-8");
  const progress = JSON.parse(data) as Record<string, number[]>;
  return progress;

  // // Older progress files stored a page count. It cannot identify completed teams,
  // // so start that league again rather than skipping unknown results.
  // return Object.fromEntries(
  //   Object.entries(progress).map(([key, value]) => [
  //     key,
  //     Array.isArray(value) ? value.filter((teamId): teamId is number => typeof teamId === "number") : [],
  //   ]),
  // );
}

export function saveProgress(progress: Record<string, number[]>) {
  fs.mkdirSync(path.dirname(PROGRESS_FILE), { recursive: true });
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}
