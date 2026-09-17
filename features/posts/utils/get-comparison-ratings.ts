import { ComparisonType } from "@/features/compare/types/comparison-main-type";
import { SelectedComparisonContext } from "@/features/compare/types/comp-save-type";
import { getAverageRatingForContext } from "@/features/players/selectors/stat-getters";
import { getCanonicalPlayerById } from "@/shared/utils/canonical-lookups";
import { getComparisonById } from "@/features/compare/selectors/get-comparison-by-id";

function createComparisonContext(
  comparison: ComparisonType,
  scope: SelectedComparisonContext["scope"],
): SelectedComparisonContext {
  return {
    context: comparison.context,
    scope,
    label: "",
  };
}

/** Returns the Footy IQ ratings for both players in a saved comparison. */
export function getComparisonRatings(
  comparisonId: string,
): [number, number] {

  const comparison = getComparisonById(comparisonId);
  if (!comparison) return [0, 0];
  
  const leftPlayer = getCanonicalPlayerById(comparison.playerA);
  const rightPlayer = getCanonicalPlayerById(comparison.playerB);
  const leftContext = createComparisonContext(comparison, comparison.scopeA);
  const rightContext = createComparisonContext(comparison, comparison.scopeB);

  return [
    Number(getAverageRatingForContext(leftPlayer, leftContext)) || 0,
    Number(getAverageRatingForContext(rightPlayer, rightContext)) || 0,
  ];
}
