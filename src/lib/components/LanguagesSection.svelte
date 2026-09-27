<script lang="ts">
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
		{#each languages as item (item.id)}
			<li class="surface flex flex-col p-5 sm:p-6">
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

	<div class="surface mt-4 p-5 sm:p-8">
		<h3 class="text-[1.0625rem] font-semibold tracking-[-0.012em] text-ink-50">
			{copy.compatibility.title}
		</h3>
		<p class="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-pretty text-ink-400">
			{copy.compatibility.lead}
		</p>
		<ul
			class="mt-5 grid gap-x-6 gap-y-2 text-[0.9375rem] text-ink-200 sm:grid-cols-2 lg:grid-cols-4"
			aria-label={copy.compatibility.criteriaLabel}
		>
			{#each copy.compatibility.criteria as criterion, i (i)}
				<li class="border-t border-ink-800 pt-2">{criterion}</li>
			{/each}
		</ul>
	</div>
</Section>
