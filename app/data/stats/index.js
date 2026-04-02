/**
 * Centralized legacy stats export hub.
 * Plain mock data lives here; API-style conversion belongs in a separate adapter.
 */

import { ronaldoStats } from "./ronaldo";
import { messiStats } from "./messi";
import { neymarStats } from "./neymar";
import { benzemaStats } from "./benzema";
import { doueStats } from "./doue";
import { yamalStats } from "./yamal";
import { alvarezStats } from "./alvarez";
import { bellinghamStats } from "./bellingham";
import { fodenStats } from "./foden";
import { haalandStats } from "./haaland";
import { lewandowskiStats } from "./lewandowski";
import { mbappeStats } from "./mbappe";
import { pedriStats } from "./pedri";
import { rodriStats } from "./rodri";
import { viniciusStats } from "./vinicius";
import { winaldumStats } from "./winaldum";

/**
 * Legacy player stats array.
 */
export const allPlayerStatsLegacy = [
  ronaldoStats,
  messiStats,
  neymarStats,
  benzemaStats,
  doueStats,
  yamalStats,
  alvarezStats,
  bellinghamStats,
  fodenStats,
  haalandStats,
  lewandowskiStats,
  mbappeStats,
  pedriStats,
  rodriStats,
  viniciusStats,
  winaldumStats,
];

/**
 * Default export for backwards compatibility
 */
export default allPlayerStatsLegacy;

/**
 * Get a player's legacy stats.
 * @param {string} playerId - Player ID (e.g., 'mbappe')
 * @returns {object|null} Player stats or null if not found
 */
export function getPlayerStats(playerId) {
  return allPlayerStatsLegacy.find((stat) => stat.id === playerId) || null;
}

/**
 * Get all player IDs currently available
 */
export function getAllPlayerIds() {
  return allPlayerStatsLegacy.map((stat) => stat.id);
}

export function getPlayerStatsBatch(playerIds) {
  return playerIds
    .map((id) => getPlayerStats(id))
    .filter((stat) => stat !== null);
}

/**
 * Exported player metadata for reference
 * Maps player IDs to their profile info
 */
export const playerStatsMetadata = {
  ronaldo: { name: "Cristiano Ronaldo", position: "Forward" },
  messi: { name: "Lionel Messi", position: "Forward" },
  neymar: { name: "Neymar Jr", position: "Forward" },
  benzema: { name: "Karim Benzema", position: "Forward" },
  doue: { name: "Desire Doue", position: "Forward" },
  yamal: { name: "Lamine Yamal", position: "Forward" },
  alvarez: { name: "Julián Álvarez", position: "Forward" },
  bellingham: { name: "Jude Bellingham", position: "Midfielder" },
  foden: { name: "Phil Foden", position: "Forward" },
  haaland: { name: "Erling Haaland", position: "Forward" },
  lewandowski: { name: "Robert Lewandowski", position: "Forward" },
  mbappe: { name: "Kylian Mbappé", position: "Forward" },
  pedri: { name: "Pedri González", position: "Midfielder" },
  rodri: { name: "Rodri Hernández", position: "Midfielder" },
  vinicius: { name: "Vinícius Júnior", position: "Forward" },
  winaldum: { name: "Georginio Wijnaldum", position: "Midfielder" },
};
