/* Import all players' biodata and the type for each player */
import { Player } from "@/shared/types/stats-schema";

import {
  ComparisonMatchupType,
  ComparisonMatchupArrayType,
} from "../types/comparison-main-type";

export function generatePlayersMatchup(
  players: Player[],
  matchup: ComparisonMatchupType,
  matchCount = 20,
) {
  const shuffledPlayers = [...players].sort(() => 0.5 - Math.random());
  const matchups: ComparisonMatchupArrayType[] = [];
  const allPairs: ComparisonMatchupArrayType[] = [];

  for (let i = 0; i < shuffledPlayers.length; i++) {
    for (let j = i + 1; j < shuffledPlayers.length; j++) {
      const playerA = shuffledPlayers[i];
      const playerB = shuffledPlayers[j];

      if (!playerA || !playerB) {
        continue;
      }

      allPairs.push([playerA, playerB, matchup]);
    }
  }

  const shuffledPairs = allPairs.sort(() => 0.5 - Math.random());

  for (
    let i = 0;
    i < shuffledPairs.length && matchups.length < matchCount;
    i++
  ) {
    matchups.push(shuffledPairs[i]);
  }

  return matchups;
}
