import { getCanonicalPlayerById } from "@/shared/utils/canonical-lookups";
import { Player } from "@/shared/types/stats-schema";

import { ComparisonType } from "../types/comparison-main-type";
import { compStatRecord } from "../types/comp-image-type";

import { ComparisonStatKey } from "@/features/players/types/comparison-stat-options";
import {
  getAgeOfPlayer,
  getHeightOfPlayer,
  getAverageRatingOfPlayerBasedOnCareer,
  getAverageRatingOfPlayerBasedOnCompetitionAndSeason,
  getAverageRatingOfPlayerBasedOnSeason,
  getStatValueBasedOnCareer,
  getStatValueBasedOnCompetitionAndSeason,
  getStatValueBasedOnSeason
} from "@/features/players/selectors/stat-getters";



export function buildComparisonCardStats(
  comparison: ComparisonType,
  statKeys: ComparisonStatKey[],
) {
  const leftPlayer = getCanonicalPlayerById(comparison.playerA);
  const rightPlayer = getCanonicalPlayerById(comparison.playerB);

  return statKeys.reduce(
    (accumulator: compStatRecord, statKey: ComparisonStatKey) => {
      const leftValue = resolveComparisonStatValue(
        leftPlayer,
        comparison.contextA,
        statKey,
      );
      const rightValue = resolveComparisonStatValue(
        rightPlayer,
        comparison.contextB,
        statKey,
      );

      accumulator[statKey] = [leftValue, rightValue];
      return accumulator;
    },
    {} as compStatRecord,
  );
}

function resolveComparisonStatValue(
  player: Player | null,
  context: string,
  statKey: ComparisonStatKey,
) {
  if (!player) {
    return 0;
  }

  if (statKey === "age") {
    return Number(getAgeOfPlayer(player)) || 0;
  }

  if (statKey === "height") {
    return Number(getHeightOfPlayer(player)) || 0;
  }

  if (statKey === "footyRating") {
    const rating = resolveRatingValue(player, context);
    return Number(rating) || 0;
  }

  const rawValue = resolveStatValue(player, context, statKey);
  return Number(rawValue) || 0;
}

function resolveRatingValue(player: Player, context: string) {
  const trimmedContext = context.trim().toLowerCase();

  if (trimmedContext === "career" || trimmedContext === "all-time") {
    return getAverageRatingOfPlayerBasedOnCareer(player);
  }

  if (context.trim().split(/\s+/).length >= 2) {
    return getAverageRatingOfPlayerBasedOnCompetitionAndSeason(player, context);
  }

  return getAverageRatingOfPlayerBasedOnSeason(player, context);
}

function resolveStatValue(
  player: Player,
  context: string,
  statKey: ComparisonStatKey,
) {
  const trimmedContext = context.trim().toLowerCase();

  if (trimmedContext === "career" || trimmedContext === "all-time") {
    return getStatValueBasedOnCareer(player, statKey);
  }

  if (context.trim().split(/\s+/).length >= 2) {
    return getStatValueBasedOnCompetitionAndSeason(player, context, statKey);
  }

  return getStatValueBasedOnSeason(player, context, statKey);
}
