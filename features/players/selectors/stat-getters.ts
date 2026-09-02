import { Player, PlayerCareerStats, PlayerSeasonStats } from "@/shared/types/stats-schema";
import {
  getCanonicalClubDisplayNameById,
  getCanonicalPlayerCareerStats,
  getCanonicalPlayerSeasonStatsBySeasonLabel,
  getCanonicalPlayerStatsBySeasonLabelAndCompetitionId,
} from "@/shared/utils/canonical-lookups";

function parseSeasonSelection(seasonLabel: string) {
  const trimmedValue = seasonLabel.trim();

  if (!trimmedValue) {
    return { seasonLabel: "", competitionId: null as string | null };
  }

  const parts = trimmedValue.split(/\s+/);

  if (parts.length === 1) {
    return { seasonLabel: parts[0], competitionId: null };
  }

  return {
    seasonLabel: parts.slice(1).join(" "),
    competitionId: parts[0].toLowerCase(),
  };
}

function getAverageRatingFromRows(rows: PlayerSeasonStats[]): string | number {
  const ratings = rows
    .map((row) => row.rating)
    .filter((rating): rating is number => typeof rating === "number");

  if (ratings.length === 0) {
    return "-";
  }

  return (
    ratings.reduce((total, rating) => total + rating, 0) / ratings.length
  ).toFixed(2);
}

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

  return clubId ? getCanonicalClubDisplayNameById(clubId) : "-";
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
  const { seasonLabel: seasonPart, competitionId } = parseSeasonSelection(
    seasonLabel,
  );

  if (!competitionId) {
    return getAverageRatingOfPlayerBasedOnSeason(player, seasonPart || seasonLabel);
  }

  const competitionRows = getCanonicalPlayerStatsBySeasonLabelAndCompetitionId(
    player?.id ?? "",
    seasonPart,
    competitionId,
  );

  return getAverageRatingFromRows(competitionRows);
}

export function getAverageRatingOfPlayerBasedOnSeason(
  player: Player | null,
  seasonLabel: string,
): string | number {
  const { seasonLabel: seasonPart } = parseSeasonSelection(seasonLabel);
  const seasonRows = getCanonicalPlayerSeasonStatsBySeasonLabel(
    player?.id ?? "",
    seasonPart || seasonLabel,
  );

  return getAverageRatingFromRows(seasonRows);
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
  const { seasonLabel: seasonPart, competitionId } = parseSeasonSelection(
    seasonLabel,
  );

  if (!competitionId) {
    return getStatValueBasedOnSeason(player, seasonPart || seasonLabel, identifier);
  }

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
  const { seasonLabel: seasonPart } = parseSeasonSelection(seasonLabel);
  const seasonRows = getCanonicalPlayerSeasonStatsBySeasonLabel(
    player?.id ?? "",
    seasonPart || seasonLabel,
  );

  if (seasonRows.length === 0) return "-";

  return seasonRows.reduce<number>((total: number, row: PlayerSeasonStats) => {
    const value = row[identifier as keyof PlayerSeasonStats];
    return total + (typeof value === "number" ? value : 0);
  }, 0);
}
