<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import InstallSection from '$lib/components/InstallSection.svelte';
	import FeaturesSection from '$lib/components/FeaturesSection.svelte';
	import CompatibilitySection from '$lib/components/CompatibilitySection.svelte';
	import WrightSection from '$lib/components/WrightSection.svelte';
	import AgentsSection from '$lib/components/AgentsSection.svelte';
	import OpenSourceSection from '$lib/components/OpenSourceSection.svelte';
	import { site } from '$lib/site';
</script>

<svelte:head>
	<title>{site.name} — {site.tagline}</title>
	<meta name="description" content={site.description} />
	<link rel="canonical" href={site.url} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.brand} />
	<meta property="og:title" content={`${site.name} — ${site.tagline}`} />
	<meta property="og:description" content={site.description} />
	<meta property="og:url" content={site.url} />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<Hero />
<InstallSection />
<FeaturesSection />
<CompatibilitySection />
<WrightSection />
<AgentsSection />
<OpenSourceSection />
