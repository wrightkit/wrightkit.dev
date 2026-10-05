#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');

// Each locale must ship as its own prerendered page with correct language
// metadata, and commands and captured CLI output must stay untranslated.
const SITE_URL = 'https://wrightkit.dev';
const pages = [
	{
		file: 'index.html',
		lang: 'en',
		canonical: `${SITE_URL}/`,
		image: `${SITE_URL}/og-en.png`,
		imageAlt: 'WrightKit, tooling for Overwatch Workshop development'
	},
	{
		file: 'zh-CN.html',
		lang: 'zh-CN',
		canonical: `${SITE_URL}/zh-CN`,
		image: `${SITE_URL}/og-zh-CN.png`,
		imageAlt: 'WrightKit，守望先锋地图工坊开发工具'
	}
];
const literals = [
	'curl -fsSL https://install.wrightkit.dev/wright/install.sh | bash',
	'brew install wrightkit/tap/wright',
	'wright lint rules.txt',
	'warning[min-wait-loop]: loop body waits at the workshop minimum rate',
	'warning[while-without-wait]: loop body contains no wait call'
];

for (const page of pages) {
	const path = resolve(ROOT_DIR, 'build', page.file);
	if (!existsSync(path)) {
		console.error(`[verify-build] Error: build/${page.file} does not exist.`);
		process.exit(1);
	}
	const html = readFileSync(path, 'utf8');
	const expected = [
		`<html lang="${page.lang}"`,
		`<link rel="canonical" href="${page.canonical}"`,
		...pages.map((alt) => `<link rel="alternate" hreflang="${alt.lang}" href="${alt.canonical}"`),
		`<link rel="alternate" hreflang="x-default" href="${SITE_URL}/"`,
		`<meta property="og:image" content="${page.image}"`,
		`<meta property="og:image:width" content="1200"`,
		`<meta property="og:image:height" content="630"`,
		`<meta property="og:image:alt" content="${page.imageAlt}"`,
		`<meta name="twitter:card" content="summary_large_image"`,
		`<meta name="twitter:image" content="${page.image}"`,
		`<meta itemprop="image" content="${page.image}"`,
		`<meta name="robots" content="index, follow, max-image-preview:large"`,
		`<meta name="applicable-device" content="pc,mobile"`,
		`<script type="application/ld+json">`,
		`"@type":"WebPage"`,
		`"url":"${page.canonical}"`,
		...literals
	];
	for (const snippet of expected) {
		if (!html.includes(snippet)) {
			console.error(`[verify-build] Error: build/${page.file} is missing: ${snippet}`);
			process.exit(1);
		}
	}
}

function pngSize(path) {
	const bytes = readFileSync(path);
	const png = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
	if (bytes.length < 24 || !bytes.subarray(0, 8).equals(png) || bytes.toString('ascii', 12, 16) !== 'IHDR') {
		return null;
	}
	return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

const images = [
	{ file: 'og-en.png', width: 1200, height: 630 },
	{ file: 'og-zh-CN.png', width: 1200, height: 630 },
	{ file: 'apple-touch-icon.png', width: 180, height: 180 },
	{ file: 'favicon-32.png', width: 32, height: 32 }
];

for (const image of images) {
	const path = resolve(ROOT_DIR, 'build', image.file);
	const size = existsSync(path) ? pngSize(path) : null;
	if (!size || size.width !== image.width || size.height !== image.height) {
		console.error(
			`[verify-build] Error: build/${image.file} must be a ${image.width}×${image.height} PNG.`
		);
		process.exit(1);
	}
}

const resultsPages = [
	{ file: 'results.html', lang: 'en', canonical: `${SITE_URL}/results`, title: 'Wright Agent Score' },
	{ file: 'zh-CN/results.html', lang: 'zh-CN', canonical: `${SITE_URL}/zh-CN/results`, title: 'Wright Agent Score' }
];
for (const page of resultsPages) {
	const path = resolve(ROOT_DIR, 'build', page.file);
	if (!existsSync(path)) {
		console.error(`[verify-build] Error: build/${page.file} does not exist.`);
		process.exit(1);
	}
	const html = readFileSync(path, 'utf8');
	const expected = [
		`<html lang="${page.lang}"`,
		`<link rel="canonical" href="${page.canonical}"`,
		`<link rel="alternate" hreflang="x-default" href="${SITE_URL}/results"`,
		page.title
	];
	for (const snippet of expected) {
		if (!html.includes(snippet)) {
			console.error(`[verify-build] Error: build/${page.file} is missing: ${snippet}`);
			process.exit(1);
		}
	}
}

const sitemap = readFileSync(resolve(ROOT_DIR, 'build/sitemap.xml'), 'utf8');
for (const page of [...pages, ...resultsPages]) {
	if (!sitemap.includes(`<loc>${page.canonical}</loc>`)) {
		console.error(`[verify-build] Error: sitemap.xml is missing ${page.canonical}`);
		process.exit(1);
	}
}
if (!sitemap.includes('hreflang="x-default"')) {
	console.error('[verify-build] Error: sitemap.xml is missing x-default.');
	process.exit(1);
}

const robots = readFileSync(resolve(ROOT_DIR, 'build/robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) {
	console.error('[verify-build] Error: robots.txt is missing the sitemap URL.');
	process.exit(1);
}

console.log(`[verify-build] OK: ${pages.length + resultsPages.length} localized pages, share images, and sitemap verified.`);
