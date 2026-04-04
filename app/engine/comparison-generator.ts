import { PlayerType } from "../types/players";
import { PlayerCareerStats, PlayerSeasonStats } from "../types/stats-schema";
import { ComparisonTheme } from "../data/comparison-themes";
import {
  getCanonicalPlayerCareerStats,
  getCanonicalPlayerSeasonRows,
  getCanonicalSeasonById,
} from "../data/player-stats/canonical-store";

export type MatchupType = "season" | "competition" | "career" | "club-career";
// type MatchupType = string;
type Matchup = [PlayerType, PlayerType, MatchupType];

type SeasonComparisonMode = {
  kind: "season";
  bestSeasonDate: string;
  bestCompetitionId: string | null;
};

type CompetitionComparisonMode = {
  kind: "competition";
  bestSeasonDate: string;
  bestCompetitionId: string | null;
};

type SeasonGroup = {
  seasonId: string;
  seasonLabel: string;
  rows: PlayerSeasonStats[];
};

type ComparisonModeData = SeasonComparisonMode | CompetitionComparisonMode;
// | CareerComparisonMode;

export type ComparisonResult = {
  theme: ComparisonTheme | "general";
  data: {
    id: string;
    matchupType: MatchupType;
    playerA: {
      id: string;
      name: string;
      comparisonMode: ComparisonModeData;
    };
    playerB: {
      id: string;
      name: string;
      comparisonMode: ComparisonModeData;
    };
  };
};

const MULTIPLIER: { spl: number; epl: number; cl: number } = {
  spl: 1.1,
  epl: 1.8,
  cl: 2.5,
};

export function generatePlayersMatchup(
  players: PlayerType[],
  matchup: MatchupType,
) {
  // const alreadyGeneratedSet = new Set();
  const matchups: Matchup[] = [];

  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      // const index = Math.floor(Math.random() * 3)
      matchups.push([players[i], players[j], matchup]);
      // matchups.push([players[i], players[j], "competition"]);
      // matchups.push([players[i], players[j], "career"]);
    }
  }

  const shuffledMatchups = matchups.sort(() => 0.5 - Math.random());

  return shuffledMatchups.slice(0, 20);
  // while (matchups.length > 2) {
  //   let playerA = getRandomPlayer(players);
  //   let playerB = getRandomPlayer(players);
}

//   if (playerA === playerB) continue;

//   let matchupType = getRandomType<MatchupType>([
//     "season",
//     "competition",
//     "career",
//   ]);

//   let key = `${playerA.id}_${playerB.id}_${matchupType}`;
//   let reverseKey = `${playerB.id}_${playerA.id}_${matchupType}`;

//   if (alreadyGeneratedSet.has(key) || alreadyGeneratedSet.has(reverseKey))
//     continue;

//   matchups.push([playerA, playerB, matchupType]);
//   alreadyGeneratedSet.add(key);
// }

// return matchups;

// function getRandomPlayer(players: PlayerType[]) {
//   return players[Math.floor(Math.random() * players.length)];
// }

function getRandomType<T>(types: T[]) {
  return types[Math.floor(Math.random() * types.length)];
}

function getComparisonModeKey(comparisonMode: ComparisonModeData) {
  switch (comparisonMode.kind) {
    case "season":
      return `${comparisonMode.kind}_${comparisonMode.bestSeasonDate}_${comparisonMode.bestCompetitionId ?? "none"}`;
    case "competition":
      return `${comparisonMode.kind}_${comparisonMode.bestSeasonDate}_${comparisonMode.bestCompetitionId ?? "none"}`;
    // case "career":
    //   return comparisonMode.kind;
  }
}

