import { site } from './site';
import { localeInfo, localePath, type Locale } from './locales';

/** Share-card image. PNG, not SVG: WeChat, QQ, and X do not unfurl SVG. */
export const shareImage = {
	width: 1200,
	height: 630,
	type: 'image/png',
	file: {
		en: 'og-en.png',
		'zh-CN': 'og-zh-CN.png'
	} as const satisfies Record<Locale, string>
};

export function pageUrl(locale: Locale): string {
	return new URL(localePath(locale), site.url).href;
}

export function shareImageUrl(locale: Locale): string {
	return new URL(`/${shareImage.file[locale]}`, site.url).href;
}

/**
 * Entity data for the page that is actually rendered. No ratings and no price:
 * the site has neither, and Google treats invented review markup as spam.
 * Localized text stays on WebPage so the two locales do not disagree about one node.
 */
export function structuredData(locale: Locale, page: { title: string; description: string }) {
	const canonical = pageUrl(locale);
	const organization = `${site.url}/#organization`;
	const website = `${site.url}/#website`;
	const software = `${site.url}/#wright`;

	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Organization',
				'@id': organization,
				name: site.name,
				url: pageUrl('en'),
				logo: {
					'@type': 'ImageObject',
					url: new URL('/apple-touch-icon.png', site.url).href,
					width: 180,
					height: 180
				},
				sameAs: [site.org]
			},
			{
				'@type': 'WebSite',
				'@id': website,
				url: pageUrl('en'),
				name: site.name,
				publisher: { '@id': organization },
				inLanguage: ['en', 'zh-CN']
			},
			{
				'@type': 'WebPage',
				'@id': `${canonical}#webpage`,
				url: canonical,
				name: page.title,
				description: page.description,
				inLanguage: localeInfo[locale].tag,
				isPartOf: { '@id': website },
				primaryImageOfPage: {
					'@type': 'ImageObject',
					url: shareImageUrl(locale),
					width: shareImage.width,
					height: shareImage.height
				},
				about: { '@id': software }
			},
			{
				'@type': 'SoftwareSourceCode',
				'@id': software,
				name: 'Wright',
				codeRepository: site.github,
				license: 'https://www.gnu.org/licenses/agpl-3.0.html',
				programmingLanguage: 'Rust',
				runtimePlatform: 'macOS, Linux, Windows',
				author: { '@id': organization }
			}
		]
	};
}

export function structuredDataJson(locale: Locale, page: { title: string; description: string }): string {
	return JSON.stringify(structuredData(locale, page)).replaceAll('<', '\\u003c');
}
