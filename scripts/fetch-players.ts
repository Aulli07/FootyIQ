import { fetchPlayersPage } from "./lib/api";
import { loadPage, loadProgress, savePage, saveProgress } from "./lib/storage";

const league = 2; // Premier League
const season = 2023; // 2023-2024 season
const MAX_PAGES_PER_TEAM = 3;

async function main() {
  const key = `${league}-${season}`;
  const progress = loadProgress();
  progress[key] ??= [];
  saveProgress(progress);
  const completed = new Set(progress[key] ?? []);

  // const teams = [77, 79, 80, 81, 82, 83, 84, 85, 91, 93, 94, 95, 96, 97, 99, 104, 106, 108, 110, 116];
  // const teams = [79, 80, 81, 82, 83, 84, 85, 91, 93, 94, 95, 96, 97, 99, 106, 111, 112, 116];
  const teams = [40, 47, 49, 50, 81, 85, 157, 165, 168, 169, 173, 194, 211, 212, 228, 247, 257, 400, 489, 492, 496, 505, 529, 530, 536, 541, 550, 566, 569, 571, 604, 620];
  const REQUEST_LIMIT = 98;
  let requests = 0;
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  for (const teamId of teams) {
    if (completed.has(teamId)) continue;

    let totalPages = 1;
    for (let page = 1; page <= totalPages; page++) {
      let data = loadPage(league, season, teamId, page);

      if (!data) {
        if (requests >= REQUEST_LIMIT) {
          console.log("Request limit reached, stopped.");
          return;
        }
        data = await fetchPlayersPage(teamId, league, season, page);
        requests++;
        savePage(league, season, teamId, page, data);
        console.log(`Page ${page} out of ${totalPages} saved.`);
        await sleep(7000)
      }

      totalPages = Math.min(data.paging.total ?? totalPages, MAX_PAGES_PER_TEAM);
    }

    completed.add(teamId);
    progress[key] = [...completed];
    saveProgress(progress);
  }

  console.log("All teams processed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
