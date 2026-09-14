#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');
const STATIC_DIR = resolve(ROOT_DIR, 'static');

const installers = [
	{
		name: 'install.sh',
		targetFile: resolve(STATIC_DIR, 'install.sh'),
		localPath: resolve(ROOT_DIR, '../wright/install.sh'),
		pathEnv: 'WRIGHT_INSTALLER_PATH',
		urlEnv: 'WRIGHT_INSTALLER_URL',
		remoteUrl: 'https://raw.githubusercontent.com/wrightkit/wright/main/install.sh',
		validate(content) {
			if (!content.startsWith('#!/usr/bin/env bash') && !content.startsWith('#!/bin/bash')) {
				throw new Error('install.sh must start with a bash shebang.');
			}
		}
	},
	{
		name: 'install.ps1',
		targetFile: resolve(STATIC_DIR, 'install.ps1'),
		localPath: resolve(ROOT_DIR, '../wright/install.ps1'),
		pathEnv: 'WRIGHT_WINDOWS_INSTALLER_PATH',
		urlEnv: 'WRIGHT_WINDOWS_INSTALLER_URL',
		remoteUrl: 'https://raw.githubusercontent.com/wrightkit/wright/main/install.ps1',
		validate(content) {
			if (!content.includes('[CmdletBinding()]') || !content.includes('x86_64-pc-windows-msvc')) {
				throw new Error('install.ps1 is missing the expected PowerShell installer contract.');
			}
		}
	}
];

async function getInstallerContent(installer) {
	const envPath = process.env[installer.pathEnv];
	if (envPath && existsSync(envPath)) {
		return readFileSync(envPath, 'utf8');
	}

	if (existsSync(installer.localPath)) {
		return readFileSync(installer.localPath, 'utf8');
	}

	const remoteUrl = process.env[installer.urlEnv] || installer.remoteUrl;
	const response = await fetch(remoteUrl);
	if (!response.ok) {
		throw new Error(`Failed to fetch ${installer.name} from ${remoteUrl}: ${response.status} ${response.statusText}`);
	}
	return await response.text();
}

function validateInstaller(installer, content) {
	if (!content || typeof content !== 'string') {
		throw new Error(`${installer.name} content is empty or invalid.`);
	}
	installer.validate(content);
	if (!content.includes('wright') || !content.includes('wright-lsp')) {
		throw new Error(`${installer.name} is missing expected binary definitions (wright / wright-lsp).`);
	}
	if (content.length < 500) {
		throw new Error(`${installer.name} is suspiciously short (${content.length} bytes).`);
	}
}

async function main() {
	if (!existsSync(STATIC_DIR)) {
		mkdirSync(STATIC_DIR, { recursive: true });
	}

	for (const installer of installers) {
		const content = await getInstallerContent(installer);
		validateInstaller(installer, content);
		writeFileSync(installer.targetFile, content, 'utf8');
	}
}

main().catch((err) => {
	console.error('[sync-installer] Error:', err.message);
	process.exit(1);
});
