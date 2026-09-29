import { SelectedComparisonContext } from "../types/comp-save-type";


export function getComparisonReadinessMessage(
  selectedPlayers: string[],
  selectedContexts: SelectedComparisonContext[],
): string | null {
  if (!selectedPlayers[0] || !selectedPlayers[1]) {
    return "Select two players to begin a comparison.";
  }

  if (!selectedContexts[0]?.context || !selectedContexts[1]?.context) {
    return "Choose a comparison scope for both players.";
  }

  if (selectedContexts[0].context !== selectedContexts[1].context) {
    return "Choose matching comparison scopes for both players.";
  }

  return null;
}