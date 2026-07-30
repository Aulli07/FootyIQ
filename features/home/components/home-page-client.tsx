"use client";

import { useState, type ReactNode } from "react";

import SearchInput from "@/features/search/components/search-bar";
import SearchedPlayerResults from "@/features/search/components/search-player-results";

import { getPlayerSearchResults } from "@/features/search/engine/search-engine";
import { getSuggestedPlayers } from "@/features/players/utils/suggested-players";

export default function HomePageClient({ children }: { children: ReactNode }) {
  const [isSearch, setIsSearch] = useState(false);
  const [focusSearch, setFocusSearch] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  function handleSearch(query: string) {
    const searchResults = getPlayerSearchResults(query);
    setResults(searchResults);
  }

  return (
    <div className="flex flex-col gap-3 px-6">
      <div className="flex flex-col gap-4">
        <SearchInput
          setIsSearch={setIsSearch}
          onSearch={handleSearch}
          setFocusSearch={setFocusSearch}
          isFocusSearch={focusSearch}
        />

        {!isSearch && focusSearch && (
          <SearchedPlayerResults
            data={getSuggestedPlayers().slice(0, 5)}
            resultText="Suggested"
          />
        )}

        {isSearch && (
          <SearchedPlayerResults data={results} resultText="Search Results" />
        )}
      </div>

      {!isSearch && !focusSearch ? children : null}
    </div>
  );
}
