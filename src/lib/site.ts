/**
 * Single source of truth for public copy and capability claims.
 *
 * Accuracy contract: current implementation claims are grounded in the owning
 * WrightKit repository. Wright may integrate a capability, but its public copy
 * must not claim more language/compiler support than workshop-rs, opy-rs, or
 * del-rs currently evidence.
 */

export const site = {
	name: 'WrightKit',
	product: 'Wright',
	brand: 'WrightKit',
	url: 'https://wrightkit.dev',
	tagline: 'Tooling for Overwatch Workshop development',
	headline: 'Tooling for Overwatch Workshop development.',
	subheadline: 'Native Workshop, OverPy / OSTW, and AI agents.',
	description:
		'WrightKit combines independently usable Workshop, OverPy, and DEL/OSTW implementations with Wright, a unified tooling product for linting, analysis, semantic inspection, validated source editing, agents, CI, and language services.',
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
	{ label: 'Workflows', href: '#workflows' },
	{ label: 'Capabilities', href: '#capabilities' },
	{ label: 'Compatibility', href: '#compatibility' },
	{ label: 'Ecosystem', href: '#ecosystem' },
	{ label: 'GitHub', href: site.org, external: true }
] satisfies readonly NavItem[];

export const hero = {
	primaryCta: { label: 'Install Wright', href: '#install' },
	secondaryCta: { label: 'View on GitHub', href: site.github },
	quickInstall: 'curl -fsSL https://wrightkit.dev/install.sh | bash',
	terminalCaption: 'Wright provides one tooling surface across supported Workshop source forms.'
} as const;

export const terminal = [
	{ prompt: '$', text: 'wright check src/main.opy' },
	{ prompt: '', text: 'diagnostics use stable codes and exact source spans' },
	{ prompt: '$', text: 'wright lint src/main.workshop' },
	{ prompt: '', text: 'lint and analysis build on the owning semantic implementation' },
	{ prompt: '$', text: 'wright analyze src/main.opy --format json' },
	{ prompt: '', text: 'machine-readable results for CI, tools, and agents' }
] as const;

export const pillars = [
	{
		id: 'workshop',
		anchor: 'workflows',
		label: 'Native Workshop',
		headline: 'A standalone Workshop implementation plus integrated tooling.',
		body: 'workshop-rs owns raw Workshop parsing, canonical semantics, WIR, catalog data, validation, localization, and emission. Wright consumes those capabilities and adds linting, analysis, source editing, CI, agents, and language services.',
		capabilities: [
			'Parse and validate raw Workshop through workshop-rs',
			'Canonical Workshop identities, WIR, settings, and localization',
			'Static analysis and linting through Wright',
			'Deterministic Workshop emission and locale conversion',
			'Machine-readable diagnostics and semantic queries'
		],
		command: 'wright lint src/main.workshop',
		commandCaption: 'Use Wright tooling on canonical Workshop semantics.'
	},
	{
		id: 'opy',
		anchor: 'workflows',
		label: 'OverPy & OSTW',
		headline: 'Independent language implementations, deeply integrated by Wright.',
		body: 'opy-rs and del-rs are standalone Rust implementations, not Wright-owned frontend repositories. Their internal frontends provide source-aware semantics; compilation reuses workshop-rs instead of duplicating raw Workshop. Wright adds unified lint, analysis, edits, agents, CI, and language services.',
		capabilities: [
			'opy-rs: standalone OverPy parsing, preprocessing, semantic analysis, and tooling',
			'del-rs: standalone DEL/OSTW parsing, projects, type/semantic analysis, and tooling',
			'Both implementations reuse workshop-rs for canonical Workshop contracts',
			'Compiler and reconstruction support remains evidence-backed and may be partial',
			'Wright integrates supported semantic capabilities without hidden upstream runtime fallback'
		],
		command: 'wright check src/main.opy',
		commandCaption: 'Wright routes language-specific understanding to the owning implementation.'
	},
	{
		id: 'agents',
		anchor: 'workflows',
		label: 'AI Agents',
		headline: 'Semantic understanding and validated edits for coding agents.',
		body: 'Wright exposes structured diagnostics, semantic queries, and validated source-edit workflows on top of the same language implementations developers use. Agents do not need to scrape compiler logs or regenerate entire source files.',
		capabilities: [
			'Semantic inspection and structured diagnostics',
			'Validated source-edit transactions with refusal for unsafe operations',
			'Machine-readable output for agent harnesses and CI',
			'Shared Workshop gameplay/catalog queries from workshop-rs',
			'workshop-agent skills and domain guidance'
		],
		command: 'wright analyze src/main.opy --format json',
		commandCaption: 'Structured program information for tools and agents.'
	}
] as const;

