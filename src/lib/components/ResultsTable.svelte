<script lang="ts">
	import { rankAgents, tiedWithTop, tracks, type Results } from '$lib/bench';
	import type { Messages } from '$lib/content/types';

	let { results, t }: { results: Results; t: Messages['results'] } = $props();

	const ranked = $derived(rankAgents(results.agents));
	const fmt = (n: number) => n.toFixed(1);
</script>

<div class="surface overflow-hidden">
	<table class="block w-full text-left text-sm sm:table">
		<thead class="sr-only sm:not-sr-only sm:table-header-group">
			<tr class="border-b border-ink-800/70 text-ink-400">
				<th scope="col" class="px-4 py-3 font-medium">{t.columns.rank}</th>
				<th scope="col" class="px-4 py-3 font-medium">{t.columns.agent}</th>
				<th scope="col" class="px-4 py-3 font-medium">{t.columns.model}</th>
				<th scope="col" class="px-4 py-3 font-medium">{t.columns.effort}</th>
				{#each tracks as track (track)}
					<th scope="col" class="min-w-52 px-4 py-3 font-medium">{t.tracks[track]}</th>
				{/each}
			</tr>
		</thead>
		<tbody class="block sm:table-row-group">
			{#each ranked as row, index (`${row.agent.program}/${row.agent.version}/${row.model}/${row.effort}`)}
				<tr class="block border-b border-ink-800/70 px-4 py-3 last:border-b-0 sm:table-row sm:p-0" data-row>
					<td class="block py-0.5 font-semibold tabular-nums text-ink-50 sm:table-cell sm:px-4 sm:py-4">
						<span class="sr-only sm:hidden">{t.columns.rank}: </span>{index + 1}
					</td>
					<td class="block py-0.5 text-ink-100 sm:table-cell sm:px-4 sm:py-4">
						{row.agent.program}
						<span class="text-ink-500">{row.agent.version}</span>
					</td>
					<td class="block py-0.5 sm:table-cell sm:px-4 sm:py-4">
						<span class="text-ink-500 sm:hidden">{t.columns.model}: </span>{row.model}
					</td>
					<td class="block py-0.5 sm:table-cell sm:px-4 sm:py-4">
						<span class="text-ink-500 sm:hidden">{t.columns.effort}: </span>{row.effort ?? t.noEffort}
					</td>
					{#each tracks as track (track)}
						{@const result = row.tracks[track]}
						<td class="block pt-2 sm:table-cell sm:px-4 sm:py-4" data-track={track}>
							<span class="text-ink-500 sm:hidden">{t.tracks[track]}</span>
							{#if result}
								<div class="flex flex-wrap items-baseline gap-x-2">
									<span class="font-semibold tabular-nums text-ink-50">{fmt(result.score)}</span>
									<span class="text-xs tabular-nums text-ink-500">
										{t.interval} {fmt(result.ci95[0])}–{fmt(result.ci95[1])}
									</span>
								</div>
								<div
									class="relative mt-1.5 h-2 overflow-hidden rounded-full bg-ink-800"
									aria-hidden="true"
									data-bar
								>
									<div
										class="absolute inset-y-0 bg-accent-500/30"
										style:left="{result.ci95[0]}%"
										style:width="{result.ci95[1] - result.ci95[0]}%"
									></div>
									<div class="absolute inset-y-0 left-0 bg-accent-500" style:width="{result.score}%"></div>
								</div>
								{#if tiedWithTop(ranked, index, track) || result.provisional.length}
									<div class="mt-1.5 flex flex-wrap gap-1.5 text-xs">
										{#if tiedWithTop(ranked, index, track)}
											<span class="rounded-full bg-ink-800 px-2 py-0.5 text-ink-200" data-tie>{t.tiedWithTop}</span>
										{/if}
										{#if result.provisional.length}
											<span class="rounded-full bg-ink-800 px-2 py-0.5 text-ink-400" title={result.provisional.join('; ')}>{t.provisional}</span>
										{/if}
									</div>
								{/if}
							{:else}
								<span class="text-ink-500">{t.notRun}</span>
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
