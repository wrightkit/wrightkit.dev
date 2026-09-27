<script lang="ts">
	import Section from './Section.svelte';
	import { page } from '$app/state';
	import { contentForPath } from '$lib/i18n';

	let ecosystem = $derived(contentForPath(page.url.pathname).ecosystem);
</script>

<Section id="ecosystem" eyebrow={ecosystem.eyebrow} title={ecosystem.title} lead={ecosystem.lead}>
	<ul class="mt-10 grid gap-8 sm:mt-14 md:grid-cols-3 md:gap-10">
		{#each ecosystem.principles as principle (principle.title)}
			<li class="border-t border-ink-800 pt-5">
				<h3 class="text-[1.0625rem] font-semibold tracking-[-0.012em] text-ink-50">{principle.title}</h3>
				<p class="mt-2 text-[0.9375rem] leading-relaxed text-ink-400">{principle.body}</p>
			</li>
		{/each}
	</ul>

	<ul class="surface mt-12 divide-y divide-ink-800/70 overflow-hidden sm:mt-16">
		{#each ecosystem.repos as item (item.repo)}
			<li>
				<a
					class="group flex items-center gap-4 px-5 py-4 transition-colors duration-150 hover:bg-ink-800/40 active:bg-ink-800/60 sm:px-6"
					href={item.href}
					target="_blank"
					rel="noreferrer"
				>
					<span class="min-w-0 flex-1 sm:flex sm:items-baseline sm:gap-4">
						<span class="block font-mono text-sm font-medium text-ink-100 sm:w-60 sm:shrink-0">
							{item.repo}
						</span>
						<span class="mt-0.5 block text-sm leading-relaxed text-ink-500 sm:mt-0">{item.role}</span>
					</span>
					<svg
						class="h-4 w-4 shrink-0 text-ink-600 transition-colors group-hover:text-ink-300"
						viewBox="0 0 16 16"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M5.5 10.5l5-5M6.5 5.5h4v4" />
					</svg>
				</a>
			</li>
		{/each}
	</ul>

	<div class="mt-10 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-5">
		<h3 class="shrink-0 text-sm font-medium text-ink-300">{ecosystem.nonGoals.title}</h3>
		<ul class="flex flex-wrap gap-2">
			{#each ecosystem.nonGoals.items as item (item)}
				<li class="rounded-full px-3 py-1 text-[0.8125rem] text-ink-500 ring-1 ring-inset ring-ink-800">{item}</li>
			{/each}
		</ul>
	</div>
</Section>
