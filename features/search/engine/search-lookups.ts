import fs from "fs";

import { canonicalPlayers } from "@/shared/utils/canonical-lookups";

const playerExactLookupMap: Record<string, string[]> = {};
const playerTokenLookupMap: Record<string, string[]> = {};
const playerPrefixLookupMap: Record<string, string[]> = {};

canonicalPlayers.forEach((player) => {
  const fullName = player.fullName.trim().toLowerCase();
  if (!playerExactLookupMap[fullName]) {
    playerExactLookupMap[fullName] = [];
  }
  playerExactLookupMap[fullName].push(player.id);

  const tokenMap = fullName.split(" ");
  tokenMap.forEach((token) => {
    if (!playerTokenLookupMap[token]) {
      playerTokenLookupMap[token] = [];
    }
    if (!playerTokenLookupMap[token].includes(player.id)) {
      playerTokenLookupMap[token].push(player.id);
    }

    for (let i = 2; i <= 3; i++) {
      if (token.length >= i) {
        const prefix = token.slice(0, i);

        if (!playerPrefixLookupMap[prefix]) {
          playerPrefixLookupMap[prefix] = [];
        }
        if (!playerPrefixLookupMap[prefix].includes(player.id)) {
          playerPrefixLookupMap[prefix].push(player.id);
        }
      }
    }
  });
});

fs.writeFileSync(
  "features/search/data/exact-lookup-map.json",
  JSON.stringify(playerExactLookupMap, null, 2),
);
fs.writeFileSync(
  "features/search/data/token-lookup-map.json",
  JSON.stringify(playerTokenLookupMap, null, 2),
);
fs.writeFileSync(
  "features/search/data/prefix-lookup-map.json",
  JSON.stringify(playerPrefixLookupMap, null, 2),
);
