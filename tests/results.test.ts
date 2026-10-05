import { describe, expect, it } from 'vitest';
import { render } from 'svelte/server';
import ResultsTable from '../src/lib/components/ResultsTable.svelte';
import { loadResults, parseResults, rankAgents, resultsSchema, tiedWithTop } from '../src/lib/bench';
import en from '../src/lib/content/en';
import zhCN from '../src/lib/content/zh-CN';

const track = (score: number, lo: number, hi: number, provisional: string[] = []) => ({
	score,
	ci95: [lo, hi],
	provisional
});

const fixture = {
	schema: resultsSchema,
	environment: { wright: '0.9.0', suite: 'suite-3' },
	agents: [
		{
			agent: { program: 'beta-cli', version: '2.0' },
			model: 'model-b',
			effort: null,
			tracks: { workshop: track(60, 40, 78), opy: track(30, 10, 50, ['fewer than 8 scenarios']) }
		},
		{
			agent: { program: 'alpha-cli', version: '1.4' },
			model: 'model-a',
			effort: 'high',
			tracks: { workshop: track(81.2, 66.5, 92), opy: track(70, 55, 85) }
		},
		{
			agent: { program: 'gamma-cli', version: '0.1' },
			model: 'model-g',
			effort: 'low',
			tracks: { workshop: track(20, 5, 35) }
		}
	]
};

const response = (body: unknown, ok = true) => (async () => ({ ok, json: async () => body })) as unknown as typeof fetch;

describe('results data', () => {
	const results = parseResults(fixture)!;
	const ranked = rankAgents(results.agents);

	it('ranks by Workshop then OverPy score without averaging', () => {
		expect(ranked.map((row) => row.agent.program)).toEqual(['alpha-cli', 'beta-cli', 'gamma-cli']);
	});

	it('marks rows whose interval overlaps the first row in the same track', () => {
		expect([1, 2].map((i) => tiedWithTop(ranked, i, 'workshop'))).toEqual([true, false]);
		expect([0, 1, 2].map((i) => tiedWithTop(ranked, i, 'opy'))).toEqual([false, false, false]);
	});

	it('is empty when the data is missing or has no agents, and unsupported on another schema', async () => {
		expect(await loadResults(response(null, false))).toEqual({ state: 'empty' });
		expect(await loadResults((async () => Promise.reject(new Error('offline'))) as typeof fetch)).toEqual({ state: 'empty' });
		expect(await loadResults(response({ ...fixture, agents: [] }))).toEqual({ state: 'empty' });
		expect(await loadResults(response({ ...fixture, schema: 'wright-agent-results/v2' }))).toEqual({ state: 'unsupported' });
		expect(await loadResults(response({ schema: resultsSchema }))).toEqual({ state: 'unsupported' });
		expect((await loadResults(response(fixture))).state).toBe('ready');
	});
});

describe.each([
	['en', en],
	['zh-CN', zhCN]
] as const)('results table (%s)', (_locale, messages) => {
	const t = messages.results;
	const { body } = render(ResultsTable, { props: { results: parseResults(fixture)!, t } });
	const rows = body.split('data-row').slice(1);

	it('shows scores, intervals, and ties in rank order', () => {
		expect(rows).toHaveLength(3);
		expect(rows[0]).toContain('alpha-cli');
		expect(rows[0]).toContain('81.2');
		expect(rows[0]).toContain('66.5–92.0');
		expect(rows[0]).not.toContain('data-tie');
		expect(rows[1]).toContain('beta-cli');
		expect(rows[1].match(/data-tie/g)).toHaveLength(1);
		expect(rows[1]).toContain(t.tiedWithTop);
		expect(rows[1]).toContain(t.provisional);
		expect(rows[1]).toContain(t.noEffort);
		expect(rows[2]).toContain(t.notRun);
		expect(rows[2]).not.toContain('data-tie');
	});
});
