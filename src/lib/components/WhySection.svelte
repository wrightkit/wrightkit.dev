<script lang="ts">
	import Section from './Section.svelte';
	import { why } from '$lib/site';
</script>

<Section title={why.title} lead={why.lead}>
	<ul class="mt-10 max-w-2xl divide-y divide-ink-800 border-y border-ink-800">
		{#each why.items as item (item.title)}
			<li class="py-6">
				<h3 class="text-base font-semibold text-ink-50">{item.title}</h3>
				<p class="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-300">{item.body}</p>
				<p class="path mt-3">{item.artifact}</p>
			</li>
		{/each}
	</ul>
</Section>
