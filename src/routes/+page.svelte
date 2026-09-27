<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import ToolingSection from '$lib/components/ToolingSection.svelte';
	import AgentsSection from '$lib/components/AgentsSection.svelte';
	import LanguagesSection from '$lib/components/LanguagesSection.svelte';
	import InstallSection from '$lib/components/InstallSection.svelte';
	import EcosystemSection from '$lib/components/EcosystemSection.svelte';
	import { site } from '$lib/site';

	const title = `${site.name}: ${site.tagline}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={site.description} />
	<link rel="canonical" href={site.url} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.brand} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={site.description} />
	<meta property="og:url" content={site.url} />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<Hero />
<ToolingSection />
<AgentsSection />
<LanguagesSection />
<InstallSection />
<EcosystemSection />
