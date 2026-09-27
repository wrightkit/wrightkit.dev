<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/state';
	import { contentForPath } from '$lib/i18n';

	let content = $derived(contentForPath(page.url.pathname));

	$effect(() => {
		document.documentElement.lang = content.language.htmlLang;
	});
</script>

<a
	href="#main"
	class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-on-accent"
>
	{content.ui.skipToContent}
</a>
<Header />
<main id="main">
	<slot />
</main>
<Footer />
