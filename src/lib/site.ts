/**
 * Single source of truth for every copy string, navigation entry, and
 * capability claim on the site.
 *
 * Accuracy contract: each concrete capability term below traces to a current
 * artifact in the WrightKit repositories (`wright`, `workshop-rs`, `opy-rs`,
 * `del-rs`, `language-provider-protocol`, `workshop-agent`, `homebrew-tap`)
 * or to an authoritative contract such as ADR-0009. Nothing beyond that
 * evidence is claimed, and no CLI commands, flags, features, or package
 * channels are invented. Work that exists only on unmerged branches or has
 * not shipped in a release is labelled accordingly, never presented as
 * released support.
 */

export const site = {
	name: 'WrightKit',
	product: 'Wright',
	brand: 'WrightKit',
	url: 'https://wrightkit.dev',
	tagline: 'Tooling-first ecosystem for Overwatch Workshop',
	headline: 'Tooling for the Overwatch Workshop.',
	description:
		'WrightKit is an open-source ecosystem of tools for Overwatch Workshop development. Wright, its primary product, is a standalone Rust toolchain for linting, static analysis, semantic inspection, and compilation — for developers, CI, and AI agents.',
	github: 'https://github.com/wrightkit/wright',
	org: 'https://github.com/wrightkit',
	releases: 'https://github.com/wrightkit/wright/releases',
	license: 'AGPL-3.0-or-later',
	msrv: '1.85.0'
} as const;

export interface NavItem {
	label: string;
	href: string;
	external?: boolean;
}

export const nav = [
	{ label: 'Install', href: '#install' },
	{ label: 'Features', href: '#features' },
	{ label: 'Compatibility', href: '#compatibility' },
	{ label: 'Ecosystem', href: '#ecosystem' },
	{ label: 'Agents', href: '#agents' },
	{ label: 'GitHub', href: site.org, external: true }
] satisfies readonly NavItem[];

export const hero = {
	primaryCta: { label: 'Install Wright', href: '#install' },
	secondaryCta: { label: 'View on GitHub', href: site.github },
	quickInstall: 'curl -fsSL https://wrightkit.dev/install.sh | bash',
	terminalCaption:
		'wright lint: static analysis with stable diagnostic codes and exact source spans.'
} as const;

/** Terminal transcript, grounded in `wright lint` terminal diagnostics. */
export const terminal = [
	{ prompt: '$', text: 'wright lint src/hero.opy' },
	{ prompt: '', text: 'warning[expensive-loop-check]: geometry predicate in loop body' },
	{ prompt: '', text: '  --> src/hero.opy:24:9' },
	{ prompt: '', text: '   |' },
	{ prompt: '', text: '24 |     while @hero.is_in_view(target):' },
	{ prompt: '', text: '   |           ^^^^^^^^^^^^^^^^^^^^^^^^' },
	{ prompt: '', text: '   =' },
	{ prompt: '', text: '   = note: evaluated on each iteration; may spike server load' },
	{ prompt: '', text: '   = rule: expensive-loop-check (stability)' },
	{ prompt: '$', text: 'wright compile src/hero.opy -o dist/hero.txt' },
	{ prompt: '', text: '✓ compiled 12 rules, 4 subroutines (0.018s)' }
] as const;

