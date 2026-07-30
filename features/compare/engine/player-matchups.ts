/* Import all players' biodata and the type for each player */
import { Player } from "@/shared/types/stats-schema";

import {
  ComparisonMatchupType,
  ComparisonMatchupArrayType,
} from "@/features/compare/types/comparison-main-type";

export function generatePlayersMatchup(
  players: Player[],
  matchup: ComparisonMatchupType,
  matchCount = 20,
) {
  const shuffledPlayers = players.sort(() => 0.5 - Math.random());

  const matchups: ComparisonMatchupArrayType[] = [];

  for (
    let i = 0;
    i < shuffledPlayers.length && matchups.length < matchCount;
    i += 2
  ) {
    const playerA = shuffledPlayers[i];
    const playerB = shuffledPlayers[i + 1];

    if (!playerA || !playerB) {
      continue;
    }

    matchups.push([playerA, playerB, matchup]);
  }

  return matchups;
}
