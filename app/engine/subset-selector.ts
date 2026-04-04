import {
  getCanonicalPlayerCareerStats,
  getCanonicalPlayerCompetitionIds,
  getCanonicalPlayerSeasonRows,
} from "../data/player-stats/canonical-store";
import {
  ComparisonTheme,
  RankingStrategyType,
} from "../data/comparison-themes";
import { PlayerType } from "../types/players";
import { PlayerCareerStats, PlayerSeasonStats } from "../types/stats-schema";

function getPlayerCompetitionIds(playerId: string) {
  return getCanonicalPlayerCompetitionIds(playerId);
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

function getPlayerCompetitions(playerId: string): PlayerSeasonStats[] {
  return getCanonicalPlayerSeasonRows(playerId);
}

type StrategyScorer = (
  competitions: PlayerSeasonStats[],
  player: PlayerType,
  career?: PlayerCareerStats | null,
) => number;

const strategyScorers: Record<RankingStrategyType, StrategyScorer> = {
  overall: (competitions, player) =>
    competitions.reduce(
      (score, competition) =>
        score +
        competition.goals +
        0.7 * competition.assists +
        0.05 * competition.keyPasses,
      player.footyRating,
    ),

  goals_heavy: (competitions, player) =>
    competitions.reduce(
      (score, competition) =>
        score +
        1.5 * competition.goals +
        0.5 * competition.assists +
        0.1 * competition.shotsOnTarget,
      player.footyRating,
    ),

  creator_heavy: (competitions, player) =>
    competitions.reduce(
      (score, competition) =>
        score +
        1.5 * competition.assists +
        0.3 * competition.goals +
        0.3 * competition.keyPasses +
        0.3 * competition.chancesCreated,
      player.footyRating,
    ),

  goals_creator_heavy: (competitions, player) =>
    competitions.reduce(
      (score, competition) =>
        score +
        1.2 * competition.goals +
        1.1 * competition.assists +
        0.3 * competition.keyPasses +
        0.3 * competition.chancesCreated,
      player.footyRating,
    ),

  defense_heavy: (competitions, player) =>
    competitions.reduce(
      (score, competition) =>
        score +
        competition.tackles +
        0.5 * competition.interceptions +
        0.05 * competition.clearances,
      player.footyRating,
    ),

  career_legacy: (_competitions, player, career) => {
    if (!career) {
      return player.footyRating;
    }

    return (
      career.goals +
      0.7 * career.assists +
      8 * (career.titlesWon ?? 0) +
      12 * (career.awards ?? 0) +
      20 * (career.averageRating ?? player.footyRating)
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

  const career = getCanonicalPlayerCareerStats(player.id);
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
