<script lang="ts">
	import Section from './Section.svelte';
	import { currentMessages } from '$lib/content';

	const t = $derived(currentMessages());
	const agents = $derived(t.agents);
	const columns = $derived([agents.developers, agents.codingAgents]);
</script>

<Section id="agents" eyebrow={agents.eyebrow} title={agents.title} lead={agents.lead}>
	<div class="mt-10 grid gap-3 sm:mt-14 sm:gap-4 md:grid-cols-2">
		{#each columns as column, c (c)}
			<div class="surface p-5 sm:p-7">
				<h3 class="text-[1.0625rem] font-semibold tracking-[-0.012em] text-ink-50">{column.title}</h3>
				<ul class="mt-4 space-y-3">
					{#each column.points as point, p (p)}
						<li class="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-300">
							<svg class="mt-[0.3em] h-4 w-4 shrink-0 text-accent-400" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
							</svg>
							<span>{point}</span>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>

	<div class="mt-12 sm:mt-16">
		<h3 class="text-[1.0625rem] font-semibold tracking-[-0.012em] text-ink-50">{agents.loop.title}</h3>
		<p class="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-pretty text-ink-400">{agents.loop.lead}</p>
		<ol class="mt-6 grid gap-px overflow-hidden rounded-card bg-ink-800/70 sm:grid-cols-5">
			{#each agents.loop.steps as step, i (i)}
				<li class="bg-ink-950 p-4 sm:p-5">
					<span class="font-mono text-xs text-ink-600">{String(i + 1).padStart(2, '0')}</span>
					<p class="mt-2 text-[0.9375rem] font-semibold text-ink-100">{step.title}</p>
					<p class="mt-1 text-sm leading-snug text-ink-500">{step.body}</p>
				</li>
			{/each}
		</ol>
	</div>
</Section>