export const install = {
	title: 'Install Wright',
	lead: 'Standalone wright and wright-lsp binaries for macOS (Apple Silicon & Intel), Linux (x86_64), and Windows (x86_64). Zero runtime dependencies — no Node.js, .NET, or external interpreters required.',
	latestVersion: '0.1.0',
	targets: [
		{
			id: 'macos',
			label: 'macOS',
			badge: 'Apple Silicon & Intel',
			method: 'Homebrew (Recommended)',
			command: 'brew tap wrightkit/tap\nbrew install wrightkit/tap/wright',
			altMethod: 'Unix installer script',
			altCommand: 'curl -fsSL https://wrightkit.dev/install.sh | bash',
			note: 'Installs wright and wright-lsp to your path with checksums verified by Homebrew.'
		},
		{
			id: 'linux',
			label: 'Linux',
			badge: 'x86_64',
			method: 'Installer script',
			command: 'curl -fsSL https://wrightkit.dev/install.sh | bash',
			altMethod: 'Custom version or dir',
			altCommand: 'curl -fsSL https://wrightkit.dev/install.sh | bash -s -- --dir ~/.local/bin',
			note: 'Auto-detects platform, verifies SHA-256 checksums, and installs to ~/.local/bin.'
		},
		{
			id: 'windows',
			label: 'Windows',
			badge: 'x86_64',
			method: 'Release ZIP (manual)',
			command:
				'https://github.com/wrightkit/wright/releases/download/v0.1.0/wright-0.1.0-x86_64-pc-windows-msvc.zip',
			altMethod: 'WSL (installer script)',
			altCommand: 'curl -fsSL https://wrightkit.dev/install.sh | bash',
			note: 'Download the Windows release ZIP, verify its SHA-256 checksum, and add the extracted directory to your PATH. WinGet and Scoop packages are not published yet.'
		},
		{
			id: 'ci',
			label: 'CI / Agents',
			badge: 'Deterministic',
			method: 'Pinned version install',
			command: 'curl -fsSL https://wrightkit.dev/install.sh | bash -s -- --version 0.1.0',
			altMethod: 'Machine-readable flags',
			altCommand: 'wright lint input.opy --format json',
			note: 'Non-interactive installer for Linux and macOS, designed for GitHub Actions, pipelines, and AI agent containers.'
		},
		{
			id: 'source',
			label: 'From Source',
			badge: 'Rust 1.85.0+',
			method: 'Cargo build',
			command: 'cargo build --release -p wright-cli -p wright-lsp',
			altMethod: 'Run test suite',
			altCommand: 'cargo test --workspace --all-targets --all-features',
			note: 'Builds standalone binaries at target/release/wright and target/release/wright-lsp.'
		}
	],
	fallbackArchive: {
		text: 'Manual precompiled release archives (.tar.gz / .zip) with SHA-256 checksums are available on the',
		linkText: 'GitHub Releases page',
		href: site.releases
	}
} as const;

export const features = {
	title: 'Features',
	lead: 'Developer tooling — linting, diagnostics, semantic queries, editor assistance, and safe source transformations — as first-class product surfaces.',
	items: [
		{
			id: 'lint',
			title: 'Static analysis & linting',
			body: 'Stability and performance rules with stable diagnostic codes: min-wait-loop, duplicate-condition, expensive-loop-check, repeated-value, and while-without-wait.',
			command: 'wright lint input.opy'
		},
		{
			id: 'diagnostics',
			title: 'Deterministic diagnostics',
			body: 'Structured errors, warnings, and exact source spans in terminal format and machine-readable wright-result/v1 JSON.',
			command: 'wright check input.opy'
		},
		{
			id: 'analysis',
			title: 'Semantic inspection',
			body: 'Structural models, rules, symbols, variable assignments, subroutine dependencies, and control-flow graphs.',
			command: 'wright analyze input.opy'
		},
		{
			id: 'agents',
			title: 'Agent & embedding APIs',
			body: 'Session-based driver (wright-driver) with stdio/JSON-RPC adapters (wright-serve) for programmatic inspection and verified source editing from CI and agents.',
			command: 'cat input.opy | wright lint -'
		},
		{
			id: 'lsp',
			title: 'Language server',
			body: 'Lightweight wright-lsp providing hover documentation, definition navigation, reference searches, project-wide identifier rename, and semantic syntax highlighting.',
			command: 'wright-lsp'
		},
		{
			id: 'compiler',
			title: 'Compiler',
			body: 'Compile .opy and Workshop text to deterministic, catalog-validated Workshop output (en-US baseline).',
			command: 'wright compile input.opy'
		}
	]
} as const;

