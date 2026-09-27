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
that a capability ships. Planned features go in the agents section's "Coming
soon" line, never in current-capability copy. Keep internal terms such as
WIR, HIR, frontend, and provider out of primary homepage messaging. Say what a
feature does for a Workshop developer; implementation background belongs in the
owning repository's docs, not on the homepage.

Locale-independent data (URLs, commands, repository names, support status,
the hero terminal, and the "What it catches" examples) lives in
`src/lib/site.ts`. The terminal and every example show real `wright` output:
each example has a Workshop snippet per locale, written in that game client's
syntax, and must be re-run through `wright lint` when edited or when the CLI
output changes.

## Localization

English is the default at `/`; Simplified Chinese is at `/zh-CN`. There is no
browser-language redirect; readers switch from the header language menu.

- Copy lives in `src/lib/content/<locale>.ts`, typed by
  `src/lib/content/types.ts`. Records keyed by the ids in `site.ts` and
  fixed-length lists keep every locale making the same claims; change a claim
  in all locales in the same PR.
- Commands, repository names, protocol names, and CLI output stay literal.
- Write each locale for its readers, not word for word. Keep it short and
  plain: the audience is Workshop, OverPy, and OSTW developers, not compiler
  engineers. Chinese follows the zh-CN game client's Workshop terms (地图工坊,
  规则, 动作, 值, 服务器负载) and puts a space between CJK text and Latin words.
- Long Chinese headings may use `\u200b` to mark where they are allowed to
  wrap; headings otherwise break only at spaces and punctuation.
- To add a locale: add it to `src/lib/locales.ts`, add a content file, and add
  the path to `prerender.entries` in `svelte.config.js` and to
  `scripts/verify-build.mjs`.

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
