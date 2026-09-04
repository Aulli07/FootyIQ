/**
 * Centralized legacy stats export hub.
 * Plain mock data lives here; API-style conversion belongs in a separate adapter.
 */

import { ronaldoStats } from "./players/ronaldo";
import { messiStats } from "./players/messi";
import { neymarStats } from "./players/neymar";
import { benzemaStats } from "./players/benzema";
import { doueStats } from "./players/doue";
import { yamalStats } from "./players/yamal";
import { alvarezStats } from "./players/alvarez";
import { bellinghamStats } from "./players/bellingham";
import { fodenStats } from "./players/foden";
import { haalandStats } from "./players/haaland";
import { lewandowskiStats } from "./players/lewandowski";
import { mbappeStats } from "./players/mbappe";
import { pedriStats } from "./players/pedri";
import { rodriStats } from "./players/rodri";
import { viniciusStats } from "./players/vinicius";

/* Legacy player stats array */

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
];

export default allPlayerStatsLegacy;
