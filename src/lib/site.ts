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
	tagline: 'Modern tools for Overwatch Workshop',
	kicker: 'Wright Kit · Open-source Workshop tooling',
	headline: 'Modern tools for Overwatch Workshop development.',
	description:
		'Wright Kit is an open-source toolkit and ecosystem for Overwatch Workshop development — structured, deterministic tooling built to be operated by developers and coding agents alike.',
	github: 'https://github.com/wrightkit',
	license: 'AGPL-3.0-or-later'
} as const;

export const nav = [{ label: 'GitHub', href: site.github, external: true }] as const;

export const hero = {
	primaryCta: { label: 'Explore on GitHub', href: site.github },
	secondaryCta: { label: 'Meet Wright', href: '#wright' },
	terminalCaption:
		'The early read-only semantic service. JSON over stdin/stdout — the same interface a coding agent calls. Artifact: crates/wright-analyzer.'
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
	eyebrow: 'Why Wright Kit',
	title: 'Tooling that treats Workshop like real engineering.',
	lead: 'Workshop development has outgrown hand-edited text. Wright Kit builds the tooling layer Workshop never had — parsing, analysis, deterministic output, and machine-readable diagnostics.',
	items: [
		{
			title: 'Built for Workshop',
			body: 'A Workshop-native language model: a canonical, locale-aware catalog of builtins, with a lexer, parser, deterministic emitter, and round-trip validation for Workshop text.',
			artifact: 'crates/wright-workshop'
		},
		{
			title: 'Designed for automation and agents',
			body: 'Read-only, structured JSON interfaces with deterministic behavior — a coding agent can query symbols, references, control flow, and findings through the same contracts a developer uses.',
			artifact: 'crates/wright-analyzer'
		},
		{
			title: 'Open and composable tooling',
			body: 'Small, independently implemented components — core, IR, Workshop frontend, analyzer, adapter, compatibility harness — with documented boundaries and dependency direction.',
			artifact: 'AGPL-3.0-or-later · wrightkit org'
		}
	]
} as const;

export const wright = {
	eyebrow: 'Core product',
	title: 'Wright',
	lead: 'The current core product of Wright Kit: a Rust-based compiler and tooling project for the Overwatch Workshop and OverPy ecosystem.',
	status: {
		label: 'Status',
		value: 'Early-stage',
		detail:
			'Wright does not yet publish a stable compiler binary, CLI, or release workflow. The repository is the source of truth for what exists today.'
	},
	capabilities: [
		{
			title: 'Workshop language model',
			body: 'Canonical builtin catalog, native lexer and parser, deterministic emission, locale detection, and round-trip validation for Workshop text.',
			artifact: 'crates/wright-workshop'
		},
		{
			title: 'Two-layer intermediate representation',
			body: 'A frontend-independent HIR and a target-oriented Workshop IR (WIR), with typed IDs, arenas, and explicit lowering boundaries.',
			artifact: 'crates/wright-core · crates/wright-ir'
		},
		{
			title: 'Semantic services for tools and agents',
			body: 'Read-only queries over a compiled program: symbols, references, usage, control-flow graphs, and static-analysis findings with stable codes.',
			artifact: 'crates/wright-analyzer'
		},
		{
			title: 'Frontend adapter',
			body: 'A narrow bridge that translates pinned OverPy frontend output into Wright’s HIR protocol, with structured error records on failure.',
			artifact: 'adapter'
		},
		{
			title: 'Compatibility harness',
			body: 'A fixture corpus, pinned reference oracle, and normalized-output comparison producing machine-readable reports.',
			artifact: 'compatibility'
		}
	]
} as const;

export const agents = {
	eyebrow: 'Humans and agents',
	title: 'Engineered to be operated by people and by tools.',
	lead: 'Wright Kit interfaces are engineering contracts, not UI conveniences. Anything a developer can do through the tooling, a coding agent can do through the same structured interfaces.',
	points: [
		{
			title: 'Structured interfaces',
			body: 'Transport-neutral JSON request/response protocols for program summaries, rules, symbols, references, usage, control flow, and findings — with typed error records instead of scraped output.'
		},
		{
			title: 'Deterministic behavior',
			body: 'Equal inputs, configuration, and toolchain produce stable, observable IR and output. Snapshots are byte-reproducible, so results can be diffed and trusted.'
		},
		{
			title: 'Machine-readable diagnostics',
			body: 'Errors and findings carry stable codes, messages, and source spans — { "code", "message", "span" } — so tools can act on failures rather than parse prose.'
		},
		{
			title: 'Reproducible workflows',
			body: 'Pinned reference versions, fixture corpora, and regenerable snapshots keep every compatibility claim checkable and every workflow repeatable.'
		}
	]
} as const;

export const openSource = {
	eyebrow: 'Open source',
	title: 'Developed in the open.',
	lead: 'Wright Kit lives under the public wrightkit GitHub organization. Wright is licensed AGPL-3.0-or-later; the org page is the current public entry point.',
	links: [
		{ label: 'GitHub org', href: 'https://github.com/wrightkit' },
		{
			label: 'workshop-md-converter',
			href: 'https://github.com/wrightkit/workshop-md-converter',
			note: 'a live org tool that converts the Workshop.code wiki into agent-friendly Markdown'
		}
	] satisfies { label: string; href: string; note?: string }[]
} as const;

export const footer = {
	note: 'Modern tools for Overwatch Workshop development.',
	copyright: '© 2026 Wright Kit'
} as const;