export const install = {
	title: 'Install Wright',
	lead: 'Wright is the unified tooling product. The language implementations also expose standalone libraries and CLIs from their own repositories.',
	latestVersion: '0.2.8',
	targets: [
		{
			id: 'macos',
			label: 'macOS',
			badge: 'Apple Silicon & Intel',
			method: 'Homebrew',
			command: 'brew tap wrightkit/tap\nbrew install wrightkit/tap/wright',
			altMethod: 'Installer script',
			altCommand: 'curl -fsSL https://wrightkit.dev/install.sh | bash',
			note: 'Installs the released Wright binaries.'
		},
		{
			id: 'linux',
			label: 'Linux',
			badge: 'x86_64',
			method: 'Installer script',
			command: 'curl -fsSL https://wrightkit.dev/install.sh | bash',
			altMethod: 'Custom install directory',
			altCommand: 'curl -fsSL https://wrightkit.dev/install.sh | bash -s -- --dir ~/.local/bin',
			note: 'Downloads the matching release archive and verifies its checksum.'
		},
		{
			id: 'windows',
			label: 'Windows',
			badge: 'x86_64',
			method: 'GitHub Release archive',
			command: 'https://github.com/wrightkit/wright/releases',
			altMethod: 'See release documentation',
			altCommand: 'docs/release.md',
			note: 'Use the currently published Windows distribution path from the release documentation.'
		},
		{
			id: 'ci',
			label: 'CI / Agents',
			badge: 'Deterministic',
			method: 'Pinned version install',
			command: 'curl -fsSL https://wrightkit.dev/install.sh | bash -s -- --version 0.2.8',
			altMethod: 'Machine-readable output',
			altCommand: 'wright lint input.opy --format json',
			note: 'Pin a released version for reproducible automation.'
		},
		{
			id: 'source',
			label: 'From Source',
			badge: 'Rust 1.85+',
			method: 'Cargo build',
			command: 'cargo build --release -p wright-cli -p wright-lsp',
			altMethod: 'Run tests',
			altCommand: 'cargo test --workspace --all-targets --all-features',
			note: 'Build Wright from the repository workspace.'
		}
	],
	fallbackArchive: {
		text: 'Current precompiled release archives and checksums are available on the',
		linkText: 'GitHub Releases page',
		href: site.releases
	}
} as const;

