<script lang="ts">
	import Section from './Section.svelte';
	import { languages, type SupportTone } from '$lib/site';

	const badge: Record<SupportTone, string> = {
		supported: 'bg-accent-500/15 text-accent-400',
		partial: 'bg-ink-800 text-ink-200',
		pending: 'bg-ink-900 text-ink-400 ring-1 ring-inset ring-ink-800'
	};
</script>

<Section id="languages" eyebrow={languages.eyebrow} title={languages.title} lead={languages.lead}>
	<ul class="mt-10 grid gap-3 sm:mt-14 sm:gap-4 md:grid-cols-3">
		{#each languages.items as item (item.name)}
			<li class="surface flex flex-col p-5 sm:p-6">
				<div class="flex items-center justify-between gap-3">
					<h3 class="text-xl font-semibold tracking-[-0.016em] text-ink-50">{item.name}</h3>
					<span class="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium {badge[item.tone]}">
						{item.status}
					</span>
				</div>
				<p class="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-400">{item.body}</p>
				<a class="text-link mt-5 self-start font-mono text-xs" href={item.ownerHref} target="_blank" rel="noreferrer">
					{item.owner}
				</a>
			</li>
		{/each}
	</ul>

	<div class="surface mt-4 grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
		<div>
			<h3 class="text-[1.0625rem] font-semibold tracking-[-0.012em] text-ink-50">
				{languages.compatibility.title}
			</h3>
			<p class="mt-2 text-[0.9375rem] leading-relaxed text-pretty text-ink-400">
				{languages.compatibility.lead}
			</p>
			<ul class="mt-5 flex flex-wrap gap-2" aria-label="Compared structure">
				{#each languages.compatibility.criteria as criterion (criterion)}
					<li class="rounded-full bg-ink-950/80 px-3 py-1 text-[0.8125rem] text-ink-200 ring-1 ring-inset ring-ink-800">
						{criterion}
					</li>
				{/each}
			</ul>
		</div>
		<ul class="space-y-4 border-t border-ink-800 pt-6 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
			{#each languages.compatibility.notes as note (note)}
				<li class="text-[0.9375rem] leading-relaxed text-ink-300">{note}</li>
			{/each}
		</ul>
	</div>
</Section>