export const compatibility = {
	title: 'Compatibility',
	lead: 'Workshop text is the interoperability hub: it is the canonical boundary between supported source forms and the target for compilation.',
	surfaces: [
		{
			name: 'Workshop text',
			role: 'Canonical boundary & interoperability layer',
			owner: 'workshop-rs · canonical core',
			status: 'Supported',
			details:
				'Parsing, validation, the localized action/value catalog, and deterministic emission are owned by workshop-rs, the canonical Workshop semantic core. Rules, actions, values, events, enums, variables, subroutines, and settings are covered.'
		},
		{
			name: 'OPY / OverPy',
			role: 'Corpus-evidenced semantic frontend',
			owner: 'wright v0.1.0 · opy-rs provider (in development)',
			status: 'Supported',
			details:
				'Native frontend shipped in Wright v0.1.0: preprocessor (#!include, #!define), macros, declarations, expressions, enums, and settings blocks, verified against a pinned OverPy oracle. A standalone opy-rs provider is in development.'
		},
		{
			name: 'DEL / OSTW',
			role: 'Independent compatible frontend',
			owner: 'del-rs (in development) · declared surface on Wright main',
			status: 'In development',
			details:
				'A native DEL/OSTW-compatible frontend is declared on Wright main for the protect-ban slice; the standalone del-rs provider owns the durable implementation. Not yet in a release.'
		}
	],
	conversionDirections: [
		{ from: 'OPY', to: 'Workshop', status: 'Supported' },
		{ from: 'Workshop', to: 'Workshop', status: 'Supported' },
		{ from: 'OSTW', to: 'Workshop', status: 'In development' },
		{ from: 'Workshop', to: 'OPY', status: 'In development' }
	],
	sdne: {
		title: 'Four-Level S/D/N/E Verification Model',
		lead: 'Compiler compatibility is rigorously evidenced under a prioritized verification framework:',
		priority: 'E (semantics) > D (diagnostics) > S (syntax) > N (text output)',
		levels: [
			{
				letter: 'S',
				name: 'Syntax',
				desc: 'Agrees on accepting valid inputs and rejecting unsupported syntax across the corpus.'
			},
			{
				letter: 'D',
				name: 'Diagnostics',
				desc: 'Reports structured diagnostic categories, codes, and accurate source spans for diagnosed inputs.'
			},
			{
				letter: 'N',
				name: 'Normalized Output',
				desc: 'Produces equivalent Workshop output under versioned normalization.'
			},
			{
				letter: 'E',
				name: 'Observable Semantics',
				desc: 'High-risk runtime semantics are verified against repeatable behavioral scenarios.'
			}
		]
	}
} as const;

export const ecosystem = {
	title: 'Ecosystem',
	lead: 'WrightKit is a multi-repository ecosystem: each repository owns a distinct product, contract, or language implementation, and Wright orchestrates them through shared contracts.',
	items: [
		{
			repo: 'wrightkit/wright',
			href: 'https://github.com/wrightkit/wright',
			role: 'Tooling & orchestration',
			status: 'Released v0.1.0',
			desc: 'Wright is the primary user-facing product: CLI, diagnostics, static analysis and linting, language services (wright-lsp), validated source editing, and agent/embedding APIs. AGPL-3.0-or-later.'
		},
		{
			repo: 'wrightkit/workshop-rs',
			href: 'https://github.com/wrightkit/workshop-rs',
			role: 'Canonical Workshop core',
			status: 'In development',
			desc: 'Canonical Workshop semantics: actions, values, events, operators, the localized catalog, parser, Workshop IR, and emitter. The interoperability hub for supported source forms. MIT.'
		},
		{
			repo: 'wrightkit/opy-rs',
			href: 'https://github.com/wrightkit/opy-rs',
			role: 'OPY language provider',
			status: 'In development',
			desc: 'Standalone, Workshop-independent OPY/OverPy-compatible frontend: lexer, preprocessor, parser, semantic resolution, and Opy HIR.'
		},
		{
			repo: 'wrightkit/del-rs',
			href: 'https://github.com/wrightkit/del-rs',
			role: 'DEL/OSTW language provider',
			status: 'In development',
			desc: 'Independent DEL/OSTW-compatible frontend: lexer, recoverable parser, project and import loading, semantic analysis, and a backend-neutral HIR.'
		},
		{
			repo: 'wrightkit/language-provider-protocol',
			href: 'https://github.com/wrightkit/language-provider-protocol',
			role: 'Provider protocol',
			status: 'LPP v1.0',
			desc: 'The versioned process and data contract between Wright tooling and language providers: source text, positions, diagnostics, and source-level edits, without leaking provider internals. MIT.'
		},
		{
			repo: 'wrightkit/workshop-agent',
			href: 'https://github.com/wrightkit/workshop-agent',
			role: 'Agent skills & tools',
			status: 'Released v0.1.4',
			desc: 'Workshop-native engineering knowledge and deterministic CLI tools for coding agents — Codex, Claude Code, Gemini CLI, OpenCode, and other Agent Skills-compatible harnesses.'
		}
	]
} as const;

