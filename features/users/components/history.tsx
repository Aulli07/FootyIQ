import { useState } from "react";

import { QualityComparisonType } from "@/features/compare/types/comparison-main-type";
import { getStoredComparisons } from "@/features/compare/services/comparison-storage";
import { handleSearch } from "@/features/compare/utils/history-search-handler";
import TopComparisonCard from "@/features/compare/components/top-comparison-card";

import SearchBar from "@/features/search/components/search-bar";



export const History = () => {
  const currentHistory = getStoredComparisons();

  const [, setIsSearch] = useState(false);
  const [results, setResults] = useState<Record<string, QualityComparisonType>>(
    () => currentHistory,
  );

  function handleHistorySearch(query: string) {
    const searchedResults = handleSearch(query);

    if (!query.trim()) {
      setResults(currentHistory);
      return;
    }
    setResults(searchedResults);
  }

  if (Array.from(Object.values(currentHistory)).length === 0) {
    return (
      <div className="flex flex-col gap-3 items-center justify-center mt-10">
        <p>No comparison history available.</p>
      </div>
    );
  }

  const compHistory = Object.values(results);

  return (
    <main className="w-full pt-2 text-light-text-primary dark:text-dark-text-primary flex flex-col gap-5">
      <SearchBar
        setIsSearch={setIsSearch}
        // isSearch={isSearch}
        onSearch={handleHistorySearch}
      />

      <div className="flex flex-col gap-3">
        {compHistory.map(comp => {
          return (
            <TopComparisonCard
              key={comp.id}
              id={comp.id}
              comp={comp}
              showAnalytics={false}
            />
          );
        })}
      </div>
    </main>
  );
};