/**
 * Standalone launch check for the built site.
 *
 * Serves the `build/` directory with `vite preview`, loads it in a headless
 * Chromium at desktop (1280x800) and mobile (375x812) viewports, and asserts
 * the gating behaviors: zero page/console errors, hero present with real
 * geometry, no horizontal overflow, a substantially filled page, and the
 * primary CTA navigating to the public GitHub destination.
 *
 * Usage: node scripts/launch-check.mjs [outdir] [port]
 * Defaults: outdir = .launch-check, port = 4317
 */
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { chromium } from '@playwright/test';

const OUT_DIR = resolve(process.argv[2] ?? '.launch-check');
const PORT = Number(process.argv[3] ?? 4317);
const BASE_URL = `http://127.0.0.1:${PORT}`;
const GITHUB_ORG = 'https://github.com/wrightkit';

const VIEWPORTS = [
	{ name: 'desktop', label: 'launch1', width: 1280, height: 800, screenshot: 'home-desktop.png' },
	{ name: 'mobile', label: 'launch2', width: 375, height: 812, screenshot: 'home-mobile.png' }
];

mkdirSync(OUT_DIR, { recursive: true });

function log(out, file) {
	process.stdout.write(out);
	writeFileSync(join(OUT_DIR, file), out);
}

async function waitForServer(url, timeoutMs = 30_000) {
	const deadline = Date.now() + timeoutMs;
	while (Date.now() < deadline) {
		try {
			const res = await fetch(url);
			if (res.ok) return;
		} catch {
			/* not up yet */
		}
		await new Promise((r) => setTimeout(r, 250));
	}
	throw new Error(`server did not respond at ${url}`);
}

async function runViewport(browser, viewport) {
	const context = await browser.newContext({
		viewport: { width: viewport.width, height: viewport.height }
	});
	const page = await context.newPage();
	const errors = [];
	page.on('pageerror', (err) => errors.push(`pageerror: ${err}`));
	page.on('console', (msg) => {
		if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`);
	});

	await page.goto(BASE_URL, { waitUntil: 'networkidle' });

	const out = [`--- ${viewport.name} (${viewport.width}x${viewport.height}) ---\n`];
	const check = (label, ok, detail = '') => {
		out.push(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}\n`);
		return ok;
	};

	let allOk = true;

	// Hero present with non-zero rendered geometry
	const hero = await page.evaluate(() => {
		const h1 = document.querySelector('h1');
		if (!h1) return null;
		const r = h1.getBoundingClientRect();
		return { text: h1.textContent, width: r.width, height: r.height };
	});
	const heroOk = !!hero && hero.text.includes('Overwatch Workshop') && hero.width > 0 && hero.height > 0;
	allOk = check(
		'hero headline present with geometry',
		heroOk,
		hero ? `"${hero.text.trim().slice(0, 60)}…" ${Math.round(hero.width)}x${Math.round(hero.height)}` : 'no h1'
	) && allOk;

	const cta = page.getByRole('link', { name: /Explore on GitHub/ }).first();
	const ctaVisible = await cta.isVisible();
	const ctaHref = await cta.getAttribute('href');
	allOk = check('primary CTA visible', ctaVisible, ctaHref ?? 'no href') && allOk;
	allOk = check('primary CTA href is GitHub org', ctaHref === GITHUB_ORG, ctaHref ?? '') && allOk;

	// No horizontal overflow
	const geometry = await page.evaluate(() => ({
		scrollWidth: document.documentElement.scrollWidth,
		clientWidth: document.documentElement.clientWidth,
		scrollHeight: document.documentElement.scrollHeight,
		clientHeight: document.documentElement.clientHeight
	}));
	const noOverflow = geometry.scrollWidth <= geometry.clientWidth;
	allOk = check(
		'no horizontal overflow',
		noOverflow,
		`scrollWidth ${geometry.scrollWidth} <= clientWidth ${geometry.clientWidth}`
	) && allOk;

	// Substantially filled page
	const filled = geometry.scrollHeight > geometry.clientHeight;
	allOk = check(
		'page substantially filled',
		filled,
		`scrollHeight ${geometry.scrollHeight} > clientHeight ${geometry.clientHeight}`
	) && allOk;

	// CTA navigates to the GitHub destination. GitHub's web site may be
	// unreachable from the test environment, so intercept the destination and
	// fulfill it locally; the committed URL is what we assert.
	await context.route('https://github.com/**', (route) =>
		route.fulfill({ status: 200, contentType: 'text/html', body: '<title>GitHub</title>' })
	);
	const [popup] = await Promise.all([context.waitForEvent('page'), cta.click({ noWaitAfter: true })]);
	await popup.waitForURL(GITHUB_ORG, { timeout: 10_000 });
	const popupUrl = popup.url();
	const urlMatch = popupUrl.startsWith(GITHUB_ORG);
	allOk = check('primary CTA navigates to GitHub org', urlMatch, popupUrl) && allOk;

	await page.screenshot({ path: join(OUT_DIR, viewport.screenshot), fullPage: false });
	out.push(`screenshot: ${viewport.screenshot}\n`);

	out.push(`errors: ${errors.length === 0 ? 'none' : errors.join(' | ')}\n`);
	allOk = check('zero page/console errors', errors.length === 0, errors.join(' | ') || '') && allOk;

	await context.close();
	return { out: out.join(''), ok: allOk };
}

const server = spawn(
	'pnpm',
	['exec', 'vite', 'preview', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'],
	{
		stdio: ['ignore', 'pipe', 'pipe']
	}
);
server.stdout.on('data', () => {});
server.stderr.on('data', () => {});

let ok = true;
const logLines = [];
try {
	await waitForServer(BASE_URL);
	const browser = await chromium.launch(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {});
	for (const viewport of VIEWPORTS) {
		const result = await runViewport(browser, viewport);
		logLines.push(result.out);
		ok = ok && result.ok;
	}
	await browser.close();
} catch (err) {
	logLines.push(`FATAL: ${err}\n`);
	ok = false;
} finally {
	server.kill('SIGTERM');
}

log(`\nRESULT: ${ok ? 'PASS' : 'FAIL'}\n`, 'result.log');
log(logLines.join('\n'), ok ? 'launch-ok.log' : 'launch-fail.log');
writeFileSync(join(OUT_DIR, 'result.log'), `RESULT: ${ok ? 'PASS' : 'FAIL'}\n`);
process.exit(ok ? 0 : 1);
