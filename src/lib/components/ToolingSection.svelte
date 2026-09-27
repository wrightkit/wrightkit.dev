<script lang="ts">
	import Section from './Section.svelte';
	import { tooling } from '$lib/site';
	import { currentMessages } from '$lib/content';

	const t = $derived(currentMessages());
</script>

<Section id="tooling" eyebrow={t.tooling.eyebrow} title={t.tooling.title} lead={t.tooling.lead}>
	<ul class="mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
		{#each tooling as item (item.id)}
			<li class="surface flex flex-col p-5 sm:p-6">
				<h3 class="text-[1.0625rem] font-semibold tracking-[-0.012em] text-ink-50">{t.tooling.items[item.id].title}</h3>
				<p class="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-400">{t.tooling.items[item.id].body}</p>
				<code class="mt-5 self-start rounded-control bg-ink-950/80 px-2.5 py-1 font-mono text-xs text-ink-300">
					{item.command}
				</code>
			</li>
		{/each}
	</ul>
</Section>