export const agents = {
	title: 'The same interface for people and agents',
	lead: 'If a developer can ask the tooling a question, a coding agent can ask it through the same JSON contract. No scraped logs or brittle regexes.',
	points: [
		{
			title: 'Structured interfaces',
			body: 'Transport-neutral request/response (wright-result/v1) for program summaries, rules, symbols, references, usage, control flow, and findings.'
		},
		{
			title: 'Deterministic output',
			body: 'Equal inputs, configuration, and toolchain produce the exact same IR, diagnostics, and snapshots.'
		},
		{
			title: 'Machine-readable diagnostics',
			body: 'Errors and findings carry stable codes, severity levels, and source spans so an agent or IDE can act without parsing prose.'
		},
		{
			title: 'Clean-room & reproducible checks',
			body: 'Isolated reference oracles, fixture corpora, and regenerable snapshots keep compatibility claims verifiable.'
		}
	]
} as const;

export const openSource = {
	title: 'Open Source',
	lead: 'WrightKit is open source: repositories are licensed independently and hosted on GitHub. Wright is AGPL-3.0-or-later; the canonical Workshop core and the provider protocol are MIT.',
	links: [
		{
			label: 'wrightkit/wright',
			href: 'https://github.com/wrightkit/wright',
			note: 'Primary tooling and orchestration repository'
		},
		{
			label: 'wrightkit/workshop-rs',
			href: 'https://github.com/wrightkit/workshop-rs',
			note: 'Canonical Workshop semantic core'
		},
		{
			label: 'wrightkit/opy-rs',
			href: 'https://github.com/wrightkit/opy-rs',
			note: 'OPY / OverPy language provider'
		},
		{
			label: 'wrightkit/del-rs',
			href: 'https://github.com/wrightkit/del-rs',
			note: 'DEL / OSTW-compatible frontend'
		},
		{
			label: 'wrightkit/language-provider-protocol',
			href: 'https://github.com/wrightkit/language-provider-protocol',
			note: 'Language Provider Protocol contract'
		},
		{
			label: 'wrightkit/workshop-agent',
			href: 'https://github.com/wrightkit/workshop-agent',
			note: 'Agent skills and tools for coding agents'
		},
		{
			label: 'wrightkit/homebrew-tap',
			href: 'https://github.com/wrightkit/homebrew-tap',
			note: 'Homebrew tap for Wright (macOS)'
		},
		{
			label: 'wrightkit/workshop-md-converter',
			href: 'https://github.com/wrightkit/workshop-md-converter',
			note: 'Converts the Workshop.code wiki into Markdown'
		}
	] satisfies { label: string; href: string; note?: string }[]
} as const;

export const footer = {
	note: 'Tooling-first ecosystem for Overwatch Workshop.',
	copyright: '© 2026 WrightKit'
} as const;
