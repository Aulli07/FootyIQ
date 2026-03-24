/**
 * @deprecated Import from ./stats/index.js instead
 * This file is kept for backwards compatibility
 */
import { allPlayerStatsLegacy } from "./stats/index.js";

/**
 * Legacy export — now a re-export from the centralized stats hub
 * Use allPlayerStatsLegacy or allPlayerStatsApiFootball from ./stats/index.js
 */
export const playerStats = allPlayerStatsLegacy;
