import { expect, test } from '@playwright/test';

const GITHUB_ORG = 'https://github.com/wrightkit';

test.describe('Wright Kit homepage', () => {
	test('loads, positions the product, and renders without errors or overflow', async ({
		page
	}) => {
		const errors: string[] = [];
		page.on('pageerror', (err) => errors.push(String(err)));
		page.on('console', (msg) => {
			if (msg.type() === 'error') errors.push(msg.text());
		});

		await page.goto('/');

		// Title and single top-level heading
		await expect(page).toHaveTitle(/Wright Kit/);
		const h1 = page.getByRole('heading', { level: 1 });
		await expect(h1).toHaveCount(1);
		await expect(h1).toContainText('Overwatch Workshop');
		await expect(h1).toBeVisible();

		// Key navigation targets are present
		await expect(page.getByRole('link', { name: /GitHub/ }).first()).toBeVisible();
		await expect(page.getByRole('link', { name: /Wright Kit/ }).first()).toBeVisible();

		// Primary CTA is present and usable
		const primaryCta = page.getByRole('link', { name: /Explore on GitHub/ }).first();
		await expect(primaryCta).toBeVisible();
		await expect(primaryCta).toHaveAttribute('href', GITHUB_ORG);

		// Wright product section is reachable and states its status
		await expect(page.getByRole('heading', { name: 'Wright' })).toBeVisible();
		await expect(page.getByText('Early-stage')).toBeVisible();

		// No horizontal overflow at this viewport
		const geometry = await page.evaluate(() => ({
			scrollWidth: document.documentElement.scrollWidth,
			clientWidth: document.documentElement.clientWidth,
			scrollHeight: document.documentElement.scrollHeight,
			clientHeight: document.documentElement.clientHeight
		}));
		expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth);
		// Page is substantially filled (multiple sections painted)
		expect(geometry.scrollHeight).toBeGreaterThan(geometry.clientHeight * 2);

		// No page errors or console errors
		expect(errors).toEqual([]);
	});

	test('primary CTA navigates to the public GitHub destination', async ({ page, context }) => {
		// GitHub's web site may be unreachable from the test environment;
		// intercept the destination so the popup deterministically commits the
		// real GitHub URL we assert.
		await context.route('https://github.com/**', (route) =>
			route.fulfill({ status: 200, contentType: 'text/html', body: '<title>GitHub</title>' })
		);

		await page.goto('/');
		const primaryCta = page.getByRole('link', { name: /Explore on GitHub/ }).first();

		const [popup] = await Promise.all([
			context.waitForEvent('page'),
			primaryCta.click({ noWaitAfter: true })
		]);
		await popup.waitForURL(GITHUB_ORG, { timeout: 10_000 });
		expect(popup.url()).toMatch(new RegExp(`^${GITHUB_ORG}`));
	});
});
