import PopularPlayerCard from "../../players/components/popular-player-card";

import { getCanonicalPlayerById } from "@/shared/utils/canonical-lookups";
import { Player } from "@/shared/types/stats-schema";
import { usePlayerAnalytics } from "@/providers/analytics-contexts";



export function PlayerDisplayResults({ playerIds }: { playerIds: string[] }) {
  const { playerAnalytics } = usePlayerAnalytics();

  const resolvedPlayers: Player[] = playerIds
    .map((id) => getCanonicalPlayerById(id))
    .filter((player): player is Player => player !== null);

  return (
    <div className="flex flex-col gap-3 py-3">
      {resolvedPlayers.map((player) => (
        <PopularPlayerCard
          key={player.id}
          player={player}
          searchCount={playerAnalytics[player.id]?.searchCount ?? 0}
        />
      ))}
    </div>
  );
}
