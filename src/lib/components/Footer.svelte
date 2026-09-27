<script lang="ts">
	import Wordmark from './Wordmark.svelte';
	import { repos, site } from '$lib/site';
	import { currentMessages } from '$lib/content';

	const t = $derived(currentMessages());
</script>

<footer class="border-t border-ink-800/70 pb-[max(2.5rem,calc(1.5rem+env(safe-area-inset-bottom)))] pt-8 sm:pt-10">
	<div class="container-site flex flex-col gap-6 text-sm text-ink-500 sm:flex-row sm:items-end sm:justify-between">
		<div class="flex flex-col gap-1">
			<Wordmark compact />
			<p>{t.footer.note}</p>
			<p class="mt-3 flex flex-wrap gap-x-3 gap-y-1">
				<span class="text-ink-400">{t.footer.openSource}</span>
				{#each repos as item (item.repo)}
					<a class="text-link font-mono text-xs leading-5 text-ink-500" href={item.href} target="_blank" rel="noreferrer">{item.repo}</a>
				{/each}
			</p>
		</div>
		<p class="flex flex-wrap gap-x-2 sm:justify-end">
			<span>© 2026 {site.name}</span>
			<span aria-hidden="true">·</span>
			<a class="text-link text-ink-400" href={site.github} target="_blank" rel="noreferrer">GitHub</a>
			<span aria-hidden="true">·</span>
			<span>{site.license}</span>
		</p>
	</div>
</footer>
