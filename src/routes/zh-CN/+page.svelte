<script lang="ts">
	import { page } from '$app/state';
	import Hero from '$lib/components/Hero.svelte';
	import ToolingSection from '$lib/components/ToolingSection.svelte';
	import AgentsSection from '$lib/components/AgentsSection.svelte';
	import LanguagesSection from '$lib/components/LanguagesSection.svelte';
	import InstallSection from '$lib/components/InstallSection.svelte';
	import EcosystemSection from '$lib/components/EcosystemSection.svelte';
	import { alternateLocales, contentForPath } from '$lib/i18n';

	let content = $derived(contentForPath(page.url.pathname));
	let title = $derived(`${content.site.name}: ${content.site.tagline}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={content.site.description} />
	<link rel="canonical" href={content.language.canonical} />
	{#each alternateLocales as alternate (alternate.hreflang)}
		<link rel="alternate" hreflang={alternate.hreflang} href={alternate.href} />
	{/each}
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={content.site.brand} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={content.site.description} />
	<meta property="og:url" content={content.language.canonical} />
	<meta property="og:locale" content={content.language.ogLocale} />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<Hero />
<ToolingSection />
<AgentsSection />
<LanguagesSection />
<InstallSection />
<EcosystemSection />
