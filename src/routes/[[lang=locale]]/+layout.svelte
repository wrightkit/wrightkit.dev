<script lang="ts">
	import '../../app.css';
	import type { Snippet } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { localeInfo } from '$lib/locales';
	import { currentLocale, currentMessages } from '$lib/content';

	let { children }: { children: Snippet } = $props();

	const t = $derived(currentMessages());

	// Prerendered HTML gets `lang` from hooks.server.ts; keep it right after client-side switches.
	$effect(() => {
		document.documentElement.lang = localeInfo[currentLocale()].tag;
	});
</script>

<a
	href="#main"
	class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-on-accent"
>
	{t.ui.skipToContent}
</a>
<Header />
<main id="main">
	{@render children()}
</main>
<Footer />
