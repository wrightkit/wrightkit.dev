/**
 * Single source of truth for every copy string, navigation entry, and
 * capability claim on the site.
 *
 * Accuracy contract: each concrete capability term below traces to an
 * artifact in the official `wright` repository (`crates/*`, `docs/`, `install.sh`,
 * `README.md`). Nothing beyond that repo's evidence is claimed, and no CLI
 * commands, flags, or features are invented.
 */

export const site = {
	name: 'Wright',
	brand: 'Wright Kit',
	url: 'https://wrightkit.dev',
	tagline: 'Tooling-first semantic platform for Overwatch Workshop',
	headline: 'Tooling-first semantic platform for Overwatch Workshop.',
	description:
		'An independent, standalone Rust toolchain for the Overwatch Workshop and OverPy ecosystem. Fast compiler, static linter, language server, and embedding APIs for developers, CI, and AI agents with zero runtime dependencies.',
	github: 'https://github.com/wrightkit/wright',
	releases: 'https://github.com/wrightkit/wright/releases',
	org: 'https://github.com/wrightkit',
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
	{ label: 'Architecture', href: '#architecture' },
	{ label: 'Agents', href: '#agents' },
	{ label: 'GitHub', href: site.github, external: true }
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
	lead: 'Standalone wright and wright-lsp binaries for macOS, Linux, and Windows. Zero runtime dependencies — no Node.js, .NET, or external interpreters required.',
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
			note: 'Installs wright and wright-lsp to your path with verified checksums.'
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
			method: 'WinGet (Recommended)',
			command: 'winget install WrightKit.Wright',
			altMethod: 'Scoop package manager',
			altCommand: 'scoop bucket add wrightkit https://github.com/wrightkit/scoop-bucket\nscoop install wright',
			note: 'Both WinGet and Scoop consume the official Windows release ZIP.'
		},
		{
			id: 'ci',
			label: 'CI / Agents',
			badge: 'Deterministic',
			method: 'Pinned version install',
			command: 'curl -fsSL https://wrightkit.dev/install.sh | bash -s -- --version 0.1.0',
			altMethod: 'Machine-readable flags',
			altCommand: 'wright lint input.opy --format json',
			note: 'Non-interactive script designed for GitHub Actions, pipelines, and AI agent containers.'
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
			id: 'compiler',
			title: 'High-Performance Compiler',
			body: 'Compile .opy source scripts and Workshop text to optimized, localized Workshop code with deterministic output.',
			command: 'wright compile input.opy'
		},
		{
			id: 'lint',
			title: 'First-Class Static Linting',
			body: 'Static stability and performance analysis with configurable rules: min-wait-loop, duplicate-condition, expensive-loop-check, repeated-value, and while-without-wait.',
			command: 'wright lint input.opy'
		},
		{
			id: 'diagnostics',
			title: 'Deterministic Diagnostics',
			body: 'Structured errors, warnings, and exact source spans surfaced in human-readable terminal format and machine-readable wright-result/v1 JSON.',
			command: 'wright check input.opy --format json'
		},
		{
			id: 'lsp',
			title: 'Language Server (wright-lsp)',
			body: 'Lightweight LSP providing hover documentation, definition navigation, reference searches, project-wide identifier rename, and semantic syntax highlighting.',
			command: 'wright-lsp'
		},
		{
			id: 'analysis',
			title: 'Semantic Analysis & CFG',
			body: 'Inspect structural models, rules, symbols, variable assignments, subroutine dependencies, and control-flow graphs.',
			command: 'wright analyze input.opy'
		},
		{
			id: 'agents',
			title: 'Embedding & Agent Tooling',
			body: 'Session-based driver (wright-driver) with stdio/JSON-RPC adapters (wright-serve) enabling programmatic inspection and verified refactoring.',
			command: 'cat input.opy | wright lint -'
		}
	]
} as const;

export const compatibility = {
	title: 'Ecosystem Compatibility',
	lead: 'Vanilla Workshop text is the canonical interoperability boundary and conversion hub.',
	frontends: [
		{
			name: 'Vanilla Workshop',
			role: 'Canonical target & interoperability layer',
			status: 'Supported',
			details:
				'Native parser, localized catalog (catalog.json), validation, and deterministic emitter (wright-workshop). Supports rules, actions, values, events, enums, variables, subroutines, and custom-game-settings.'
		},
		{
			name: 'OPY / OverPy',
			role: 'Native compatible semantic frontend',
			status: 'Supported',
			details:
				'Native Rust parser (wright-opy), preprocessor (#!include, #!define), macro expansion, declarations, expressions, enums, custom-game-settings JSONC blocks, and lowering to Wright HIR and Workshop IR.'
		},
		{
			name: 'OSTW',
			role: 'Future compatible semantic frontend',
			status: 'Planned',
			details:
				'Planned OSTW frontend mapping into Wright HIR/WIR for standalone compilation, linting, analysis, and language services under clean-room isolation (ADR-0008).'
		}
	],
	conversionDirections: [
		{ from: 'OPY', to: 'Workshop', status: 'Supported (native wright-opy → HIR → WIR → wright-workshop)' },
		{ from: 'Workshop', to: 'Workshop', status: 'Supported (catalog parse → canonical WIR → deterministic emit)' },
		{ from: 'OSTW', to: 'Workshop', status: 'Planned (future wright-ostw → HIR → WIR → wright-workshop)' },
		{ from: 'Workshop', to: 'OPY', status: 'Planned (decompilation / translation via canonical WIR)' }
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

export const architecture = {
	title: 'System Architecture',
	lead: 'Wright processes source code through a modular, owned pipeline with zero third-party AST leaks.',
	pipeline: [
		{
			step: '01',
			name: 'Owned Frontends',
			desc: 'Parse .opy or Workshop text into typed representations with full source provenance.',
			artifact: 'crates/wright-opy · crates/wright-workshop'
		},
		{
			step: '02',
			name: 'Wright HIR & WIR',
			desc: 'Frontend-independent High-Level Intermediate Representation and target-oriented Workshop IR.',
			artifact: 'crates/wright-core · crates/wright-ir'
		},
		{
			step: '03',
			name: 'Semantic Layer',
			desc: 'Symbol resolution, control-flow graph (CFG) construction, reference indexing, and lint evaluation.',
			artifact: 'crates/wright-analyzer'
		},
		{
			step: '04',
			name: 'Downstream Tooling',
			desc: 'Deterministic Workshop text compiler, language server (LSP), and session driver with JSON-RPC.',
			artifact: 'crates/wright-lsp · crates/wright-driver · crates/wright-cli'
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
	lead: 'Wright is open source under the AGPL-3.0-or-later license. All code, releases, and distribution packages are publicly hosted on GitHub.',
	links: [
		{
			label: 'wrightkit/wright',
			href: 'https://github.com/wrightkit/wright',
			note: 'Main compiler, linter, LSP, and CLI toolchain repository'
		},
		{
			label: 'wrightkit/tap',
			href: 'https://github.com/wrightkit/homebrew-tap',
			note: 'Homebrew tap for macOS'
		},
		{
			label: 'wrightkit/scoop-bucket',
			href: 'https://github.com/wrightkit/scoop-bucket',
			note: 'Scoop bucket for Windows'
		},
		{
			label: 'workshop-md-converter',
			href: 'https://github.com/wrightkit/workshop-md-converter',
			note: 'Converts the Workshop.code wiki into Markdown'
		}
	] satisfies { label: string; href: string; note?: string }[]
} as const;

export const footer = {
	note: 'Tooling-first semantic platform for Overwatch Workshop.',
	copyright: '© 2026 Wright Kit'
} as const;
