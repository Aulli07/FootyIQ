# Final Data Schema Template

This file shows how the data should look after transformation from legacy mock data into the canonical, long-term schema.

## Store Shape

```ts
type FootballDataStore = {
  players: Player[];
  clubs: Club[];
  competitions: Competition[];
  seasons: Season[];
  playerSeasonStats: PlayerSeasonStats[];
  playerMatchStats: PlayerMatchStats[];
  playerCareerStats: PlayerCareerStats[];
};
```

## Example Store Output

```ts
const footballDataStore: FootballDataStore = {
  players: [
    {
      id: "bellingham",
      fullName: "Jude Bellingham",
      slug: "bellingham",
      nationality: "England",
      dateOfBirth: "2003-06-29",
      heightCm: 186,
      preferredFoot: "right",
      primaryPosition: "Midfielder",
      imageUrl: "/images/lamine-yamal.jpg",
      currentClubId: "real_madrid",
      active: true,
    },
  ],
  clubs: [
    {
      id: "real_madrid",
      name: "Real Madrid",
      country: "Spain",
      logoUrl: "/clubs/real_madrid.png",
    },
  ],
  competitions: [
    {
      id: "laliga",
      name: "La Liga",
      type: "league",
      country: "Spain",
      tier: 1,
      logoUrl: "/images/laliga.png",
    },
    {
      id: "ucl",
      name: "UEFA Champions League",
      type: "continental",
      country: "Europe",
      tier: 1,
      logoUrl: "/images/ucl.png",
    },
    {
      id: "copa_del_rey",
      name: "Copa del Rey",
      type: "cup",
      country: "Spain",
      tier: 1,
      logoUrl: "/images/copa-del-rey.png",
    },
  ],
  seasons: [
    {
      id: "2023-2024",
      label: "23/24",
      startYear: 2023,
      endYear: 2024,
      isCurrent: true,
    },
    {
      id: "2022-2023",
      label: "22/23",
      startYear: 2022,
      endYear: 2023,
      isCurrent: false,
    },
  ],
  playerSeasonStats: [
    {
      id: "bellingham:2023-2024:laliga",
      playerId: "bellingham",
      seasonId: "2023-2024",
      clubId: "real_madrid",
      competitionId: "laliga",
      appearances: 30,
      starts: 30,
      minutes: 2400,
      goals: 10,
      assists: 8,
      shots: 60,
      shotsOnTarget: 30,
      keyPasses: 20,
      chancesCreated: 20,
      dribbles: 30,
      dribblesCompleted: 15,
      interceptions: 10,
      tackles: 15,
      dribbledPast: 5,
      clearances: 5,
      groundDuelsWon: 15,
      blockedShots: 2,
      yellowCards: 3,
      yellowToRedCards: 0,
      redCards: 0,
      rating: 8.6,
      source: "legacy",
      updatedAt: "2026-03-31T00:00:00.000Z",
    },
    {
      id: "bellingham:2023-2024:ucl",
      playerId: "bellingham",
      seasonId: "2023-2024",
      clubId: "real_madrid",
      competitionId: "ucl",
      appearances: 10,
      starts: 10,
      minutes: 900,
      goals: 5,
      assists: 4,
      shots: 25,
      shotsOnTarget: 12,
      keyPasses: 10,
      chancesCreated: 10,
      dribbles: 20,
      dribblesCompleted: 8,
      interceptions: 5,
      tackles: 10,
      dribbledPast: 3,
      clearances: 2,
      groundDuelsWon: 10,
      blockedShots: 1,
      yellowCards: 2,
      yellowToRedCards: 0,
      redCards: 0,
      rating: 8.8,
      source: "legacy",
      updatedAt: "2026-03-31T00:00:00.000Z",
    },
    {
      id: "bellingham:2023-2024:copa_del_rey",
      playerId: "bellingham",
      seasonId: "2023-2024",
      clubId: "real_madrid",
      competitionId: "copa_del_rey",
      appearances: 5,
      starts: 5,
      minutes: 450,
      goals: 3,
      assists: 2,
      shots: 15,
      shotsOnTarget: 8,
      keyPasses: 5,
      chancesCreated: 5,
      dribbles: 10,
      dribblesCompleted: 5,
      interceptions: 2,
      tackles: 5,
      dribbledPast: 2,
      clearances: 2,
      groundDuelsWon: 5,
      blockedShots: 1,
      yellowCards: 1,
      yellowToRedCards: 0,
      redCards: 0,
      rating: 8.5,
      source: "legacy",
      updatedAt: "2026-03-31T00:00:00.000Z",
    },
  ],
  playerMatchStats: [],
  playerCareerStats: [
    {
      id: "bellingham",
      playerId: "bellingham",
      appearances: 45,
      starts: 45,
      minutes: 3750,
      goals: 18,
      assists: 14,
      shots: 100,
      shotsOnTarget: 50,
      keyPasses: 35,
      chancesCreated: 35,
      dribbles: 60,
      dribblesCompleted: 28,
      interceptions: 17,
      tackles: 30,
      dribbledPast: 10,
      clearances: 9,
      groundDuelsWon: 30,
      blockedShots: 4,
      yellowCards: 6,
      yellowToRedCards: 0,
      redCards: 0,
      averageRating: 8.6,
      titlesWon: 8,
      awards: 6,
      source: "legacy",
      updatedAt: "2026-03-31T00:00:00.000Z",
    },
  ],
};
```

## What This Means

- `players`, `clubs`, `competitions`, and `seasons` are the top-level reference tables.
- `playerSeasonStats` stores one row per player per season per competition.
- `playerCareerStats` stores the career totals for a player.
- `playerMatchStats` stays empty until match-level data exists.
- The legacy nested structure gets flattened into these row-based records.

## Rule

The app should read this canonical shape long term, not the legacy nested mock shape.
