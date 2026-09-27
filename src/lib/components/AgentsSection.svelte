<script lang="ts">
	import Section from './Section.svelte';
	import { currentMessages } from '$lib/content';

	const t = $derived(currentMessages());
	const agents = $derived(t.agents);
</script>

<Section id="agents" title={agents.title} lead={agents.lead}>
	<ul class="mt-10 grid gap-3 sm:mt-14 sm:gap-4 md:grid-cols-3">
		{#each agents.capabilities as item, i (i)}
			<li class="surface p-5 sm:p-6">
				<h3 class="text-[1.0625rem] font-semibold tracking-[-0.012em] text-ink-50">{item.title}</h3>
				<p class="mt-2 text-[0.9375rem] leading-relaxed text-ink-400">{item.body}</p>
			</li>
		{/each}
	</ul>

	<ul class="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
		{#each agents.upcoming as item, i (i)}
			<li class="flex flex-col rounded-card border border-dashed border-ink-800 p-5 sm:p-6">
				<span class="self-start rounded-full px-2.5 py-0.5 text-xs font-medium text-ink-400 ring-1 ring-inset ring-ink-800">
					{agents.upcomingBadge}
				</span>
				<h3 class="mt-4 text-[1.0625rem] font-semibold tracking-[-0.012em] text-ink-200">{item.title}</h3>
				<p class="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">{item.body}</p>
			</li>
		{/each}
	</ul>
</Section>
