import { defineConfig, devices } from '@playwright/test';

const PORT = 4173;
const BASE_URL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: 0,
	reporter: [['list']],
	use: {
		baseURL: BASE_URL,
		// Default to the bundled Chromium; override with PLAYWRIGHT_CHANNEL=chrome
		// to run against a locally installed Chrome instead.
		...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}),
		trace: 'off'
	},
	projects: [
		{
			name: 'desktop',
			use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } }
		},
		{
			name: 'mobile',
			use: {
				...devices['iPhone 12'],
				// Run mobile emulation on the installed Chromium rather than WebKit
				browserName: 'chromium',
				viewport: { width: 375, height: 812 }
			}
		}
	],
	webServer: {
		command: `pnpm exec vite preview --host 127.0.0.1 --port ${PORT} --strictPort`,
		url: BASE_URL,
		reuseExistingServer: !process.env.CI,
		timeout: 30_000
	}
});
