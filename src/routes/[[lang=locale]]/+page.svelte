<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import StartSection from '$lib/components/StartSection.svelte';
	import FeaturesSection from '$lib/components/FeaturesSection.svelte';
	import ToolingSection from '$lib/components/ToolingSection.svelte';
	import AgentsSection from '$lib/components/AgentsSection.svelte';
	import LanguagesSection from '$lib/components/LanguagesSection.svelte';
	import InstallSection from '$lib/components/InstallSection.svelte';
	import { site } from '$lib/site';
	import { defaultLocale, localeInfo, localePath, locales, type Locale } from '$lib/locales';
	import { currentLocale, currentMessages } from '$lib/content';

	const locale = $derived(currentLocale());
	const t = $derived(currentMessages());

	function absoluteUrl(target: Locale) {
		return new URL(localePath(target), site.url).href;
	}
</script>

<svelte:head>
	<title>{t.meta.title}</title>
	<meta name="description" content={t.meta.description} />
	<link rel="canonical" href={absoluteUrl(locale)} />
	{#each locales as alternate (alternate)}
		<link rel="alternate" hreflang={localeInfo[alternate].tag} href={absoluteUrl(alternate)} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={absoluteUrl(defaultLocale)} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={t.meta.title} />
	<meta property="og:description" content={t.meta.description} />
	<meta property="og:url" content={absoluteUrl(locale)} />
	<meta property="og:locale" content={localeInfo[locale].og} />
	{#each locales.filter((l) => l !== locale) as alternate (alternate)}
		<meta property="og:locale:alternate" content={localeInfo[alternate].og} />
	{/each}
	<meta name="twitter:card" content="summary" />
</svelte:head>

<Hero />
<StartSection />
<FeaturesSection />
<ToolingSection />
<LanguagesSection />
<AgentsSection />
<InstallSection />
