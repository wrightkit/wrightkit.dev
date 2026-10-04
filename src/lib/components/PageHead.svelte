<script lang="ts">
	import { site } from '$lib/site';
	import { defaultLocale, localeInfo, locales } from '$lib/locales';
	import { currentLocale } from '$lib/content';
	import { pageUrl, shareImage, shareImageUrl, structuredDataJson } from '$lib/seo';

	let {
		title,
		description,
		imageAlt,
		keywords,
		route = ''
	}: {
		title: string;
		description: string;
		imageAlt: string;
		keywords?: string;
		/** Path below the locale root, such as `/results`; empty for the homepage. */
		route?: string;
	} = $props();

	const locale = $derived(currentLocale());
	const image = $derived(shareImageUrl(locale));
	const ld = $derived(structuredDataJson(locale, { title, description }, route));
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	{#if keywords}<meta name="keywords" content={keywords} />{/if}
	<meta name="robots" content="index, follow, max-image-preview:large" />
	<meta name="applicable-device" content="pc,mobile" />
	<link rel="canonical" href={pageUrl(locale, route)} />
	{#each locales as alternate (alternate)}
		<link rel="alternate" hreflang={localeInfo[alternate].tag} href={pageUrl(alternate, route)} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={pageUrl(defaultLocale, route)} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={pageUrl(locale, route)} />
	<meta property="og:locale" content={localeInfo[locale].og} />
	{#each locales.filter((l) => l !== locale) as alternate (alternate)}
		<meta property="og:locale:alternate" content={localeInfo[alternate].og} />
	{/each}
	<meta property="og:image" content={image} />
	<meta property="og:image:type" content={shareImage.type} />
	<meta property="og:image:width" content={String(shareImage.width)} />
	<meta property="og:image:height" content={String(shareImage.height)} />
	<meta property="og:image:alt" content={imageAlt} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:image:alt" content={imageAlt} />
	<!-- QQ and Qzone read itemprop; WeChat, Weibo, DingTalk, Feishu, and Zhihu read Open Graph. -->
	<meta itemprop="name" content={title} />
	<meta itemprop="description" content={description} />
	<meta itemprop="image" content={image} />
	{@html `<script type="application/ld+json">${ld}</script>`}
</svelte:head>
