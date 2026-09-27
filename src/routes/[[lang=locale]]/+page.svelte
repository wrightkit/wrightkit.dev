<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import StartSection from '$lib/components/StartSection.svelte';
	import FeaturesSection from '$lib/components/FeaturesSection.svelte';
	import ToolingSection from '$lib/components/ToolingSection.svelte';
	import AgentsSection from '$lib/components/AgentsSection.svelte';
	import LanguagesSection from '$lib/components/LanguagesSection.svelte';
	import InstallSection from '$lib/components/InstallSection.svelte';
	import { site } from '$lib/site';
	import { defaultLocale, localeInfo, locales } from '$lib/locales';
	import { currentLocale, currentMessages } from '$lib/content';
	import { pageUrl, shareImage, shareImageUrl, structuredDataJson } from '$lib/seo';

	const locale = $derived(currentLocale());
	const t = $derived(currentMessages());
	const image = $derived(shareImageUrl(locale));
	const ld = $derived(
		structuredDataJson(locale, { title: t.meta.title, description: t.meta.description })
	);
</script>

<svelte:head>
	<title>{t.meta.title}</title>
	<meta name="description" content={t.meta.description} />
	<meta name="keywords" content={t.meta.keywords} />
	<meta name="robots" content="index, follow, max-image-preview:large" />
	<meta name="applicable-device" content="pc,mobile" />
	<link rel="canonical" href={pageUrl(locale)} />
	{#each locales as alternate (alternate)}
		<link rel="alternate" hreflang={localeInfo[alternate].tag} href={pageUrl(alternate)} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={pageUrl(defaultLocale)} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={t.meta.title} />
	<meta property="og:description" content={t.meta.description} />
	<meta property="og:url" content={pageUrl(locale)} />
	<meta property="og:locale" content={localeInfo[locale].og} />
	{#each locales.filter((l) => l !== locale) as alternate (alternate)}
		<meta property="og:locale:alternate" content={localeInfo[alternate].og} />
	{/each}
	<meta property="og:image" content={image} />
	<meta property="og:image:type" content={shareImage.type} />
	<meta property="og:image:width" content={String(shareImage.width)} />
	<meta property="og:image:height" content={String(shareImage.height)} />
	<meta property="og:image:alt" content={t.meta.imageAlt} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={t.meta.title} />
	<meta name="twitter:description" content={t.meta.description} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:image:alt" content={t.meta.imageAlt} />
	<!-- QQ and Qzone read itemprop; WeChat, Weibo, DingTalk, Feishu, and Zhihu read Open Graph. -->
	<meta itemprop="name" content={t.meta.title} />
	<meta itemprop="description" content={t.meta.description} />
	<meta itemprop="image" content={image} />
	{@html `<script type="application/ld+json">${ld}</script>`}
</svelte:head>

<Hero />
<StartSection />
<FeaturesSection />
<ToolingSection />
<LanguagesSection />
<AgentsSection />
<InstallSection />
