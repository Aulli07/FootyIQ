import { players } from "../data/players";
import { playerStats } from "../data/playerStats";

import { AllTalks } from "../data/talks";


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

export const timeAgo = (date) => {
  const elapsedInMinutes = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / (1000 * 60),
  );

  if (elapsedInMinutes < 60) return `${Math.max(elapsedInMinutes, 1)}m`;
  if (elapsedInMinutes < 1440) return `${Math.floor(elapsedInMinutes / 60)}h`;
  return `${Math.floor(elapsedInMinutes / 1440)}d`;
};

export function getLegends() {
  const legendsList = computeLegends(playerStats);
  const legendsComparisons = getTotalComparisons(legendsList);
  return legendsComparisons;
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

export function getHotProspects() {
  const hotProspectsList = computeHotProspects(playerStats);
  const hotProspectsComparisons = getTotalComparisons(hotProspectsList);
  return hotProspectsComparisons;
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

export function getPostsInDiscussion(leftPlayer, rightPlayer) {
  const postsInDiscussion = AllTalks.filter(
    (post) =>
      post.playersInDiscussion.includes(leftPlayer?.name || "") &&
      post.playersInDiscussion.includes(rightPlayer?.name || ""),
  );

  return postsInDiscussion;
}
