<script lang="ts">
	import { reveal } from '$lib/reveal';
	import Section from './Section.svelte';
	import { examples } from '$lib/site';
	import { currentLocale, currentMessages } from '$lib/content';

	const t = $derived(currentMessages());
	const locale = $derived(currentLocale());

	const tone = {
		error: 'text-[light-dark(#b42318,#ff7b72)]',
		warning: 'text-[light-dark(#b54708,#ff9a4d)]',
		info: 'text-[light-dark(#175cd3,#79c0ff)]'
	} as const;
</script>

<Section id="features" title={t.features.title} lead={t.features.lead}>
	<ul class="mt-10 grid gap-3 sm:mt-14 sm:gap-4 md:grid-cols-2">
		{#each examples as example, i (example.id)}
			<li class="surface flex min-w-0 flex-col p-5 sm:p-6" data-reveal style="--reveal-delay: {i * 70}ms" use:reveal>
				<h3 class="text-[1.0625rem] font-semibold tracking-[-0.012em] text-ink-50">
					{t.features.examples[example.id].title}
				</h3>
				<p class="mt-2 text-[0.9375rem] leading-relaxed text-ink-400">{t.features.examples[example.id].body}</p>
				<div class="mt-5 flex flex-1 flex-col justify-end">
					<pre
						class="overflow-x-auto rounded-control bg-ink-950/80 px-3.5 py-3 font-mono text-xs leading-[1.7] text-ink-200 [tab-size:4]"
						lang={locale}><code>{example.code[locale]}</code></pre>
					<p
						class="mt-2.5 break-words font-mono text-xs leading-relaxed {tone[example.kind]}"
						data-reveal="fade"
						style="--reveal-delay: {i * 70 + 450}ms"
						use:reveal
					>
						{example.finding[locale]}
					</p>
				</div>
			</li>
		{/each}
	</ul>
</Section>
