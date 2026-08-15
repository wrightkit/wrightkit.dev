#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');
const STATIC_DIR = resolve(ROOT_DIR, 'static');
const TARGET_FILE = resolve(STATIC_DIR, 'install.sh');

const LOCAL_CANONICAL_PATH = resolve(ROOT_DIR, '../wright/install.sh');
const REMOTE_CANONICAL_URL =
	process.env.WRIGHT_INSTALLER_URL ||
	'https://raw.githubusercontent.com/wrightkit/wright/main/install.sh';

async function getInstallerContent() {
	const envPath = process.env.WRIGHT_INSTALLER_PATH;
	if (envPath && existsSync(envPath)) {
		return readFileSync(envPath, 'utf8');
	}

	if (existsSync(LOCAL_CANONICAL_PATH)) {
		return readFileSync(LOCAL_CANONICAL_PATH, 'utf8');
	}

	const response = await fetch(REMOTE_CANONICAL_URL);
	if (!response.ok) {
		throw new Error(
			`Failed to fetch installer from ${REMOTE_CANONICAL_URL}: ${response.status} ${response.statusText}`
		);
	}
	return await response.text();
}

function validateInstaller(content) {
	if (!content || typeof content !== 'string') {
		throw new Error('Installer content is empty or invalid.');
	}
	if (!content.startsWith('#!/usr/bin/env bash') && !content.startsWith('#!/bin/bash')) {
		throw new Error('Installer must start with bash shebang.');
	}
	if (!content.includes('wright') || !content.includes('wright-lsp')) {
		throw new Error('Installer content missing expected binary definitions (wright / wright-lsp).');
	}
	if (content.length < 500) {
		throw new Error(`Installer content is suspiciously short (${content.length} bytes).`);
	}
}

async function main() {
	const content = await getInstallerContent();
	validateInstaller(content);

	if (!existsSync(STATIC_DIR)) {
		mkdirSync(STATIC_DIR, { recursive: true });
	}

	writeFileSync(TARGET_FILE, content, 'utf8');
}

main().catch((err) => {
	console.error('[sync-installer] Error:', err.message);
	process.exit(1);
});
