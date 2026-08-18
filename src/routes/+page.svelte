<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import InstallSection from '$lib/components/InstallSection.svelte';
	import PillarsSection from '$lib/components/PillarsSection.svelte';
	import CapabilitiesSection from '$lib/components/CapabilitiesSection.svelte';
	import CompatibilitySection from '$lib/components/CompatibilitySection.svelte';
	import EcosystemSection from '$lib/components/EcosystemSection.svelte';
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
<PillarsSection />
<CapabilitiesSection />
<CompatibilitySection />
<EcosystemSection />
<OpenSourceSection />
