<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import StartSection from '$lib/components/StartSection.svelte';
	import FeaturesSection from '$lib/components/FeaturesSection.svelte';
	import ToolingSection from '$lib/components/ToolingSection.svelte';
	import AgentsSection from '$lib/components/AgentsSection.svelte';
	import LanguagesSection from '$lib/components/LanguagesSection.svelte';
	import InstallSection from '$lib/components/InstallSection.svelte';
	import PageHead from '$lib/components/PageHead.svelte';
	import { currentMessages } from '$lib/content';

	const t = $derived(currentMessages());
</script>

<PageHead title={t.meta.title} description={t.meta.description} imageAlt={t.meta.imageAlt} keywords={t.meta.keywords} />

<Hero />
<StartSection />
<FeaturesSection />
<ToolingSection />
<LanguagesSection />
<AgentsSection />
<InstallSection />
