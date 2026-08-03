import { PlayerFullAnalyticsType } from "../types/search-analytics-type";

const PLAYER_ANALYTICS_KEY = "player-analytics-storage";



export function notifyPlayerAnalyticsChanged() {
  if (typeof window === "undefined") {
    return;
  }
  window.dispatchEvent(new Event("player-analytics-updated"));
}

export function manageAnalyticsOfPlayersInStorage(entry: string) {
  const playerAnalyticsHistory = getStoredAnalyticsOfPlayers();

  if (!playerAnalyticsHistory[entry]) {
    storeAnalyticsOfPlayer(entry, playerAnalyticsHistory);
  }

  incrementSearchCountOfPlayer(entry, playerAnalyticsHistory);
  incrementViewCountOfPlayer(entry, playerAnalyticsHistory);

  localStorage.setItem(PLAYER_ANALYTICS_KEY, JSON.stringify(playerAnalyticsHistory));
  notifyPlayerAnalyticsChanged();

  return entry;
}

export function incrementViewCountOfPlayer(
  entry: string,
  analyticsHistory: PlayerFullAnalyticsType,
) {
  analyticsHistory[entry].viewCount = (analyticsHistory[entry].viewCount || 0) + 1;
}

export function incrementSearchCountOfPlayer(
  entry: string,
  analyticsHistory: PlayerFullAnalyticsType,
) {
  analyticsHistory[entry].searchCount = (analyticsHistory[entry].searchCount || 0) + 1;

  return entry;
}

export function storeAnalyticsOfPlayer(
  entry: string,
  playerAnalyticsHistory: PlayerFullAnalyticsType,
) {
  playerAnalyticsHistory[entry] = {
    playerId: entry,
    searchCount: 0,
    viewCount: 0,
  };
}

export function getStoredAnalyticsOfPlayers(): PlayerFullAnalyticsType {
  const data = localStorage.getItem(PLAYER_ANALYTICS_KEY);
  return data ? JSON.parse(data) : {};
}
