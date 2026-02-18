import { useMemo } from "react";
import type { ReactNode } from "react";

import { filterSearchedPlayers } from "../app/utils/playerFilters";
import type { PlayerType } from "../app/types/players";

export function GetSearchedPlayers({
  query,
  children,
}: {
  query: string;
  children: (players: Array<PlayerType>) => ReactNode;
}) {
  const normalizedQuery = query.trim();

  const foundPlayers = useMemo(() => {
    if (normalizedQuery === "") return [];
    return filterSearchedPlayers(normalizedQuery);
  }, [normalizedQuery]);

  return <>{children(foundPlayers)}</>;
}
