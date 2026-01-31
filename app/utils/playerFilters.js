import { players } from "../data/players";
import { playerStats } from "../data/playerStats";

const playersById = Object.fromEntries(
  players.map((player) => [player.id, player]),
);

export function getTotalComparisons(playersList) {
  const searchesList = [];

  for (let i = 0; i < playersList.length; i++) {
    for (let j = i + 1; j < playersList.length; j++) {
      const comparedPerson = playersList[i];
      const toComparePerson = playersList[j];

      searchesList.push([comparedPerson, toComparePerson]);
    }
  }

  return searchesList;
}

export function computeLegends(statsList = playerStats) {
  return statsList
    .filter((stats) => {
      const player = playersById[stats.id];
      if (!player) return false;

      return (
        stats.career.averageRating >= 9.0 &&
        stats.career.totalGoals >= 500 &&
        player.age >= 28
      );
    })
    .map((stats) => playersById[stats.id])
    .filter(Boolean);
}

export function computeHotProspects(statsList = playerStats) {
  return statsList
    .filter((stats) => {
      const player = playersById[stats.id];
      if (!player) return false;

      return (
        stats.career.averageRating >= 8.0 &&
        stats.career.totalGoals >= 70 &&
        player.age < 28
      );
    })
    .map((stats) => playersById[stats.id])
    .filter(Boolean);
}

export function filterSearchedPlayers(input) {
  input = input.toLowerCase();

  let foundPlayers = players.filter((player) =>
    containsAllPlayers(input, player.name),
  );

  return foundPlayers;
}

// The retrieval of such players
function containsAllPlayers(input, description) {
  input = input.toLowerCase();
  description = description.toLowerCase();

  let descriptionList = description.split(" ");
  return descriptionList.some((text) => text.startsWith(input));
}
