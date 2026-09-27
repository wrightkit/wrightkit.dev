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


const homepageChecks = [
	{
		name: 'English homepage',
		paths: [resolve(ROOT_DIR, 'build/index.html')],
		lang: 'en',
		marker: 'Workshop tooling that shows its work.'
	},
	{
		name: 'Simplified Chinese homepage',
		paths: [resolve(ROOT_DIR, 'build/zh-CN.html'), resolve(ROOT_DIR, 'build/zh-CN/index.html')],
		lang: 'zh-CN',
		marker: '让判断过程清楚可见的 Workshop 工具。'
	}
];

for (const page of homepageChecks) {
	const path = page.paths.find((candidate) => existsSync(candidate));
	if (!path) {
		console.error(`[verify-build] Error: ${page.name} was not prerendered.`);
		process.exit(1);
	}

	const content = readFileSync(path, 'utf8');
	if (!content.includes(`<html lang="${page.lang}">`)) {
		console.error(`[verify-build] Error: ${page.name} has the wrong html lang attribute.`);
		process.exit(1);
	}
	if (!content.includes(page.marker)) {
		console.error(`[verify-build] Error: ${page.name} is missing localized homepage copy.`);
		process.exit(1);
	}
}