export const capabilities = {
	title: 'Shared Capabilities',
	lead: 'Wright adds cross-language tooling on top of the source form implementations. Availability is bounded by the semantic support of the owning implementation.',
	items: [
		{
			id: 'lint',
			title: 'Static analysis & linting',
			body: 'Workshop stability and performance rules operate on semantic information rather than raw text where the backing implementation provides it.',
			command: 'wright lint input.opy'
		},
		{
			id: 'diagnostics',
			title: 'Deterministic diagnostics',
			body: 'Structured errors, warnings, and source spans in terminal and machine-readable formats.',
			command: 'wright check input.opy'
		},
		{
			id: 'analysis',
			title: 'Semantic inspection',
			body: 'Rules, symbols, references, dependencies, and other queries derived from the owning semantic implementation.',
			command: 'wright analyze input.opy'
		},
		{
			id: 'agents',
			title: 'Agent & embedding APIs',
			body: 'Programmatic inspection and validated source-edit workflows for CI, agents, and other consumers.',
			command: 'wright lint input.opy --format json'
		},
		{
			id: 'lsp',
			title: 'Language services',
			body: 'Wright integrates semantic capabilities into editor-neutral services and LSP where the source implementation exposes the required information.',
			command: 'wright-lsp'
		},
		{
			id: 'compiler',
			title: 'Compilation & conversion',
			body: 'Compilation and reconstruction are exposed only for the evidence-backed subset implemented by the owning language repository and workshop-rs.',
			command: 'wright compile input.opy'
		}
	]
} as const;

export const compatibility = {
	title: 'Compatibility',
	lead: 'Workshop is the interoperability hub. Source-language support is defined by the owning implementation and its corpus, not by the presence of a Wright command.',
	surfaces: [
		{
			name: 'Workshop text',
			role: 'Standalone implementation & canonical interoperability layer',
			owner: 'workshop-rs',
			status: 'Supported baseline',
			details: 'workshop-rs owns raw Workshop parsing, canonical identities, WIR, validation, localization, emission, and reviewed Workshop gameplay/catalog queries.'
		},
		{
			name: 'OPY / OverPy',
			role: 'Standalone OverPy implementation',
			owner: 'opy-rs',
			status: 'Partial end-to-end',
			details: 'Standalone source analysis is implemented. Builtin/member/catalog breadth and OPY→Workshop compilation are still being closed; Workshop→OPY reconstruction is not yet supported.'
		},
		{
			name: 'DEL / OSTW',
			role: 'Standalone DEL/OSTW implementation',
			owner: 'del-rs',
			status: 'Partial end-to-end',
			details: 'Parsing, projects, semantic/type analysis, and typed HIR are substantial. Advanced runtime/project lowering and end-to-end compilation remain incomplete; reconstruction is not yet supported.'
		}
	],
	conversionDirections: [
		{ from: 'OPY', to: 'Workshop', status: 'Partial' },
		{ from: 'Workshop', to: 'Workshop', status: 'Supported' },
		{ from: 'OSTW', to: 'Workshop', status: 'Partial' },
		{ from: 'Workshop', to: 'OPY', status: 'Not yet' }
	],
	sdne: {
		title: 'Evidence-driven compatibility',
		lead: 'Compatibility targets observable semantics and declared source/tooling contracts rather than compiler-output identity.',
		priority: 'Observable semantics and valid source/tooling behavior > normalized text similarity',
		levels: [
			{ letter: 'S', name: 'Syntax', desc: 'Valid and unsupported syntax is classified against corpus evidence.' },
			{ letter: 'D', name: 'Diagnostics', desc: 'Diagnostics retain stable categories and accurate source provenance.' },
			{ letter: 'N', name: 'Normalized Output', desc: 'Normalized text comparison is supporting evidence, not the product target.' },
			{ letter: 'E', name: 'Observable Semantics', desc: 'Semantically significant behavior is validated with the strongest available evidence.' }
		]
	}
} as const;

