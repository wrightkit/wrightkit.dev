import { defaultLocale, localeInfo, locales } from '$lib/locales';
import { pageUrl } from '$lib/seo';

export const prerender = true;

/** Every page in every locale, with the same alternates the HTML `hreflang` links declare. */
const routes = ['', '/results'];

export function GET() {
	const alternate = (route: string) => [
		...locales.map(
			(locale) =>
				`    <xhtml:link rel="alternate" hreflang="${localeInfo[locale].tag}" href="${pageUrl(locale, route)}"/>`
		),
		`    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl(defaultLocale, route)}"/>`
	].join('\n');

	const urls = routes
		.flatMap((route) =>
			locales.map(
				(locale) => `  <url>
    <loc>${pageUrl(locale, route)}</loc>
${alternate(route)}
  </url>`
			)
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
