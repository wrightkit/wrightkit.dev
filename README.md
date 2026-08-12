# wrightkit.dev

The public website for **Wright Kit** — modern tools for Overwatch Workshop
development. This is the v0.1 product landing page: a small, static,
prerender-first site built with SvelteKit, Svelte 5, TypeScript, and Tailwind
CSS.

## Stack

- [SvelteKit](https://kit.svelte.dev) with [`@sveltejs/adapter-static`](https://kit.svelte.dev/docs/adapter-static)
- [Svelte 5](https://svelte.dev) (runes)
- TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) — the visual system lives in
  project-owned design tokens (`src/app.css`, `@theme` block): a black/white
  neutral foundation, a restrained orange accent, and a type scale.
- [Playwright](https://playwright.dev) for the smoke test

The site is fully prerendered to static HTML — there is no server runtime,
API, backend, or client-side data fetching.

## Local development

Requires Node.js 20.19+ and `pnpm`.

```sh
pnpm install
pnpm dev
```

Open the printed URL (http://localhost:5173 by default).

## Build and preview

```sh
pnpm build     # prerenders the site into build/
pnpm preview   # serves the built output locally
```

`pnpm check` runs `svelte-check` for type checking.

## Smoke test

The smoke test builds the site, serves the static output, and drives it with
Playwright at desktop (1280×800) and mobile (375×812) viewports.

```sh
pnpm test
```

On the first run, install the Playwright Chromium browser:

```sh
pnpm exec playwright install chromium
```

The tests assert the homepage loads, key navigation targets and CTAs are
present and usable, the primary CTA points at the public GitHub org, and there
is no horizontal overflow at either viewport.

There is also a standalone launch check that captures screenshots and logs:

```sh
pnpm build
node scripts/launch-check.mjs [outdir] [port]
```

## Deployment

The `build/` directory produced by `pnpm build` is a self-contained static
artifact and can be deployed anywhere that serves static files, including
Cloudflare Pages.

For Cloudflare Pages, set:

- Build command: `pnpm install && pnpm build`
- Build output directory: `build`
- Node version: 20.19 or newer

## Content

All copy, navigation, and capability claims live in
`src/lib/site.ts`. Capability terms are grounded in the
[`wright`](https://github.com/wrightkit) repository's current state — no
invented CLI commands, metrics, or features.
