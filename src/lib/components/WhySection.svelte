<script lang="ts">
	import Section from './Section.svelte';
	import { why } from '$lib/site';
</script>

<Section index="01" eyebrow={why.eyebrow} title={why.title} lead={why.lead}>
	<div class="mt-14 grid gap-px overflow-hidden rounded border border-ink-800 bg-ink-800 sm:grid-cols-2 lg:grid-cols-3">
		{#each why.items as item, i (item.title)}
			<div class="flex flex-col gap-4 bg-ink-950 p-7 sm:p-8">
				<span class="font-mono text-xs text-accent-500">{String(i + 1).padStart(2, '0')}</span>
				<h3 class="font-sans text-lg font-semibold text-ink-50">{item.title}</h3>
				<p class="text-sm leading-relaxed text-ink-300">{item.body}</p>
				<p class="mt-auto pt-4 font-mono text-xs text-ink-500">{item.artifact}</p>
			</div>
		{/each}
	</div>
</Section>
