export type LegacyDataStore = Array<LegacyPlayer>;

export interface LegacyPlayer {
  "player": LegacyPlayerDetails;
  "statistics": LegacyPlayerStats;
}

export interface LegacyPlayerDetails {
  "id": number;
  "name": string;
  "firstname": string;
  "lastname": string;
  "age": number;
  "birth": LegacyPlayerBirthDetails;
  "nationality": string;
  "height": string;
  "weight": string;
  "injured": boolean;
  "photo": string;
}

export interface LegacyPlayerBirthDetails {
  "date": string,
  "place": string,
  "country": string
}

export type LegacyPlayerStats = Array<LegacyPlayerStat>;

export interface LegacyPlayerStat {
  "team": LegacyPlayerTeamStat;
  "league": LegacyPlayerLeagueStat;
  "games": LegacyPlayerGameStat;
  "substitutes": LegacyPlayerSubstituteStat;
  "shots": LegacyPlayerShotStat;
  "goals": LegacyPlayerGoalStat;
  "passes": LegacyPlayerPassStat;
  "tackles": LegacyPlayerTackleStat;
  "duels": LegacyPlayerDuelStat;
  "dribbles": LegacyPlayerDribbleStat;
  "fouls": LegacyPlayerFoulStat;
  "cards": LegacyPlayerCardStat;
  "penalty": LegacyPlayerPenaltyStat;
}

export interface LegacyPlayerTeamStat {
  "id": number;
  "name": string;
  "logo": string;
}

export interface LegacyPlayerLeagueStat {
  "id": number;
  "name": string;
  "country": string;
  "logo": string;
  "flag": string;
  "season": number;
}

export interface LegacyPlayerGameStat {
  "appearences": number;
  "lineups": number;
  "minutes": number;
  "number": number | null;
  "position": string;
  "rating": string | null;
  "captain": boolean;
}

export interface LegacyPlayerSubstituteStat {
  "in": number;
  "out": number;
  "bench": number;
}

export interface LegacyPlayerShotStat {
  "total": number;
  "on": number;
}

export interface LegacyPlayerGoalStat {
  "total": number;
  "conceded": number;
  "assists": number;
  "saves": number | null;
}

export interface LegacyPlayerPassStat {
  "total": number;
  "key": number;
  "accuracy": number | null;
}

export interface LegacyPlayerTackleStat {
  "total": number;
  "blocks": number;
  "interceptions": number;
}

export interface LegacyPlayerDuelStat {
  "total": number;
  "won": number;
}

export interface LegacyPlayerDribbleStat {
  "attempts": number;
  "success": number;
  "past": number | null;
}

export interface LegacyPlayerFoulStat {
  "drawn": number;
  "committed": number;
}

export interface LegacyPlayerCardStat {
  "yellow": number;
  "yellowRed": number;
  "red": number;
}

export interface LegacyPlayerPenaltyStat {
  "won": number | null;
  "committed": number | null;
  "scored": number;
  "missed": number;
  "saved": number | null;
}