import { players } from "../data/players";
import { playerStats } from "../data/playerStats";

import { AllTalks } from "../data/posts";
import { follows } from "../data/follows";

export function getFollowers(userId) {
  const followingIds = follows
    .filter((f) => f.followerId === userId)
    .map((f) => f.followingId);

  const followerIds = follows
    .filter((f) => f.followingId === userId)
    .map((f) => f.followerId);

  return { followingIds, followerIds };
}

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

export function getSearchedPlayers(totalPlayers, query) {
  if (!query) return [];

  const normalizedQuery = query.toLowerCase();

  let foundPlayers = totalPlayers.filter((player) =>
    containsAllPlayers(normalizedQuery, player.name),
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

export function foundComparisons(totalComparedPlayers, foundPlayers) {
  const comparisons = [];

  foundPlayers.forEach((player) => {
    totalComparedPlayers.forEach((compares) => {
      const left = compares[0];
      const right = compares[1];

      if (player.id === left.id || player.id === right.id) {
        comparisons.push(compares);
      }
    });
  });

  return comparisons;
}

export function statsByPostId(stats) {
  return stats.reduce((acc, stat) => {
    acc[stat.postId] = (acc[stat.postId] ?? 0 ) + 1;
    return acc
  }, {})
}
