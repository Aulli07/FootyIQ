# Compare page: dynamic stat keys (TypeScript)

## Problem

On the compare page, indexing player stats using a dynamic key caused TypeScript errors like:

- “Type 'string' cannot be used to index type …”

## Reason

There were two root causes:

1. The stat values live under a nested object (`player.stats`), but the code was indexing the player object directly (`player[check]`).
2. `Object.keys(stats)` is typed as `string[]`, so TypeScript can’t guarantee `check` is one of the real stat keys (e.g. `"Goals" | "Assists" | "ShotsOnTarget"`).

## Solution

- Index into the nested stats object: use `player.stats[check]` (not `player[check]`).
- Ensure the key variable is typed as valid stat keys, not `string`.
  - Example approach: treat `Object.keys(stats)` as `Array<keyof PlayerOption["stats"]>` so `check` becomes a safe index.

---






# Compare page: selecting players to show stats (React state)

## Problem

Selecting a player from the dropdown either:

- crashed the page (often “Too many re-renders”), or
- didn’t reliably show stats for the left vs right player.

## Reason

The selection logic was updating the selected-players list during render (or mutating a non-state global array). In React:

- Calling a state setter during render triggers a re-render immediately, which can loop forever.
- Mutating arrays in-place (e.g. `.push`) doesn’t create a new reference, so React can’t reliably detect changes.
- Without a stable “slot” per dropdown, both dropdowns can overwrite/append unpredictably, so `players[0]` vs `players[1]` becomes inconsistent.

## Solution

- Store selected players in React state in the common parent (`Compare`), not as a module-level variable.
- Model selection as a fixed two-slot array: `[leftPlayer, rightPlayer]`.
- Pass a `playerSlot` index (0 or 1) into each player dropdown.
- Update state only in the user action handler (e.g. in `handleSelect`), using an immutable update pattern.

---






# Votes bar: dynamic `playerStats[playerId]` indexing (TypeScript)

## Problem

In `app/components/comparison-votes-bar.tsx` we needed to access stats using a player id coming from UI data:

```ts
playerStats[left.id];
```

But `left.id` is a runtime string, and `playerStats` was not typed as a dictionary with dynamic keys.

## Error (before fix)

TypeScript typically complained with an error in this shape (wording varies slightly by TS version/settings):

- “Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'PlayerStatsType'.”
- “Type 'string' cannot be used to index type …”

## Reason

Two type facts were in conflict:

1. `PlayerType.id` is typed as `string`, so `left.id`/`right.id` are just `string` to TypeScript.
2. `PlayerStatsType` was defined with fixed properties (`messi`, `ronaldo`, etc.) and no index signature.

So TypeScript can’t prove that a random `string` is a valid key of `playerStats`, even if at runtime it _is_.

## Solution

Allow dynamic indexing by making the stats type dictionary-like.

Two common approaches:

1. **Fully dynamic keys**

```ts
export type PlayerStatsType = Record<string, StatsType[]>;
```

2. **Restricted dynamic keys (safer)**

```ts
export type PlayerId =
  | "ronaldo"
  | "messi"
  | "neymar"
  | "benzema"
  | "doue"
  | "yamal";
export type PlayerStatsType = Record<PlayerId, StatsType[]>;
```

Then ensure `PlayerType["id"]` is `PlayerId` (not plain `string`) so `playerStats[left.id]` becomes type-safe.

As a short-term workaround in the component, we can also cast:

```ts
const statsByPlayerId = playerStats as unknown as Record<string, StatsType[]>;
```

That keeps runtime behavior unchanged, but it’s less strict than updating the source types.
