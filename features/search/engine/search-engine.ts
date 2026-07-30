import exactPlayerMap from "@/features/search/data/exact-lookup-map.json";
import tokenPlayerMap from "@/features/search/data/prefix-lookup-map.json";
import prefixPlayerMap from "@/features/search/data/token-lookup-map.json";

import { getCanonicalPlayerById } from "@/shared/utils/canonical-lookups";

import { normalizeLabel } from "@/features/compare/services/save-compare-comparison";

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
  const fallbackPrefixResults = prefixPlayerSearchMap[query.slice(0, 3)] ?? [];

  fallbackPrefixResults.forEach((playerId) => {
    let player = getCanonicalPlayerById(playerId)?.fullName;
    if (!player) return [];

    if (normalizeLabel(player!).includes(query)) {
      if (!results.flat().includes(playerId)) {
        results.push([playerId, 20]);
      }
    }
  });

  return results;
}

function sortPlayersByRelevance(searchResults: Array<[string, number]>) {
  const sortedResults = [...searchResults].sort((a, b) => b[1] - a[1]);
  const sortedPlayerResults = sortedResults.map((result) => result[0]);
  return sortedPlayerResults;
}
