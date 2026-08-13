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

## Content

All copy, navigation, and capability claims live in
`src/lib/site.ts`. Capability terms are grounded in the
[`wright`](https://github.com/wrightkit) repository's current state — no
invented CLI commands, metrics, or features.
