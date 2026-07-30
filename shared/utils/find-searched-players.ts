import { Player } from "@/shared/types/stats-schema";

export function getSearchedPlayers(
  totalPlayers: Player[],
  query: string,
): Player[] {
  if (!query) return [];

  const normalizedQuery = query.toLowerCase();

  let foundPlayers = totalPlayers.filter((player) =>
    containsAllPlayers(normalizedQuery, player.fullName),
  );

  return foundPlayers;
}

// The retrieval of such players
function containsAllPlayers(input: string, playerName: string): boolean {
  input = input.toLowerCase();
  playerName = playerName.toLowerCase();

  let descriptionList = playerName.split(" ");
  let described = descriptionList.join("");
  let describedReverse = descriptionList.reverse().join("");

  input = input.split(" ").join("");

  return described.startsWith(input) || describedReverse.startsWith(input);
}
