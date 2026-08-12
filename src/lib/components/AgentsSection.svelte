<script lang="ts">
	import Section from './Section.svelte';
	import { agents } from '$lib/site';
</script>

<Section index="03" eyebrow={agents.eyebrow} title={agents.title} lead={agents.lead}>
	<div class="mt-14 grid gap-px overflow-hidden rounded border border-ink-800 bg-ink-800 sm:grid-cols-2">
		{#each agents.points as point, i (point.title)}
			<div class="flex flex-col gap-3 bg-ink-950 p-7 sm:p-8">
				<span class="font-mono text-xs text-accent-500">{String(i + 1).padStart(2, '0')}</span>
				<h3 class="font-sans text-base font-semibold text-ink-50">{point.title}</h3>
				<p class="text-sm leading-relaxed text-ink-300">{point.body}</p>
			</div>
		{/each}
	</div>
</Section>
