/**
 * Single source of truth for every copy string, navigation entry, and
 * capability claim on the site.
 *
 * Accuracy contract: each concrete capability term below traces to an
 * artifact in the local `wright` repository (`crates/*`, `adapter/`,
 * `compatibility/`, `docs/`). Nothing beyond that repo's evidence is claimed,
 * and no CLI commands, flags, metrics, or testimonials are invented. GitHub
 * links point only at public destinations under `github.com/wrightkit`
 * (the `wright` and `wrightkit.dev` repositories are private).
 */

export const site = {
	name: 'Wright Kit',
	url: 'https://wrightkit.dev',
	tagline: 'Tools for Overwatch Workshop',
	headline: 'Tools for Overwatch Workshop.',
	description:
		'An open-source compiler and tooling stack for Workshop text: parse it, analyze it, emit it deterministically, and hand the same JSON to a coding agent.',
	github: 'https://github.com/wrightkit',
	license: 'AGPL-3.0-or-later'
} as const;

export const nav = [{ label: 'GitHub', href: site.github, external: true }] as const;

export const hero = {
	primaryCta: { label: 'Explore on GitHub', href: site.github },
	secondaryCta: { label: 'Meet Wright', href: '#wright' },
	terminalCaption:
		'wright-tool: read-only semantic service over stdin/stdout. Artifact: crates/wright-analyzer.'
} as const;

/** Terminal transcript, grounded in `wright-analyzer`'s service protocol. */
export const terminal = [
	{ prompt: '$', text: 'wright-tool' },
	{ prompt: '>', text: '{"op":"program"}' },
	{ prompt: '<', text: '{"result":{"origin":{"kind":"protocol"},' },
	{ prompt: '', text: '"rules":3, "subroutines":2,' },
	{ prompt: '', text: '"globalVariables":4, "findings":1}}' },
	{ prompt: '>', text: '{"op":"getFindings"}' },
	{ prompt: '<', text: '{"result":[{"code":"expensive-loop-check",' },
	{ prompt: '', text: '"severity":"info",' },
	{ prompt: '', text: '"message":"geometry predicate evaluated inside a' },
	{ prompt: '', text: 'loop body may be expensive per iteration"}]}' }
] as const;

export const why = {
	title: 'What the stack actually does',
	lead: 'Workshop is still mostly hand-edited text. These crates add a language model, a queryable program, and a compatibility check you can rerun.',
	items: [
		{
			title: 'Workshop language model',
			body: 'Locale-aware builtin catalog, lexer, parser, deterministic emitter, and round-trip validation for Workshop text.',
			artifact: 'crates/wright-workshop'
		},
		{
			title: 'Queries a coding agent can issue',
			body: 'JSON over stdin/stdout for symbols, references, control flow, and findings. Same contract a person uses.',
			artifact: 'crates/wright-analyzer'
		},
		{
			title: 'Small crates with documented edges',
			body: 'Core, IR, Workshop frontend, analyzer, adapter, and compatibility harness. Each has a boundary and a dependency direction.',
			artifact: 'AGPL-3.0-or-later'
		}
	]
} as const;

export const wright = {
	title: 'Wright',
	lead: 'The current core product: a Rust compiler and tooling project for the Overwatch Workshop and OverPy ecosystem.',
	status: {
		label: 'Status',
		value: 'Early-stage',
		detail:
			'No stable compiler binary, CLI, or release workflow yet. The repository is the source of truth for what exists today.'
	},
	capabilities: [
		{
			title: 'Workshop language model',
			body: 'Canonical builtin catalog, native lexer and parser, deterministic emission, locale detection, and round-trip validation.',
			artifact: 'crates/wright-workshop'
		},
		{
			title: 'HIR and Workshop IR',
			body: 'Frontend-independent HIR and target-oriented WIR, with typed IDs, arenas, and explicit lowering.',
			artifact: 'crates/wright-core · crates/wright-ir'
		},
		{
			title: 'Semantic services',
			body: 'Read-only queries over a compiled program: symbols, references, usage, CFGs, and findings with stable codes.',
			artifact: 'crates/wright-analyzer'
		},
		{
			title: 'Frontend adapter',
			body: 'Translates pinned OverPy frontend output into Wright’s HIR protocol, with structured error records on failure.',
			artifact: 'adapter'
		},
		{
			title: 'Compatibility harness',
			body: 'Fixture corpus, pinned reference oracle, and normalized-output comparison that writes machine-readable reports.',
			artifact: 'compatibility'
		}
	]
} as const;

export const agents = {
	title: 'The same interface for people and agents',
	lead: 'If a developer can ask the tooling a question, a coding agent can ask it through the same JSON. No scraped logs.',
	points: [
		{
			title: 'Structured interfaces',
			body: 'Transport-neutral request/response for program summaries, rules, symbols, references, usage, control flow, and findings.'
		},
		{
			title: 'Deterministic output',
			body: 'Equal inputs, configuration, and toolchain produce the same IR and snapshots. Results can be diffed.'
		},
		{
			title: 'Machine-readable diagnostics',
			body: 'Errors and findings carry stable codes, messages, and source spans so a tool can act without parsing prose.'
		},
		{
			title: 'Reproducible checks',
			body: 'Pinned reference versions, fixture corpora, and regenerable snapshots keep compatibility claims checkable.'
		}
	]
} as const;

export const openSource = {
	title: 'On GitHub',
	lead: 'The public wrightkit organization is the current entry point. Wright is licensed AGPL-3.0-or-later; the Wright repo itself is still private.',
	links: [
		{ label: 'github.com/wrightkit', href: 'https://github.com/wrightkit' },
		{
			label: 'workshop-md-converter',
			href: 'https://github.com/wrightkit/workshop-md-converter',
			note: 'converts the Workshop.code wiki into Markdown'
		}
	] satisfies { label: string; href: string; note?: string }[]
} as const;

export const footer = {
	note: 'Tools for Overwatch Workshop.',
	copyright: '© 2026 Wright Kit'
} as const;
