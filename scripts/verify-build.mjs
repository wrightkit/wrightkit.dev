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
	{ file: 'index.html', lang: 'en', canonical: `${SITE_URL}/` },
	{ file: 'zh-CN.html', lang: 'zh-CN', canonical: `${SITE_URL}/zh-CN` }
];
const literals = [
	'curl -fsSL https://install.wrightkit.dev/wright/install.sh | bash',
	'irm https://install.wrightkit.dev/wright/install.ps1 | iex',
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
		...literals
	];
	for (const snippet of expected) {
		if (!html.includes(snippet)) {
			console.error(`[verify-build] Error: build/${page.file} is missing: ${snippet}`);
			process.exit(1);
		}
	}
}

console.log(`[verify-build] OK: ${pages.length} localized pages verified.`);
