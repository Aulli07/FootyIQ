/**
 * Centralized Stats Export Hub
 *
 * This file consolidates all player stats in both formats:
 * - Legacy format (for existing UI compatibility)
 * - API-Football format (for backend migration and new features)
 *
 * To add a new player:
 * 1. Create their stats file in `forwards/` or `midfielders/` etc.
 * 2. Export both `{player}Stats` (legacy) and `{player}ApiFootballStats` (API format)
 * 3. Import and add both to the arrays below
 * 4. Done — both formats automatically available
 */

// Legacy imports (existing UI format)
import { ronaldoStats } from "./forwards/ronaldo";
import { messiStats } from "./forwards/messi";
import { neymarStats } from "./forwards/neymar";
import { benzemaStats } from "./forwards/benzema";
import { doueStats } from "./forwards/doue";
import { yamalStats } from "./forwards/yamal";
import { alvarezStats } from "./forwards/alvarez";
import { bellinghamStats } from "./forwards/bellingham";
import { fodenStats } from "./forwards/foden";
import { haalandStats } from "./forwards/haaland";
import { lewandowskiStats } from "./forwards/lewandowski";
import { mbappeStats } from "./forwards/mbappe";
import { pedriStats } from "./forwards/pedri";
import { rodriStats } from "./forwards/rodri";
import { viniciusStats } from "./forwards/vinicius";
import { winaldumStats } from "./forwards/winaldum";

// API-Football imports (backend migration format)
import { ronaldoApiFootballStats } from "./forwards/ronaldo";
import { messiApiFootballStats } from "./forwards/messi";
import { neymarApiFootballStats } from "./forwards/neymar";
import { benzemaApiFootballStats } from "./forwards/benzema";
import { doueApiFootballStats } from "./forwards/doue";
import { yamalApiFootballStats } from "./forwards/yamal";
import { alvarezApiFootballStats } from "./forwards/alvarez";
import { bellinghamApiFootballStats } from "./forwards/bellingham";
import { fodenApiFootballStats } from "./forwards/foden";
import { haalandApiFootballStats } from "./forwards/haaland";
import { lewandowskiApiFootballStats } from "./forwards/lewandowski";
import { mbappeApiFootballStats } from "./forwards/mbappe";
import { pedriApiFootballStats } from "./forwards/pedri";
import { rodriApiFootballStats } from "./forwards/rodri";
import { viniciusApiFootballStats } from "./forwards/vinicius";
import { winaldumApiFootballStats } from "./forwards/winaldum";

/**
 * Legacy player stats array
 * Used by existing UI components that expect seasons/competitions structure
 * @deprecated Use allPlayerStatsApiFootball for new features
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
 * API-Football player stats array
 * Ready for backend integration; flat normalized structure
 * This is the canonical format for new features
 */
export const allPlayerStatsApiFootball = [
  ronaldoApiFootballStats,
  messiApiFootballStats,
  neymarApiFootballStats,
  benzemaApiFootballStats,
  doueApiFootballStats,
  yamalApiFootballStats,
  alvarezApiFootballStats,
  bellinghamApiFootballStats,
  fodenApiFootballStats,
  haalandApiFootballStats,
  lewandowskiApiFootballStats,
  mbappeApiFootballStats,
  pedriApiFootballStats,
  rodriApiFootballStats,
  viniciusApiFootballStats,
  winaldumApiFootballStats,
];

/**
 * Default export for backwards compatibility
 * @deprecated Use allPlayerStatsLegacy or allPlayerStatsApiFootball
 */
export default allPlayerStatsLegacy;

/**
 * Get a player's stats in a specific format
 * @param {string} playerId - Player ID (e.g., 'mbappe')
 * @param {'legacy'|'api-football'} format - Output format
 * @returns {object|null} Player stats or null if not found
 */
export function getPlayerStats(playerId, format = "legacy") {
  const array =
    format === "api-football"
      ? allPlayerStatsApiFootball
      : allPlayerStatsLegacy;
  return array.find((stat) => stat.id === playerId) || null;
}

/**
 * Get all player IDs currently available
 */
export function getAllPlayerIds() {
  return allPlayerStatsLegacy.map((stat) => stat.id);
}

/**
 * Batch get player stats by IDs in a specific format
 * @param {string[]} playerIds - Array of player IDs
 * @param {'legacy'|'api-football'} format - Output format
 * @returns {object[]} Array of player stats
 */
export function getPlayerStatsBatch(playerIds, format = "legacy") {
  return playerIds
    .map((id) => getPlayerStats(id, format))
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