function generateComparison(
  playerA: PlayerType,
  playerB: PlayerType,
  comparisonModeA: ComparisonModeData,
  comparisonModeB: ComparisonModeData,
  matchupType: MatchupType,
  theme?: ComparisonTheme,
): ComparisonResult {
  return {
    theme: theme ?? "general",
    data: {
      id: `${playerA.id}_${getComparisonModeKey(comparisonModeA)}_vs_${playerB.id}_${getComparisonModeKey(comparisonModeB)}`,
      matchupType,
      playerA: {
        id: playerA.id,
        name: playerA.name,
        comparisonMode: comparisonModeA,
      },
      playerB: {
        id: playerB.id,
        name: playerB.name,
        comparisonMode: comparisonModeB,
      },
    },
  };
}

export function getComparisons(
  matchups: Matchup[],
  theme?: ComparisonTheme,
): ComparisonResult[] {
  const COMPARISONS: ComparisonResult[] = [];

  for (let matchup of matchups) {
    const playerA = matchup[0];
    const playerB = matchup[1];
    const matchupType = matchup[2];

    if (matchupType === "season") {
      const seasonA = getTopSeason(playerA);
      const seasonB = getTopSeason(playerB);

      if (!seasonA || !seasonB) {
        continue;
      }

      // console.log(seasonA, seasonB, matchupType, playerA.name, playerB.name);
      COMPARISONS.push(
        generateComparison(
          playerA,
          playerB,
          seasonA,
          seasonB,
          matchupType,
          theme,
        ),
      );
    }

    if (matchupType === "competition") {
      const competitionA = getTopCompetition(
        playerA,
        theme?.filters.competitionIds,
      );
      const competitionB = getTopCompetition(
        playerB,
        theme?.filters.competitionIds,
      );

      if (!competitionA || !competitionB) {
        continue;
      }

      COMPARISONS.push(
        generateComparison(
          playerA,
          playerB,
          competitionA,
          competitionB,
          matchupType,
          theme,
        ),
      );
    }

    if (matchupType === "club-career") {
      const clubCareerA = getClubCareer(playerA, theme?.filters.competitionIds);
      const clubCaraeerB = getClubCareer(
        playerB,
        theme?.filters.competitionIds,
      );
    }
    // if (matchupType === "career") {
    //   const careerA = getCareer(playerA);
    //   const careerB = getCareer(playerB);

    //   if (!careerA || !careerB) {
    //     continue;
    //   }

    //   COMPARISONS.push(
    //     generateComparison(
    //       playerA,
    //       playerB,
    //       careerA,
    //       careerB,
    //       matchupType,
    //       theme,
    //     ),
    //   );
    // }
  }

  return COMPARISONS;
}

function getTopSeason(player: PlayerType): SeasonComparisonMode | null {
  const playerSeasons = groupPlayerSeasonRows(player.id);
  return findBestSeasonDate(playerSeasons);
}

// function getCareer(player: PlayerType): CareerComparisonMode | null {
//   const careerStats =
//     playerStats.find((stat) => stat.id === player.id)?.career ?? null;

//   if (!careerStats) {
//     return null;
//   }

//   return { kind: "career", data: careerStats };
// }

function getTopCompetition(
  player: PlayerType,
  competitionIds: string[] | undefined,
) {
  const playerSeasons = groupPlayerSeasonRows(player.id, competitionIds);

  if (!playerSeasons.length) {
    return null;
  }

  return findBestCompetition(playerSeasons);
}

function findBestCompetition(
  seasons: SeasonGroup[] | null,
): CompetitionComparisonMode | null {
  if (!seasons || seasons.length === 0) return null;

  let { bestCompetitionId, bestCompetition } = calculateCompetitionStats(
    seasons[0].rows,
  ) ?? { bestCompetitionId: null, bestCompetition: 0 };

  let seasonDateForBestCompetition = seasons[0].seasonLabel;

  for (let i = 1; i < seasons.length; i++) {
    let {
      bestCompetitionId: currentCompetitionId,
      bestCompetition: currentCompetition,
    } = calculateCompetitionStats(seasons[i].rows) ?? {
      bestCompetitionId: null,
      bestCompetition: 0,
    };

    if ((currentCompetition ?? -Infinity) > (bestCompetition ?? -Infinity)) {
      bestCompetition = currentCompetition;
      bestCompetitionId = currentCompetitionId;
      seasonDateForBestCompetition = seasons[i].seasonLabel;
    }
  }

  // console.log(bestCompetitionId, seasonDateForBestCompetition)
  return {
    kind: "competition",
    bestSeasonDate: seasonDateForBestCompetition,
    bestCompetitionId,
  };
}