export const ecosystem = {
	title: 'Ecosystem',
	lead: 'WrightKit combines independent implementations with a unified tooling product. Each repository keeps its own responsibility, public contracts, tests, and release identity.',
	items: [
		{
			repo: 'wrightkit/wright',
			href: 'https://github.com/wrightkit/wright',
			role: 'Unified tooling & integration product',
			status: 'Released',
			desc: 'One product surface for diagnostics, lint, analysis, source editing, agents, CI/embedding, language services, and supported compile/convert workflows.'
		},
		{
			repo: 'wrightkit/workshop-rs',
			href: 'https://github.com/wrightkit/workshop-rs',
			role: 'Standalone Workshop implementation',
			status: 'Canonical baseline available',
			desc: 'Raw Workshop parser, canonical WIR/catalog/settings/localization, validation, emission, gameplay queries, and conformance evidence.'
		},
		{
			repo: 'wrightkit/opy-rs',
			href: 'https://github.com/wrightkit/opy-rs',
			role: 'Standalone OverPy implementation',
			status: 'In development',
			desc: 'OverPy parsing, preprocessing/macros, semantics, diagnostics/provenance, standalone tooling, and the language-owned compiler/reconstruction path.'
		},
		{
			repo: 'wrightkit/del-rs',
			href: 'https://github.com/wrightkit/del-rs',
			role: 'Standalone DEL/OSTW implementation',
			status: 'In development',
			desc: 'DEL/OSTW parsing, project loading, semantic/type system, typed HIR, runtime/compiler lowering, standalone tooling, and reconstruction ownership.'
		},
		{
			repo: 'wrightkit/language-provider-protocol',
			href: 'https://github.com/wrightkit/language-provider-protocol',
			role: 'Integration protocol',
			status: 'LPP v1.0',
			desc: 'A versioned process/data contract. Provider is an integration role that standalone implementations may expose; it is not their repository identity.'
		},
		{
			repo: 'wrightkit/workshop-agent',
			href: 'https://github.com/wrightkit/workshop-agent',
			role: 'Agent skills & tools',
			status: 'Released',
			desc: 'Workshop engineering knowledge and deterministic tools for coding-agent harnesses.'
		}
	]
} as const;

export const agents = {
	title: 'The same semantic interfaces for people and agents',
	lead: 'Agents consume structured diagnostics, queries, and validated edits from the same implementation-backed tooling surfaces as developers.',
	points: [
		{ title: 'Structured interfaces', body: 'Semantic queries and results use stable machine-readable contracts rather than scraped logs.' },
		{ title: 'Explicit support boundaries', body: 'Unsupported language behavior remains visible instead of being hidden behind fallback runtimes.' },
		{ title: 'Machine-readable diagnostics', body: 'Stable codes, severity, and source spans let tools act without parsing prose.' },
		{ title: 'Validated source edits', body: 'Agents modify original source through semantic understanding and checked edits rather than whole-file regeneration by default.' }
	]
} as const;

export const openSource = {
	title: 'Source & licenses',
	lead: 'WrightKit repositories are versioned and licensed independently. See each repository for its current license and provenance terms.',
	links: [
		{ label: 'wrightkit/wright', href: 'https://github.com/wrightkit/wright', note: 'Unified tooling and integration product' },
		{ label: 'wrightkit/workshop-rs', href: 'https://github.com/wrightkit/workshop-rs', note: 'Standalone Workshop implementation and canonical core' },
		{ label: 'wrightkit/opy-rs', href: 'https://github.com/wrightkit/opy-rs', note: 'Standalone OverPy implementation' },
		{ label: 'wrightkit/del-rs', href: 'https://github.com/wrightkit/del-rs', note: 'Standalone DEL/OSTW implementation' },
		{ label: 'wrightkit/language-provider-protocol', href: 'https://github.com/wrightkit/language-provider-protocol', note: 'Language Provider Protocol integration contract' },
		{ label: 'wrightkit/workshop-agent', href: 'https://github.com/wrightkit/workshop-agent', note: 'Agent skills and tools' },
		{ label: 'wrightkit/homebrew-tap', href: 'https://github.com/wrightkit/homebrew-tap', note: 'Homebrew distribution for Wright' },
		{ label: 'wrightkit/workshop-md-converter', href: 'https://github.com/wrightkit/workshop-md-converter', note: 'Workshop wiki Markdown conversion' }
	] satisfies { label: string; href: string; note?: string }[]
} as const;

export const footer = {
	note: 'Independent Workshop language implementations, deeply integrated tooling.',
	copyright: '© 2026 WrightKit'
} as const;
