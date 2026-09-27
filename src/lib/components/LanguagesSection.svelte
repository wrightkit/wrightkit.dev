<script lang="ts">
	import { reveal } from '$lib/reveal';
	import Section from './Section.svelte';
	import { languages, type SupportTone } from '$lib/site';
	import { currentMessages } from '$lib/content';

	const t = $derived(currentMessages());
	const copy = $derived(t.languages);

	const badge: Record<SupportTone, string> = {
		supported: 'bg-accent-500/15 text-accent-400',
		partial: 'bg-ink-800 text-ink-200',
		pending: 'bg-ink-900 text-ink-400 ring-1 ring-inset ring-ink-800'
	};
</script>

<Section id="languages" title={copy.title} lead={copy.lead}>
	<ul class="mt-10 grid gap-3 sm:mt-14 sm:gap-4 md:grid-cols-3">
		{#each languages as item, i (item.id)}
			<li class="surface flex flex-col p-5 sm:p-6" data-reveal style="--reveal-delay: {i * 70}ms" use:reveal>
				<div class="flex items-center justify-between gap-3">
					<h3 class="text-xl font-semibold tracking-[-0.016em] text-ink-50">{copy.items[item.id].name}</h3>
					<span class="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium {badge[item.tone]}">
						{copy.items[item.id].status}
					</span>
				</div>
				<p class="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-400">{copy.items[item.id].body}</p>
				<a class="text-link mt-5 self-start font-mono text-xs" href={item.ownerHref} target="_blank" rel="noreferrer">
					{item.owner}
				</a>
			</li>
		{/each}
	</ul>

</Section>
