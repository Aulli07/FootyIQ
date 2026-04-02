/**
 * @deprecated Import from ./player-stats/index.js instead
 * This file is kept for backwards compatibility
 */
import { allPlayerStatsLegacy } from "./player-stats/index.js";

/**
 * Legacy export — now a re-export from the centralized stats hub
 * Use allPlayerStatsLegacy from ./player-stats/index.js
 */
export const playerStats = allPlayerStatsLegacy;
