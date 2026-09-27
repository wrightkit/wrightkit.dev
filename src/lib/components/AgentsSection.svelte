<script lang="ts">
	import { reveal } from '$lib/reveal';
	import Section from './Section.svelte';
	import { currentMessages } from '$lib/content';

	const t = $derived(currentMessages());
	const agents = $derived(t.agents);
</script>

<Section id="agents" title={agents.title} lead={agents.lead}>
	<ul class="mt-10 grid gap-3 sm:mt-14 sm:gap-4 md:grid-cols-3">
		{#each agents.capabilities as item, i (i)}
			<li class="surface p-5 sm:p-6" data-reveal style="--reveal-delay: {i * 70}ms" use:reveal>
				<h3 class="text-[1.0625rem] font-semibold tracking-[-0.012em] text-ink-50">{item.title}</h3>
				<p class="mt-2 text-[0.9375rem] leading-relaxed text-ink-400">{item.body}</p>
			</li>
		{/each}
	</ul>

	<div data-reveal="fade" style="--reveal-delay: 250ms" use:reveal class="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.9375rem] text-ink-500">
		<span class="rounded-full px-2.5 py-0.5 text-xs font-medium text-ink-400 ring-1 ring-inset ring-ink-800">
			{agents.upcomingLabel}
		</span>
		<ul class="flex flex-wrap gap-x-2 gap-y-1">
			{#each agents.upcoming as item, i (i)}
				<li class="flex gap-2">
					{#if i > 0}<span class="text-ink-700" aria-hidden="true">·</span>{/if}{item}
				</li>
			{/each}
		</ul>
	</div>
</Section>
