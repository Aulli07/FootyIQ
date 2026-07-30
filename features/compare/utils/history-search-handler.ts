import {
  ComparisonStoredType,
  ComparisonType,
} from "@/features/compare/types/comparison-main-type";
import { buildHydratedComparisonStore } from "@/features/compare/engine/comparison-store";
import { getCanonicalPlayersByIds } from "@/shared/utils/canonical-lookups";

import { getSearchedPlayers } from "@/shared/utils/find-searched-players";
import { getHistoryOfComparisons } from "@/features/compare/selectors/get-history-comparisons";

export function handleSearch(query: string): ComparisonStoredType {
  const hydratedHistory = buildHydratedComparisonStore();
  const historyArray = Object.values(hydratedHistory) as ComparisonType[];

  const historyPlayerIds = historyArray
    .map((comparison) => [comparison.playerA, comparison.playerB])
    .flat();
  const historyPlayers = getCanonicalPlayersByIds(historyPlayerIds);

  const foundPlayers = getSearchedPlayers(historyPlayers, query);
  const fetchedComparisons = getHistoryOfComparisons(foundPlayers);

  return fetchedComparisons;
}
