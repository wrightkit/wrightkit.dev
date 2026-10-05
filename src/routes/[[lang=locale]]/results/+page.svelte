<script lang="ts">
	import { loadResults, type Loaded } from '$lib/bench';
	import PageHead from '$lib/components/PageHead.svelte';
	import ResultsTable from '$lib/components/ResultsTable.svelte';
	import { currentMessages } from '$lib/content';

	const t = $derived(currentMessages().results);

	let loaded = $state<Loaded | null>(null);

	$effect(() => {
		loadResults().then((value) => (loaded = value));
	});
</script>

<PageHead title={t.meta.title} description={t.meta.description} imageAlt={t.meta.imageAlt} route="/results" />

<div class="container-site py-16 sm:py-24">
	<div class="max-w-3xl">
		<p class="eyebrow">{t.eyebrow}</p>
		<h1 class="mt-2.5 text-title font-semibold text-balance text-ink-50">{t.title}</h1>
		<p class="mt-4 max-w-2xl text-lead text-pretty text-ink-400">{t.lead}</p>
	</div>

	<div class="mt-10" aria-live="polite">
		{#if !loaded}
			<p class="text-ink-400">{t.loading}</p>
		{:else if loaded.state === 'ready'}
			<ResultsTable results={loaded.results} {t} />
		{:else}
			{@const message = loaded.state === 'empty' ? t.empty : t.unsupported}
			<div class="surface p-6" data-state={loaded.state}>
				<h2 class="font-semibold text-ink-50">{message.title}</h2>
				<p class="mt-2 max-w-2xl text-ink-400">{message.body}</p>
			</div>
		{/if}
	</div>

	<div class="mt-14 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
		<section aria-labelledby="how-to-read">
			<h2 id="how-to-read" class="text-lg font-semibold text-ink-50">{t.howToRead.title}</h2>
			<ul class="mt-4 flex list-disc flex-col gap-2.5 pl-5 text-pretty marker:text-ink-600">
				{#each t.howToRead.items as item (item)}
					<li>{item}</li>
				{/each}
			</ul>
		</section>
		{#if loaded?.state === 'ready'}
			<section aria-labelledby="what-was-run">
				<h2 id="what-was-run" class="text-lg font-semibold text-ink-50">{t.ran.title}</h2>
				<dl class="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
					<dt class="text-ink-500">{t.ran.wright}</dt>
					<dd class="font-mono text-ink-100">{loaded.results.environment.wright}</dd>
					<dt class="text-ink-500">{t.ran.suite}</dt>
					<dd class="font-mono text-ink-100">{loaded.results.environment.suite}</dd>
				</dl>
			</section>
		{/if}
	</div>
</div>
