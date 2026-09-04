import fs from "fs";

const STORE_PATH = "features/players/data/new/canonical-store.json";
const store = JSON.parse(fs.readFileSync(STORE_PATH, "utf8"));

type Stats = { [k: string]: number | string | undefined };

const NUMERIC_FIELDS = [
	"appearances",
	"minutes",
	"goals",
	"assists",
	"shots",
	"shotsOnTarget",
	"keyPasses",
	"chancesCreated",
	"dribbles",
	"dribblesCompleted",
	"interceptions",
	"tackles",
	"dribbledPast",
	"clearances",
	"groundDuelsWon",
	"blockedShots",
	"yellowCards",
	"yellowToRedCards",
	"redCards",
];

function sumStats(rows: any[]) {
	const out: Stats = {};
	for (const f of NUMERIC_FIELDS) out[f] = 0;
	for (const r of rows) {
		for (const f of NUMERIC_FIELDS) {
			const v = typeof r[f] === "number" ? (r[f] as number) : 0;
			out[f] = (out[f] as number) + v;
		}
	}
	return out;
}

function filterRowsForPlayer(playerId: string, opts: { seasonId?: string; competitionId?: string; competitionType?: string } = {}) {
	return store.totalPlayerStats.filter((r: any) => {
		if (r.playerId !== playerId) return false;
		if (opts.seasonId && r.seasonId !== opts.seasonId) return false;
		if (opts.competitionId && r.competitionId !== opts.competitionId) return false;
		if (opts.competitionType && r.competitionType !== opts.competitionType) return false;
		return true;
	});
}

function aggregateForPlayer(playerId: string, opts: { seasonId?: string; competitionId?: string; competitionType?: string } = {}) {
	const rows = filterRowsForPlayer(playerId, opts);
	return sumStats(rows);
}

function compareTwoStats(left: Stats, right: Stats) {
	const metrics: { [k: string]: { left: number; right: number; diff: number } } = {};
	for (const f of NUMERIC_FIELDS) {
		const l = Number(left[f] || 0);
		const r = Number(right[f] || 0);
		metrics[f] = { left: l, right: r, diff: l - r };
	}
	return metrics;
}

function pairwiseComparisons(entries: { playerId: string; label?: string; stats: Stats }[]) {
	const result: any[] = [];
	for (let i = 0; i < entries.length; i++) {
		for (let j = i + 1; j < entries.length; j++) {
			const a = entries[i];
			const b = entries[j];
			result.push({
				left: { playerId: a.playerId, label: a.label, stats: a.stats },
				right: { playerId: b.playerId, label: b.label, stats: b.stats },
				metrics: compareTwoStats(a.stats, b.stats),
			});
		}
	}
	return result;
}

// 1) Season comparisons of players (explicit seasons per player)
export function generateSeasonComparisonsOfPlayers(players: { playerId: string; seasonId: string; label?: string }[]) {
	const entries = players.map((p) => ({ playerId: p.playerId, label: p.label || p.seasonId, stats: aggregateForPlayer(p.playerId, { seasonId: p.seasonId }) }));
	return pairwiseComparisons(entries);
}

// 2) League season comparisons (filter by competitionType = 'league')
export function generateLeagueSeasonComparisonsOfPlayers(players: { playerId: string; seasonId: string; label?: string }[]) {
	const entries = players.map((p) => ({ playerId: p.playerId, label: p.label || p.seasonId, stats: aggregateForPlayer(p.playerId, { seasonId: p.seasonId, competitionType: "league" }) }));
	return pairwiseComparisons(entries);
}

// 3) Competition season comparisons (specific competition id, e.g., 'ucl')
export function generateCompetitionSeasonComparisonsOfPlayers(players: { playerId: string; seasonId: string; competitionId: string; label?: string }[]) {
	const entries = players.map((p) => ({ playerId: p.playerId, label: p.label || `${p.seasonId} ${p.competitionId}`, stats: aggregateForPlayer(p.playerId, { seasonId: p.seasonId, competitionId: p.competitionId }) }));
	return pairwiseComparisons(entries);
}

// 4) League career comparisons (aggregate across seasons filtered by competitionType='league')
export function generateLeagueCareerComparisonsOfPlayers(playerIds: { playerId: string; label?: string }[]) {
	const entries = playerIds.map((p) => ({ playerId: p.playerId, label: p.label || p.playerId, stats: aggregateForPlayer(p.playerId, { competitionType: "league" }) }));
	return pairwiseComparisons(entries);
}

// 5) Competition career comparisons (aggregate across seasons for a specific competitionId)
export function generateCompetitionCareerComparisonsOfPlayers(playerIds: { playerId: string; competitionId: string; label?: string }[]) {
	const entries = playerIds.map((p) => ({ playerId: p.playerId, label: p.label || p.competitionId, stats: aggregateForPlayer(p.playerId, { competitionId: p.competitionId }) }));
	return pairwiseComparisons(entries);
}

// 6) Overall career comparisons (aggregate across all competitions and seasons)
export function generateOverallCareerComparisonsOfPlayers(playerIds: { playerId: string; label?: string }[]) {
	const entries = playerIds.map((p) => ({ playerId: p.playerId, label: p.label || p.playerId, stats: aggregateForPlayer(p.playerId) }));
	return pairwiseComparisons(entries);
}

// convenience default export
export default {
	generateSeasonComparisonsOfPlayers,
	generateLeagueSeasonComparisonsOfPlayers,
	generateCompetitionSeasonComparisonsOfPlayers,
	generateLeagueCareerComparisonsOfPlayers,
	generateCompetitionCareerComparisonsOfPlayers,
	generateOverallCareerComparisonsOfPlayers,
};


// Generate comparisons based on the proper types set, scrrap this way, it is very unclear