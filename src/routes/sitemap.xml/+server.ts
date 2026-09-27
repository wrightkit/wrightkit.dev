import { defaultLocale, localeInfo, locales } from '$lib/locales';
import { pageUrl } from '$lib/seo';

export const prerender = true;

/** Both homepages, with the same alternates the HTML `hreflang` links declare. */
export function GET() {
	const alternates = [
		...locales.map(
			(locale) =>
				`    <xhtml:link rel="alternate" hreflang="${localeInfo[locale].tag}" href="${pageUrl(locale)}"/>`
		),
		`    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl(defaultLocale)}"/>`
	].join('\n');

	const urls = locales
		.map(
			(locale) => `  <url>
    <loc>${pageUrl(locale)}</loc>
${alternates}
  </url>`
		)
		.join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

	return new Response(body, {
		headers: {
			'content-type': 'application/xml; charset=utf-8'
		}
	});
}
