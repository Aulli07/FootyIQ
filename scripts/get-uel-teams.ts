import fs from "fs";
import path from "path";

const API_FOOTBALL_KEY = process.env.API_FOOTBALL_KEY as string;
if (!API_FOOTBALL_KEY) {
  throw new Error("API_FOOTBALL_KEY is not defined in the environment variables.");
}

const tournaments = [
  { name: "World Cup 2022", league: 1, season: 2022 },
  { name: "Euro 2024", league: 4, season: 2024 }
]
const outputPath = "data/processed/intenationals.json"

async function main() {
  const result: Record<string, number[]> = {};

  for (const t of tournaments) {
    const res = await fetch(
    `https://v3.football.api-sports.io/standings?league=${t.league}&season=${t.season}`,
      {
        method: "GET",
        headers: {
          "x-apisports-key": API_FOOTBALL_KEY,
        },
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch league ${t.league} for season ${t.season}: HTTP ${res.status}`);
    }

    const data = await res.json();

    if (data?.errors && Object.keys(data.errors).length > 0) {
      throw new Error(`API Error for season ${t.season}: ${JSON.stringify(data.errors)}`);
    }

    const standings = data?.response?.[0]?.league?.standings;
    if (!Array.isArray(standings)) {
      throw new Error(`Unexpected standings response shape for season ${t.season}`);
    }

    const teamIds = standings
      .flat()
      .map((entry: any) => Number(entry?.team?.id))
      .filter((id: number) => Number.isFinite(id));

    result[t.season] = [...new Set(teamIds)].sort((a, b) => a - b);
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));

  console.log(
    JSON.stringify(
      {
        outputPath,
        seasons: Object.keys(result),
        counts: Object.fromEntries(
          Object.entries(result).map(([season, teamIds]) => [season, teamIds.length]),
        ),
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