function calculateCompetitionStats(season: PlayerSeasonStats[] | null) {
  if (!season || season.length === 0) {
    return { bestCompetitionId: null, bestCompetition: null };
  }

  let bestCompetition = findBestCompetitionStats(season[0]) ?? 0;
  let bestCompetitionId = season[0].competitionId;
  for (let i = 0; i < season.length; i++) {
    let currentComp = findBestCompetitionStats(season[i]) ?? 0;
    if (currentComp > bestCompetition) {
      bestCompetition = currentComp;
      bestCompetitionId = season[i].competitionId;
    }
  }

  return { bestCompetitionId, bestCompetition };
}

function findBestCompetitionStats(comp: PlayerSeasonStats | null) {
  if (!comp) return null;

  const compMultiplier =
    MULTIPLIER[comp?.competitionId as keyof typeof MULTIPLIER] ?? 1;
  const compScore = getCompetitionStats(compMultiplier, comp);

  return compScore;
}

function getCompetitionStats(
  compMultiplier: number,
  competition: PlayerSeasonStats,
) {
  return (
    compMultiplier *
    (competition.goals +
      0.5 * competition.assists +
      0.1 * competition.keyPasses +
      competition.minutes / 90)
  );
}

function calculateSeasonScore(season: PlayerSeasonStats[] | null) {
  if (!season || season.length === 0) return 0;

  let seasonScore = 0;

  for (const competition of season) {
    const compMultiplier =
      MULTIPLIER[competition.competitionId as keyof typeof MULTIPLIER] ?? 1;
    seasonScore += getCompetitionStats(compMultiplier, competition);
  }

  return seasonScore;
}

function findBestSeasonDate(
  seasons: SeasonGroup[] | null,
): SeasonComparisonMode | null {
  if (!seasons || seasons.length === 0) return null;

  let bestSeasonDate = seasons[0].seasonLabel;
  let bestCompetitionId = seasons[0]?.rows[0]?.competitionId ?? null;
  let bestSeasonScore = calculateSeasonScore(seasons[0].rows);

  for (let i = 1; i < seasons.length; i++) {
    const currentSeasonScore = calculateSeasonScore(seasons[i].rows);

    if (currentSeasonScore > bestSeasonScore) {
      bestCompetitionId = seasons[i].rows[0]?.competitionId ?? null;
      bestSeasonScore = currentSeasonScore;
      bestSeasonDate = seasons[i].seasonLabel;
    }
  }

  return { kind: "season", bestSeasonDate, bestCompetitionId };
}

function getClubCareer(
  player: PlayerType,
  competitionIds: string[] | undefined,
) {
  const career = getCanonicalPlayerCareerStats(player.id);

  if (!career || !competitionIds) {
    return null;
  }

  return career;
}

function groupPlayerSeasonRows(
  playerId: string,
  competitionIds?: string[],
): SeasonGroup[] {
  const playerRows = getCanonicalPlayerSeasonRows(playerId).filter((row) =>
    competitionIds && competitionIds.length > 0
      ? competitionIds.includes(row.competitionId)
      : true,
  );

  const seasonMap = new Map<string, PlayerSeasonStats[]>();

  playerRows.forEach((row) => {
    const existing = seasonMap.get(row.seasonId) ?? [];
    existing.push(row);
    seasonMap.set(row.seasonId, existing);
  });

  return Array.from(seasonMap.entries()).map(([seasonId, rows]) => ({
    seasonId,
    seasonLabel: getCanonicalSeasonById(seasonId)?.label ?? seasonId,
    rows,
  }));
}
