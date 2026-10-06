const API_FOOTBALL_KEY = process.env.API_FOOTBALL_KEY as string;
if (!API_FOOTBALL_KEY) throw new Error("API_FOOTBALL_KEY is not defined in the environment variables.");



export async function fetchPlayersPage(teamId: number, league: number, season: number, page: number) {
  const res = await fetch(`https://v3.football.api-sports.io/players?&league=${league}&season=${season}&team=${teamId}&page=${page}`, {
    "method": "GET",
    "headers": {
      "x-apisports-key": API_FOOTBALL_KEY,
    }
  })

  if (!res.ok) throw new Error("HTTP" + res.status);

  const data = await res.json();

  if (Object.keys(data.errors ?? {}).length > 0) {
    throw new Error("API Error: " + JSON.stringify(data.errors));
  }

  return data;
} 