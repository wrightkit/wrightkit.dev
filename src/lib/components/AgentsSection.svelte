<script lang="ts">
	import Section from './Section.svelte';
	import { agents } from '$lib/site';
</script>

<Section title={agents.title} lead={agents.lead}>
	<ul class="mt-10 max-w-2xl divide-y divide-ink-800 border-y border-ink-800">
		{#each agents.points as point (point.title)}
			<li class="py-6">
				<h3 class="text-base font-semibold text-ink-50">{point.title}</h3>
				<p class="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-300">{point.body}</p>
			</li>
		{/each}
	</ul>
</Section>
