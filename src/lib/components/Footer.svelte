<script lang="ts">
	import Wordmark from './Wordmark.svelte';
	import { page } from '$app/state';
	import { contentForPath } from '$lib/i18n';

	let content = $derived(contentForPath(page.url.pathname));
	let site = $derived(content.site);
	let footer = $derived(content.footer);
</script>

<footer class="border-t border-ink-800/70 pb-[max(2.5rem,calc(1.5rem+env(safe-area-inset-bottom)))] pt-8 sm:pt-10">
	<div class="container-site flex flex-col gap-6 text-sm text-ink-500 sm:flex-row sm:items-end sm:justify-between">
		<div class="flex flex-col gap-1">
			<Wordmark compact />
			<p>{footer.note}</p>
		</div>
		<p class="flex flex-wrap gap-x-2 sm:justify-end">
			<span>{footer.copyright}</span>
			<span aria-hidden="true">·</span>
			<a class="text-link text-ink-400" href={site.github} target="_blank" rel="noreferrer">GitHub</a>
			<span aria-hidden="true">·</span>
			<span>{site.license}</span>
		</p>
	</div>
</footer>
