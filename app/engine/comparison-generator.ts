import { PlayerType } from "../types/players";
import { playerStats } from "../data/playerStats";
import { CareerStats, CompetitionStats, SeasonStats } from "../types/stats";

type MatchupType = "season" | "competition" | "career";
type Matchup = [PlayerType, PlayerType, MatchupType];

type SeasonComparisonMode = {
  kind: "season";
  bestSeasonDate: string;
  bestSeasonId: string | null;
};

type CompetitionComparisonMode = {
  kind: "competition";
  bestSeasonDate: string;
  bestCompetitionId: string | null;
};

type CareerComparisonMode = {
  kind: "career";
  data: CareerStats;
};

type ComparisonModeData =
  | SeasonComparisonMode
  | CompetitionComparisonMode
  | CareerComparisonMode;

type ComparisonResult = {
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

const MULTIPLIER: { spl: number; epl: number; cl: number } = {
  spl: 1.1,
  epl: 1.8,
  cl: 2.5,
};

export function generatePlayersMatchup(players: PlayerType[]) {
  // const alreadyGeneratedSet = new Set();
  const matchups: Matchup[] = [];

  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      matchups.push([players[i], players[j], "season"]);
      matchups.push([players[i], players[j], "competition"]);
      matchups.push([players[i], players[j], "career"]);
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
      return `${comparisonMode.kind}_${comparisonMode.bestSeasonDate}_${comparisonMode.bestSeasonId ?? "none"}`;
    case "competition":
      return `${comparisonMode.kind}_${comparisonMode.bestSeasonDate}_${comparisonMode.bestCompetitionId ?? "none"}`;
    case "career":
      return comparisonMode.kind;
  }
}




function generateComparison(
  playerA: PlayerType,
  playerB: PlayerType,
  comparisonModeA: ComparisonModeData,
  comparisonModeB: ComparisonModeData,
  matchupType: MatchupType,
): ComparisonResult {
  return {
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
  };
}





export function getComparisons(matchups: Matchup[]) {
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

      COMPARISONS.push(
        generateComparison(playerA, playerB, seasonA, seasonB, matchupType),
      );
    }

    if (matchupType === "competition") {
      const competitionA = getTopCompetition(playerA);
      const competitionB = getTopCompetition(playerB);

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
        ),
      );
    }

    if (matchupType === "career") {
      const careerA = getCareer(playerA);
      const careerB = getCareer(playerB);

      if (!careerA || !careerB) {
        continue;
      }

      COMPARISONS.push(
        generateComparison(playerA, playerB, careerA, careerB, matchupType),
      );
    }
  }

  return COMPARISONS;
}




function getTopSeason(player: PlayerType): SeasonComparisonMode | null {
  const playerSeasons =
    playerStats.find((stat) => stat.id === player.id)?.seasons ?? null;
  return findBestSeasonDate(playerSeasons);
}

function getCareer(player: PlayerType): CareerComparisonMode | null {
  const careerStats = playerStats.find((stat) => stat.id === player.id)?.career ?? null;

  if (!careerStats) {
    return null;
  }

  return { kind: "career", data: careerStats };
}

function getTopCompetition(
  player: PlayerType,
): CompetitionComparisonMode | null {
  const playerSeasons =
    playerStats.find((stat) => stat.id === player.id)?.seasons ?? null;
  return findBestCompetition(playerSeasons);
}

function findBestCompetitionStats(comp: CompetitionStats | null) {
  if (!comp) return null;

  const compMultiplier = MULTIPLIER[comp?.id as keyof typeof MULTIPLIER] ?? 1;
  const compScore = getCompetitionStats(compMultiplier, comp)
  // const compScore =
  //   compMultiplier *
  //   (comp.stats?.goals +
  //     0.5 * comp.stats?.assists +
  //     0.1 * comp.stats?.keyPasses +
  //     comp.stats?.minutes / 90);

  return compScore;
}

function calculateCompetitionStats(season: SeasonStats | null) {
  if (!season || season.competitions.length === 0) {
    return { bestCompetitionId: null, bestCompetition: null };
  }

  let bestCompetition = findBestCompetitionStats(season?.competitions[0]) ?? 0;
  let bestCompetitionId = season?.competitions[0].id;
  for (let i = 0; i < season?.competitions.length; i++) {
    let currentComp = findBestCompetitionStats(season?.competitions[i]) ?? 0;
    if (currentComp > bestCompetition) {
      bestCompetition = currentComp;
      bestCompetitionId = season?.competitions[i].id;
    }
  }

  return { bestCompetitionId, bestCompetition };
}

function findBestCompetition(
  seasons: SeasonStats[] | null,
): CompetitionComparisonMode | null {
  if (!seasons || seasons.length === 0) return null;

  let { bestCompetitionId, bestCompetition } = calculateCompetitionStats(
    seasons[0],
  ) ?? { bestCompetitionId: null, bestCompetition: 0 };

  let seasonDateForBestCompetition = seasons[0].season;

  for (let i = 1; i < seasons.length; i++) {
    let {
      bestCompetitionId: currentCompetitionId,
      bestCompetition: currentCompetition,
    } = calculateCompetitionStats(seasons[i]) ?? {
      bestCompetitionId: null,
      bestCompetition: 0,
    };

    if ((currentCompetition ?? -Infinity) > (bestCompetition ?? -Infinity)) {
      bestCompetition = currentCompetition;
      bestCompetitionId = currentCompetitionId;
      seasonDateForBestCompetition = seasons[i].season;
    }
  }

  return {
    kind: "competition",
    bestSeasonDate: seasonDateForBestCompetition,
    bestCompetitionId,
  };
}

function calculateSeasonScore(season: SeasonStats | null) {
  if (!season || season.competitions.length === 0) return 0;

  let seasonScore = 0;

  for (const competition of season.competitions) {
    const compMultiplier =
      MULTIPLIER[competition.id as keyof typeof MULTIPLIER] ?? 1;
    seasonScore += getCompetitionStats(compMultiplier, competition)
  }

  return seasonScore;
}

function findBestSeasonDate(
  seasons: SeasonStats[] | null,
): SeasonComparisonMode | null {
  if (!seasons || seasons.length === 0) return null;

  let bestSeasonDate = seasons[0].season;
  let bestSeasonId = seasons[0]?.clubId ?? null;
  let bestSeasonScore = calculateSeasonScore(seasons[0]);

  for (let i = 1; i < seasons.length; i++) {
    const currentSeasonScore = calculateSeasonScore(seasons[i]);

    if (currentSeasonScore > bestSeasonScore) {
      bestSeasonId = seasons[i].clubId ?? null;
      bestSeasonScore = currentSeasonScore;
      bestSeasonDate = seasons[i].season;
    }
  }

  return { kind: "season", bestSeasonDate, bestSeasonId };
}


function getCompetitionStats(compMultiplier : number, competition: CompetitionStats) {
  return compMultiplier *
      (competition.stats.goals +
        0.5 * competition.stats.assists +
        0.1 * competition.stats.keyPasses +
        competition.stats.minutes / 90);
}
