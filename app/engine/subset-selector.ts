import { allPlayerStatsLegacy as playerStats } from "../data/stats";
import {
  ComparisonTheme,
  RankingStrategyType,
} from "../data/comparison-themes";
import { PlayerType } from "../types/players";
import { CareerStats, CompetitionStats } from "../types/stats";

function getPlayerCompetitionIds(playerId: string) {
  const playerStatRecord = playerStats.find((stat) => stat.id === playerId);

  if (!playerStatRecord) {
    return [];
  }

  return playerStatRecord.seasons.flatMap((season) =>
    season.competitions.map((competition: CompetitionStats) => competition.id),
  );
}

function matchesTheme(player: PlayerType, theme: ComparisonTheme) {
  const { filters } = theme;
  const playerCompetitionIds = getPlayerCompetitionIds(player.id);

  if (filters.categories && !filters.categories.includes(player.category())) {
    return false;
  }

  if (filters.positions && !filters.positions.includes(player.position)) {
    return false;
  }

  if (filters.statuses && !filters.statuses.includes(player.status)) {
    return false;
  }

  if (
    filters.nationalities &&
    !filters.nationalities.includes(player.nationality)
  ) {
    return false;
  }

  if (filters.minRating && player.footyRating < filters.minRating) {
    return false;
  }

  if (filters.minSearches && player.totalSearches < filters.minSearches) {
    return false;
  }

  if (filters.minVotes && player.totalVotes < filters.minVotes) {
    return false;
  }

  if (
    filters.competitionIds &&
    !filters.competitionIds.some((competitionId) =>
      playerCompetitionIds.includes(competitionId),
    )
  ) {
    return false;
  }

  return true;
}

function getPlayerCompetitions(playerId: string): CompetitionStats[] {
  const playerStatRecord = playerStats.find((stat) => stat.id === playerId);

  if (!playerStatRecord) {
    return [];
  }

  return playerStatRecord.seasons.flatMap((season) => season.competitions);
}

type StrategyScorer = (
  competitions: CompetitionStats[],
  player: PlayerType,
  career?: CareerStats,
) => number;

const strategyScorers: Record<RankingStrategyType, StrategyScorer> = {
  overall: (competitions, player) =>
    competitions.reduce(
      (score, competition) =>
        score +
        competition.stats.goals +
        0.7 * competition.stats.assists +
        0.05 * competition.stats.keyPasses,
      player.footyRating,
    ),

  goals_heavy: (competitions, player) =>
    competitions.reduce(
      (score, competition) =>
        score +
        1.5 * competition.stats.goals +
        0.5 * competition.stats.assists +
        0.1 * competition.stats.shotsOnTarget,
      player.footyRating,
    ),

  creator_heavy: (competitions, player) =>
    competitions.reduce(
      (score, competition) =>
        score +
        1.5 * competition.stats.assists +
        0.3 * competition.stats.goals +
        0.3 * competition.stats.keyPasses +
        0.3 * competition.stats.chancesCreated,
      player.footyRating,
    ),

  goals_creator_heavy: (competitions, player) =>
    competitions.reduce(
      (score, competition) =>
        score +
        1.2 * competition.stats.goals +
        1.1 * competition.stats.assists +
        0.3 * competition.stats.keyPasses +
        0.3 * competition.stats.chancesCreated,
      player.footyRating,
    ),

  defense_heavy: (competitions, player) =>
    competitions.reduce(
      (score, competition) =>
        score +
        competition.stats.tackles +
        0.5 * competition.stats.interceptions +
        0.05 * competition.stats.clearances,
      player.footyRating,
    ),

  career_legacy: (_competitions, player, career) => {
    if (!career) {
      return player.footyRating;
    }

    return (
      career.totalGoals +
      0.7 * career.totalAssists +
      8 * career.titlesWon +
      12 * career.awards +
      20 * career.averageRating
    );
  },
};

function scorePlayer(player: PlayerType, theme: ComparisonTheme): number {
  const allCompetitions = getPlayerCompetitions(player.id);

  const relevantCompetitions =
    theme.filters.competitionIds && theme.filters.competitionIds.length > 0
      ? allCompetitions.filter((competition) =>
          theme.filters.competitionIds?.includes(competition.id),
        )
      : allCompetitions;

  const career = playerStats.find((stat) => stat.id === player.id)?.career;
  const scorer = strategyScorers[theme.rankingStrategy];

  return scorer(relevantCompetitions, player, career);
}

export function getPlayersSubset(
  players: PlayerType[],
  theme: ComparisonTheme,
) {
  const eligiblePlayers = players.filter((player) =>
    matchesTheme(player, theme),
  );

  return [...eligiblePlayers].sort(
    (playerA, playerB) =>
      scorePlayer(playerB, theme) - scorePlayer(playerA, theme),
  );
}
