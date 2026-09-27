# wrightkit.dev

The public website for **WrightKit**, a development toolchain for the Overwatch
Workshop. It is a static, prerender-first SvelteKit site.

## Content contract

Positioning follows the WrightKit goal
([`wrightkit/.github` `docs/goal.md`](https://github.com/wrightkit/.github/blob/main/docs/goal.md)):
Wright is the product, tooling (diagnostics, analysis, editor/CI integration,
agent access) leads, and compilation is presented as serving those workflows.
Compatibility means structural convergence with the upstream compiler, compared
as canonical Workshop programs, never text similarity.

Public capability claims must be grounded in the repository that owns the
implementation:

- `workshop-rs` for raw Workshop semantics, catalog/settings/localization,
  parsing, validation, and emission;
- `opy-rs` for OverPy syntax/semantics/compiler/reconstruction support;
- `deltin-rs` for DeltinScript/OSTW syntax/semantics/compiler/reconstruction
  support;
- `wright` for the unified tooling product: CLI commands, lint, analysis,
  language server, CI output, and agent-facing APIs;
- `language-provider-protocol` for LPP protocol contracts.

Do not treat an issue state, an unreleased branch, or a hidden command as proof
that a capability ships. Describe direction (for example the intent-driven
agent loop) as direction, not as current behavior. Keep internal terms such as
WIR, HIR, frontend, and provider out of primary homepage messaging.

All copy, navigation, and support claims live in `src/lib/site.ts`. The hero
terminal shows real `wright` output; refresh it when the CLI output changes.

## Stack

- SvelteKit with `@sveltejs/adapter-static`
- Svelte 5
- TypeScript
- Tailwind CSS v4

The site is fully prerendered to static HTML; there is no server runtime or
client-side data service.

## Local development

Requires Node.js 20.19+ and `pnpm`.

```sh
pnpm install
pnpm dev
pnpm check
```

## Build and preview

```sh
pnpm build
pnpm preview
```
