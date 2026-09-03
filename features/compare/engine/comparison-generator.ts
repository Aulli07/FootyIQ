import {
  Player,
  PlayerCareerStats,
  PlayerSeasonStats,
} from "@/shared/types/stats-schema";
import {
  getCanonicalPlayerCareerStats,
  getCanonicalPlayerSeasonStats,
  getCanonicalSeasonById,
} from "@/shared/utils/canonical-lookups";

import { ComparisonThemeType } from "@/features/compare/types/comparison-theme-type";
import {
  ComparisonMatchupArrayType,
  ComparisonMatchupType,
  ComparisonType,
} from "@/features/compare/types/comparison-main-type";
import { SeasonGroup } from "../types/comp-generator-type";
import { MULTIPLIER } from "../data/comp-multiplier";

export function generateAllComparisons(
  matchups: ComparisonMatchupArrayType[],
  theme: ComparisonThemeType,
  comparisonId: string,
): ComparisonType[] {
  const COMPARISONS: ComparisonType[] = [];

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
        generateComparison(
          playerA,
          playerB,
          seasonA,
          seasonB,
          matchupType,
          theme,
          comparisonId,
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
          comparisonId,
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
        generateComparison(
          playerA,
          playerB,
          careerA,
          careerB,
          matchupType,
          theme,
          comparisonId,
        ),
      );
    }
  }

  return COMPARISONS;
}

function getTopSeason(player: Player): string | null {
  const playerSeasons = groupPlayerSeasonRows(player.id);
  return findBestSeasonDate(playerSeasons);
}

function groupPlayerSeasonRows(playerId: string): SeasonGroup[] {
  const playerSeasonRows = getCanonicalPlayerSeasonStats(playerId);
  const seasonMap = new Map<string, PlayerSeasonStats[]>();

  playerSeasonRows.forEach((row) => {
    const existing = seasonMap.get(row.seasonId) ?? [];
    existing.push(row);
    seasonMap.set(row.seasonId, existing);
  });

  return Array.from(seasonMap.entries()).map(([seasonId, totalSeasonRows]) => ({
    seasonId,
    seasonLabel: getCanonicalSeasonById(seasonId)?.label ?? seasonId,
    totalSeasonRows,
  }));
}

function findBestSeasonDate(seasons: SeasonGroup[] | null): string | null {
  if (!seasons || seasons.length === 0) return null;

  let bestSeasonDate = seasons[0].seasonLabel;
  let bestCompetitionId = seasons[0]?.totalSeasonRows[0]?.competitionId ?? null;
  let bestSeasonScore = calculateSeasonScore(seasons[0].totalSeasonRows);

  for (let i = 1; i < seasons.length; i++) {
    const currentSeasonScore = calculateSeasonScore(seasons[i].totalSeasonRows);

    if (currentSeasonScore > bestSeasonScore) {
      bestCompetitionId = seasons[i].totalSeasonRows[0]?.competitionId ?? null;
      bestSeasonScore = currentSeasonScore;
      bestSeasonDate = seasons[i].seasonLabel;
    }
  }

  return bestSeasonDate;
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

function getTopCompetition(
  player: Player,
  competitionIds: string[] | undefined,
): string | null {
  const playerCompetitions = getPlayerCompetitionRows(
    player.id,
    competitionIds,
  );

  if (!playerCompetitions.length) {
    return null;
  }
  return findBestCompetition(playerCompetitions);
}

function getPlayerCompetitionRows(
  playerId: string,
  competitionIds?: string[],
): PlayerSeasonStats[] {
  const playerCompetitionRows = getCanonicalPlayerSeasonStats(playerId).filter(
    (row) =>
      competitionIds && competitionIds.length > 0
        ? competitionIds.includes(row.competitionId)
        : true,
  );

  return playerCompetitionRows;
}

function findBestCompetition(
  competitions: PlayerSeasonStats[] | null,
): string | null {
  if (!competitions || competitions.length === 0) return null;

  let { bestCompetitionId, bestCompetition } = calculateCompetitionStats(
    competitions[0],
  ) ?? { bestCompetitionId: null, bestCompetition: 0 };

  let seasonDateForBestCompetition =
    getCanonicalSeasonById(competitions[0].seasonId)?.label ??
    competitions[0].seasonId;

  for (let i = 1; i < competitions.length; i++) {
    let {
      bestCompetitionId: currentCompetitionId,
      bestCompetition: currentCompetition,
    } = calculateCompetitionStats(competitions[i]) ?? {
      bestCompetitionId: null,
      bestCompetition: 0,
    };

    if ((currentCompetition ?? -Infinity) > (bestCompetition ?? -Infinity)) {
      bestCompetition = currentCompetition;
      bestCompetitionId = currentCompetitionId;
      seasonDateForBestCompetition =
        getCanonicalSeasonById(competitions[i].seasonId)?.label ??
        competitions[i].seasonId;
    }
  }

  return `${bestCompetitionId} ${seasonDateForBestCompetition}`;
}

function calculateCompetitionStats(competition: PlayerSeasonStats | null) {
  if (!competition) {
    return { bestCompetitionId: null, bestCompetition: null };
  }

  const compMultiplier =
    MULTIPLIER[competition?.competitionId as keyof typeof MULTIPLIER] ?? 1;
  const bestCompetition = getCompetitionStats(compMultiplier, competition);
  const bestCompetitionId = competition.competitionId;

  return { bestCompetitionId, bestCompetition };
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

function getCareer(player: Player): string | null {
  const playerCareerStats = getCanonicalPlayerCareerStats(
    player.id,
  ) as PlayerCareerStats | null;

  if (!playerCareerStats) {
    return null;
  }
  return "CAREER";
}

function generateComparison(
  playerA: Player,
  playerB: Player,
  contextA: string,
  contextB: string,
  matchupType: ComparisonMatchupType,
  theme: ComparisonThemeType,
  cmpId: string,
): ComparisonType {
  return {
    comparisonId: cmpId,

    themeId: theme.id,
    themeTitle: theme.title,

    matchupType,

    playerA: playerA.id,
    playerB: playerB.id,
    contextA: contextA,
    contextB: contextB,

    source: "precomputed",

    timestamp: Date.now(),
  };
}
