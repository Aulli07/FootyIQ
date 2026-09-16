import exactPlayerMap from "../data/exact-lookup-map.json";
import tokenPlayerMap from "../data/token-lookup-map.json";
import prefixPlayerMap from "../data/prefix-lookup-map.json";

import { canonicalPlayers } from "@/shared/utils/canonical-lookups";
import { normalizeLabel } from "@/shared/utils/identity";

/* We need to type the imports before usage */
const exactPlayerSearchMap = exactPlayerMap as Record<string, string[]>;
const tokenPlayerSearchMap = tokenPlayerMap as Record<string, string[]>;
const prefixPlayerSearchMap = prefixPlayerMap as Record<string, string[]>;




export function getPlayerSearchResults(query: string): string[] {
  const searchQuery = normalizeLabel(query);

  let searchResults: Array<[string, number]> = [];
  if (!searchQuery || searchQuery.length < 2 || Number.isNaN(searchQuery)) {
    return [];
  }

  if (exactPlayerSearchMap[searchQuery]) {
    getSearchResultsFromExactQuery(searchQuery, searchResults);
  }

  if (tokenPlayerSearchMap[searchQuery]) {
    getSearchResultsFromTokenQuery(searchQuery, searchResults);
  }

  if (prefixPlayerSearchMap[searchQuery]) {
    getSearchResultsFromPrefixQuery(searchQuery, searchResults);
  }

  getSearchResultsFromFallbackQuery(searchQuery, searchResults);

  const sortedFullResults: string[] = sortPlayersByRelevance(searchResults);
  return sortedFullResults;
}

function getSearchResultsFromExactQuery(
  query: string,
  results: Array<[string, number]>,
) {
  exactPlayerSearchMap[query].forEach((playerId) => {
    if (!results.flat().includes(playerId)) {
      results.push([playerId, 100]);
    }
  });
  return results;
}

function getSearchResultsFromTokenQuery(
  query: string,
  results: Array<[string, number]>,
) {
  tokenPlayerSearchMap[query].forEach((playerId) => {
    if (!results.flat().includes(playerId)) {
      results.push([playerId, 80]);
    }
  });
  return results;
}

function getSearchResultsFromPrefixQuery(
  query: string,
  results: Array<[string, number]>,
) {
  prefixPlayerSearchMap[query].forEach((playerId) => {
    if (!results.flat().includes(playerId)) {
      results.push([playerId, 50]);
    }
  });
  return results;
}

function getSearchResultsFromFallbackQuery(
  query: string,
  results: Array<[string, number]>,
) {
  // The lookup maps make common searches fast, but the canonical store is the
  // source of truth. Searching it here keeps every player dropdown accurate
  // even when a lookup file has not yet been regenerated.
  canonicalPlayers.forEach((player) => {
    if (
      normalizeLabel(player.fullName).includes(query) &&
      !results.flat().includes(player.id)
    ) {
      results.push([player.id, 20]);
    }
  });

  return results;
}

function sortPlayersByRelevance(searchResults: Array<[string, number]>) {
  const sortedResults = [...searchResults].sort((a, b) => b[1] - a[1]);
  const sortedPlayerResults = sortedResults.map((result) => result[0]);
  return sortedPlayerResults;
}
