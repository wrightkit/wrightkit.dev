#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');
const BUILD_INSTALLER = resolve(ROOT_DIR, 'build/install.sh');

if (!existsSync(BUILD_INSTALLER)) {
	console.error('[verify-build] Error: build/install.sh does not exist.');
	process.exit(1);
}

const content = readFileSync(BUILD_INSTALLER, 'utf8');
if (!content.startsWith('#!/usr/bin/env bash') && !content.startsWith('#!/bin/bash')) {
	console.error('[verify-build] Error: build/install.sh has invalid shebang.');
	process.exit(1);
}
if (!content.includes('wright') || !content.includes('wright-lsp')) {
	console.error('[verify-build] Error: build/install.sh is missing wright binary references.');
	process.exit(1);
}
