import {
  ComparisonThemeType,
  RankingStrategyType,
} from "../types/comparison-theme-type";

import { Player } from "../../../shared/types/stats-schema";
import { PlayerSeasonStats, StrategyScorer } from "../../../shared/types/stats-schema";

import { getCareer, getPlayerCompetitionIds, getCareerRating, getPlayerCompetitions } from "@/shared/utils/canonical-lookups";



export function getPlayersSubset(
  players: Player[],
  theme: ComparisonThemeType,
) {
  const eligiblePlayers = players.filter((player) =>
    matchesTheme(player, theme),
  );

  return [...eligiblePlayers].sort(
    (playerA, playerB) =>
      scorePlayer(playerB, theme) - scorePlayer(playerA, theme),
  );
}

function matchesTheme(player: Player, theme: ComparisonThemeType) {
  const { filters } = theme;
  const career = getCareer(player.id);
  const playerCompetitionIds = getPlayerCompetitionIds(player.id);

  if (
    filters.positions &&
    !filters.positions.includes(player.primaryPosition)
  ) {
    return false;
  }

  if (
    filters.nationalities &&
    !filters.nationalities.includes(player.nationality)
  ) {
    return false;
  }

  if (filters.minRating && getCareerRating(career) < filters.minRating) {
    return false;
  }

  if (
    filters.competitionIds &&
    !filters.competitionIds.some((competitionId: string) =>
      playerCompetitionIds.includes(competitionId),
    )
  ) {
    return false;
  }

  return true;
}

function scorePlayer(player: Player, theme: ComparisonThemeType): number {
  const allCompetitions = getPlayerCompetitions(player.id);
  const career = getCareer(player.id);
  const scorer = strategyScorers[theme.rankingStrategy];

  const relevantCompetitions =
    theme.filters.competitionIds && theme.filters.competitionIds.length > 0
      ? allCompetitions.filter((competition) =>
          theme.filters.competitionIds?.includes(competition.id),
        )
      : allCompetitions;

  return scorer(relevantCompetitions, player, career);
}

const strategyScorers: Record<RankingStrategyType, StrategyScorer> = {
  overall: (competitions, _player, career) =>
    sumCompetitionScore(
      competitions,
      getCareerRating(career),
      (competition) =>
        competition.goals +
        0.7 * competition.assists +
        0.05 * competition.keyPasses,
    ),

  goals_heavy: (competitions, _player, career) =>
    sumCompetitionScore(
      competitions,
      getCareerRating(career),
      (competition) =>
        1.5 * competition.goals +
        0.5 * competition.assists +
        0.1 * competition.shotsOnTarget,
    ),

  creator_heavy: (competitions, _player, career) =>
    sumCompetitionScore(
      competitions,
      getCareerRating(career),
      (competition) =>
        1.5 * competition.assists +
        0.3 * competition.goals +
        0.3 * competition.keyPasses +
        0.3 * competition.chancesCreated,
    ),

  goals_creator_heavy: (competitions, _player, career) =>
    sumCompetitionScore(
      competitions,
      getCareerRating(career),
      (competition) =>
        1.2 * competition.goals +
        1.1 * competition.assists +
        0.3 * competition.keyPasses +
        0.3 * competition.chancesCreated,
    ),

  defense_heavy: (competitions, _player, career) =>
    sumCompetitionScore(
      competitions,
      getCareerRating(career),
      (competition) =>
        competition.tackles +
        0.5 * competition.interceptions +
        0.05 * competition.clearances,
    ),

  career_legacy: (_competitions, _player, career) => {
    if (!career) {
      return 0;
    }

    return (
      career.goals +
      0.7 * career.assists +
      8 * (career.titlesWon ?? 0) +
      12 * (career.awards ?? 0) +
      20 * (career.averageRating ?? 0)
    );
  },
};

function sumCompetitionScore(
  competitions: PlayerSeasonStats[],
  startingScore: number,
  scoreCompetition: (competition: PlayerSeasonStats) => number,
) {
  return competitions.reduce(
    (score, competition) => score + scoreCompetition(competition),
    startingScore,
  );
}
