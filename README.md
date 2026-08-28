# wrightkit.dev

The public website for **WrightKit**, a development toolchain for the Overwatch
Workshop. It is a static, prerender-first SvelteKit site.

## Content contract

Public capability claims must be grounded in the repository that owns the
implementation:

- `workshop-rs` for raw Workshop semantics, WIR, catalog/settings/localization,
  parsing, validation, and emission;
- `opy-rs` for OverPy syntax/semantics/compiler/reconstruction support;
- `del-rs` for DEL/OSTW syntax/semantics/runtime/compiler/reconstruction support;
- `wright` for the unified tooling/integration product: lint, analysis,
  validated source edits, agents, CI/embedding, language services, and
  orchestration;
- `language-provider-protocol` for LPP protocol contracts.

Do not treat old Wright monolith behavior, an existing CLI command, or an issue
state as proof that an owning implementation currently supports the full
capability.

Terminology on the website follows the ecosystem architecture:

- `opy-rs` and `del-rs` are **standalone language implementations**;
- `workshop-rs` is the **standalone Workshop implementation and canonical
  Workshop core**;
- **frontend** describes an internal source-to-semantic stage;
- **provider** describes an integration role that an implementation may expose
  through LPP;
- Wright is the **unified tooling and integration product**.

All copy, navigation, and compatibility claims live in `src/lib/site.ts` and
should remain synchronized with current merged/released evidence.

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
