/**
 * The hosted Wright Agent Score results (`wright-agent-results/v1`, published by
 * wrightkit/wright). The page holds no result data; it fetches this document in
 * the browser and shows only the fields declared here.
 */

export const resultsUrl = 'https://releases.wrightkit.dev/bench/latest.json';
export const resultsSchema = 'wright-agent-results/v1';

export const tracks = ['workshop', 'opy'] as const;
export type Track = (typeof tracks)[number];

export interface TrackResult {
	/** 0-100. */
	score: number;
	/** 95% interval, `[low, high]`. */
	ci95: readonly [number, number];
	provisional: readonly string[];
}

export interface AgentResult {
	agent: { program: string; version: string };
	model: string;
	effort: string | null;
	tracks: Partial<Record<Track, TrackResult>>;
}

export interface Results {
	schema: typeof resultsSchema;
	environment: { wright: string; suite: string };
	agents: readonly AgentResult[];
}

export type Loaded =
	| { state: 'ready'; results: Results }
	| { state: 'empty' }
	| { state: 'unsupported' };

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null && !Array.isArray(value);
const isPercent = (value: unknown): value is number =>
	typeof value === 'number' && value >= 0 && value <= 100;

function parseTrack(value: unknown): TrackResult | null {
	if (!isRecord(value) || !isPercent(value.score)) return null;
	const ci = value.ci95;
	if (!Array.isArray(ci) || ci.length !== 2 || !isPercent(ci[0]) || !isPercent(ci[1])) return null;
	const provisional = value.provisional ?? [];
	if (!Array.isArray(provisional) || !provisional.every((reason) => typeof reason === 'string')) return null;
	return { score: value.score, ci95: [ci[0], ci[1]], provisional };
}

function parseAgent(value: unknown): AgentResult | null {
	if (!isRecord(value) || !isRecord(value.agent) || !isRecord(value.tracks)) return null;
	const { program, version } = value.agent;
	const effort = value.effort ?? null;
	if (
		typeof program !== 'string' ||
		typeof version !== 'string' ||
		typeof value.model !== 'string' ||
		(effort !== null && typeof effort !== 'string')
	)
		return null;
	const parsed: Partial<Record<Track, TrackResult>> = {};
	for (const track of tracks) {
		if (value.tracks[track] === undefined) continue;
		const result = parseTrack(value.tracks[track]);
		if (!result) return null;
		parsed[track] = result;
	}
	return { agent: { program, version }, model: value.model, effort, tracks: parsed };
}

/** Results of a known schema version, or `null` when the document is not one this page can show. */
export function parseResults(value: unknown): Results | null {
	if (!isRecord(value) || value.schema !== resultsSchema) return null;
	const env = value.environment;
	if (!isRecord(env) || typeof env.wright !== 'string' || typeof env.suite !== 'string') return null;
	if (!Array.isArray(value.agents)) return null;
	const agents = value.agents.map(parseAgent);
	if (agents.some((agent) => agent === null)) return null;
	return {
		schema: resultsSchema,
		environment: { wright: env.wright, suite: env.suite },
		agents: agents as AgentResult[]
	};
}

/** Missing or unreachable data is empty; a document of another schema version is unsupported. */
export async function loadResults(fetchImpl: typeof fetch = fetch): Promise<Loaded> {
	let body: unknown;
	try {
		const response = await fetchImpl(resultsUrl, { cache: 'no-cache' });
		if (!response.ok) return { state: 'empty' };
		body = await response.json();
	} catch {
		return { state: 'empty' };
	}
	const results = parseResults(body);
	if (!results) return { state: 'unsupported' };
	return results.agents.length ? { state: 'ready', results } : { state: 'empty' };
}

/** Rows ordered by the Workshop score, then the OverPy score; agents without a track sort last. Tracks are never averaged. */
export function rankAgents(agents: readonly AgentResult[]): AgentResult[] {
	return [...agents].sort((a, b) => {
		for (const track of tracks) {
			const diff = (b.tracks[track]?.score ?? -1) - (a.tracks[track]?.score ?? -1);
			if (diff) return diff;
		}
		return 0;
	});
}

/** Whether a row's interval overlaps the first row's in the same track, so the data cannot separate them. */
export function tiedWithTop(ranked: readonly AgentResult[], index: number, track: Track): boolean {
	const top = ranked[0]?.tracks[track];
	const own = ranked[index]?.tracks[track];
	return index > 0 && !!top && !!own && own.ci95[0] <= top.ci95[1] && top.ci95[0] <= own.ci95[1];
}
