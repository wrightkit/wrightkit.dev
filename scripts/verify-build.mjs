#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');

const installers = [
	{
		name: 'install.sh',
		path: resolve(ROOT_DIR, 'build/install.sh'),
		validate(content) {
			return content.startsWith('#!/usr/bin/env bash') || content.startsWith('#!/bin/bash');
		},
		error: 'build/install.sh has an invalid shebang.'
	},
	{
		name: 'install.ps1',
		path: resolve(ROOT_DIR, 'build/install.ps1'),
		validate(content) {
			return content.includes('[CmdletBinding()]') && content.includes('x86_64-pc-windows-msvc');
		},
		error: 'build/install.ps1 is missing the expected PowerShell installer contract.'
	}
];

for (const installer of installers) {
	if (!existsSync(installer.path)) {
		console.error(`[verify-build] Error: build/${installer.name} does not exist.`);
		process.exit(1);
	}

	const content = readFileSync(installer.path, 'utf8');
	if (!installer.validate(content)) {
		console.error(`[verify-build] Error: ${installer.error}`);
		process.exit(1);
	}
	if (!content.includes('wright') || !content.includes('wright-lsp')) {
		console.error(`[verify-build] Error: build/${installer.name} is missing wright binary references.`);
		process.exit(1);
	}
}

// Each locale must ship as its own prerendered page with correct language
// metadata, and commands and captured CLI output must stay untranslated.
const SITE_URL = 'https://wrightkit.dev';
const pages = [
	{ file: 'index.html', lang: 'en', canonical: `${SITE_URL}/` },
	{ file: 'zh-CN.html', lang: 'zh-CN', canonical: `${SITE_URL}/zh-CN` }
];
const literals = [
	'curl -fsSL https://wrightkit.dev/install.sh | bash',
	'brew install wrightkit/tap/wright',
	'wright check src/main.opy',
	"error[unknown-member]: unknown member 'setHealht'"
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

console.log(`[verify-build] OK: installers and ${pages.length} localized pages verified.`);
