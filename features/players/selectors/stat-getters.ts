import { Player, PlayerCareerStats, PlayerSeasonStats } from "@/shared/types/stats-schema";
import {
  getCanonicalClubById,
  getCanonicalPlayerCareerStats,
  getCanonicalPlayerSeasonStatsBySeasonLabel,
  getCanonicalPlayerStatsBySeasonLabelAndCompetitionId,
} from "@/shared/utils/canonical-lookups";



export function getAgeOfPlayer(player: Player | null): string | number {
  const age = player?.dateOfBirth
    ? Math.floor(
        (Date.now() - new Date(player.dateOfBirth).getTime()) /
          (1000 * 60 * 60 * 24 * 365.25),
      )
    : null;

  return age !== null ? age : "-";
}

export function getClubNameOfPlayer(player: Player | null): string {
  const clubId = player?.currentClubId;
  const clubName = clubId ? getCanonicalClubById(clubId)?.name : null;

  return clubName ?? "-";
}

export function getPositionOfPlayer(player: Player | null): string {
  return player?.primaryPosition ?? "-";
}

export function getNationalityOfPlayer(player: Player | null): string {
  return player?.nationality ?? "-";
}

export function getHeightOfPlayer(player: Player | null): string | number {
  const height = player?.heightCm;
  return typeof height === "number" ? height : "-";
}

export function getPreferredFootOfPlayer(player: Player | null): string {
  return player?.preferredFoot ?? "-";
}

export function getAverageRatingOfPlayerBasedOnCareer(
  player: Player | null,
): string | number {
  const careerRating = getCanonicalPlayerCareerStats(
    player?.id ?? "",
  )?.averageRating;
  return careerRating?.toFixed(2) ?? "-";
}

export function getAverageRatingOfPlayerBasedOnCompetitionAndSeason(
  player: Player | null,
  seasonLabel: string,
): string | number {
  const seasonLabelSplits = seasonLabel.trim().split(/\s+/);
  const competitionId = seasonLabelSplits[0].toLowerCase();
  const seasonPart = seasonLabelSplits.slice(1).join(" ");

  const competitionRows = getCanonicalPlayerStatsBySeasonLabelAndCompetitionId(
    player?.id ?? "",
    seasonPart,
    competitionId,
  );

  const competitionRating = competitionRows.find(
    (row) => typeof row.rating === "number",
  )?.rating;
  return competitionRating?.toFixed(2) ?? "-";
}

export function getAverageRatingOfPlayerBasedOnSeason(
  player: Player | null,
  seasonLabel: string,
): string | number {
  const seasonRows = getCanonicalPlayerSeasonStatsBySeasonLabel(
    player?.id ?? "",
    seasonLabel,
  );
  const seasonRating = seasonRows.find(
    (row) => typeof row.rating === "number",
  )?.rating;

  return seasonRating?.toFixed(2) ?? "-";
}

export function getStatValueBasedOnCareer(
  player: Player | null,
  identifier: string,
): string | number {
  const careerStats = getCanonicalPlayerCareerStats(player?.id ?? "");

  if (!careerStats) return "-";

  const value = careerStats[identifier as keyof PlayerCareerStats];

  if (typeof value === "number") {
    return value;
  }

  return "-";
}

export function getStatValueBasedOnCompetitionAndSeason(
  player: Player | null,
  seasonLabel: string,
  identifier: string,
): string | number {
  const seasonLabelSplits = seasonLabel.trim().split(/\s+/);
  const competitionId = seasonLabelSplits[0].toLowerCase();
  const seasonPart = seasonLabelSplits.slice(1).join(" ");

  const seasonRows = getCanonicalPlayerStatsBySeasonLabelAndCompetitionId(
    player?.id ?? "",
    seasonPart,
    competitionId,
  );

  if (seasonRows.length === 0) return "-";

  return seasonRows.reduce<number>((total: number, row: PlayerSeasonStats) => {
    const value = row[identifier as keyof PlayerSeasonStats];
    return total + (typeof value === "number" ? value : 0);
  }, 0);
}

export function getStatValueBasedOnSeason(
  player: Player | null,
  seasonLabel: string,
  identifier: string,
): string | number {
  const seasonRows = getCanonicalPlayerSeasonStatsBySeasonLabel(
    player?.id ?? "",
    seasonLabel,
  );

  if (seasonRows.length === 0) return "-";

  return seasonRows.reduce<number>((total: number, row: PlayerSeasonStats) => {
    const value = row[identifier as keyof PlayerSeasonStats];
    return total + (typeof value === "number" ? value : 0);
  }, 0);
}
