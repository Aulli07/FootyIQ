import { getCanonicalPlayerById } from "@/shared/utils/canonical-lookups";
import { Player } from "@/shared/types/stats-schema";

import { ComparisonStatKey } from "@/features/players/types/comparison-stat-options";
import {
  getAgeOfPlayer,
  getAverageRatingForContext,
  getHeightOfPlayer,
  getStatValueForContext,
} from "@/features/players/selectors/stat-getters";
import { ComparisonType } from "../types/comparison-main-type";
import { compStatRecord } from "../types/comp-image-type";
import { SelectedComparisonContext } from "../types/comp-save-type";

export function buildComparisonCardStats(
  comparison: ComparisonType,
  statKeys: ComparisonStatKey[],
) {
  const leftPlayer = getCanonicalPlayerById(comparison.playerA);
  const rightPlayer = getCanonicalPlayerById(comparison.playerB);
  const leftContext: SelectedComparisonContext = {
    context: comparison.context,
    scope: comparison.scopeA,
    label: "",
  };
  const rightContext: SelectedComparisonContext = {
    context: comparison.context,
    scope: comparison.scopeB,
    label: "",
  };

  return statKeys.reduce(
    (accumulator: compStatRecord, statKey: ComparisonStatKey) => {
      accumulator[statKey] = [
        resolveComparisonStatValue(leftPlayer, leftContext, statKey),
        resolveComparisonStatValue(rightPlayer, rightContext, statKey),
      ];
      return accumulator;
    },
    {} as compStatRecord,
  );
}

type PlayerStatKey = "age" | "height" | "footyRating";

function resolveComparisonStatValue(
  player: Player | null,
  context: SelectedComparisonContext,
  statKey: ComparisonStatKey | PlayerStatKey,
) {
  if (!player) return 0;

  if (statKey === "age") return Number(getAgeOfPlayer(player)) || 0;
  if (statKey === "height") return Number(getHeightOfPlayer(player)) || 0;
  if (statKey === "footyRating") {
    return Number(getAverageRatingForContext(player, context)) || 0;
  }

  return Number(getStatValueForContext(player, context, statKey)) || 0;
}
