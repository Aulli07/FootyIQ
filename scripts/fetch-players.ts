import { fetchPlayersPage } from "./lib/api";
import { loadPage, loadProgress, savePage, saveProgress } from "./lib/storage";

const league = 4; // Premier League
const season = 2024; // 2023-2024 season
const MAX_PAGES_PER_TEAM = 3;

async function main() {
  const key = `${league}-${season}`;
  const progress = loadProgress();
  progress[key] ??= [];
  saveProgress(progress);
  const completed = new Set(progress[key] ?? []);

  const teams = [
    1,
    2,
    3,
    9,
    10,
    14,
    15,
    21,
    24,
    25,
    27,
    768,
    769,
    770,
    772,
    773,
    774,
    775,
    777,
    778,
    1091,
    1104,
    1108,
    1118
  ];

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
