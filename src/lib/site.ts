/**
 * Single source of truth for public copy and capability claims.
 *
 * Positioning follows wrightkit/.github docs/goal.md: Wright is the product,
 * tooling comes first, and compilation exists to serve tooling workflows.
 *
 * Accuracy contract: every current-capability claim must be backed by the
 * owning repository (workshop-rs, opy-rs, deltin-rs, wright) at a released or
 * merged state. Describe direction as direction, never as shipped behavior.
 */

export const site = {
	name: 'WrightKit',
	brand: 'WrightKit',
	url: 'https://wrightkit.dev',
	tagline: 'Tooling for Overwatch Workshop development',
	description:
		'WrightKit is a tooling-first toolchain for the Overwatch Workshop. Its CLI, Wright, gives developers and coding agents diagnostics, static analysis, and semantic inspection for real Workshop and OverPy projects.',
	github: 'https://github.com/wrightkit/wright',
	org: 'https://github.com/wrightkit',
	releases: 'https://github.com/wrightkit/wright/releases',
	license: 'AGPL-3.0-or-later',
	msrv: '1.85'
} as const;

export interface NavItem {
	label: string;
	href: string;
	external?: boolean;
}

export const nav = [
	{ label: 'Tooling', href: '#tooling' },
	{ label: 'Agents', href: '#agents' },
	{ label: 'Languages', href: '#languages' },
	{ label: 'Install', href: '#install' },
	{ label: 'GitHub', href: site.org, external: true }
] satisfies readonly NavItem[];

export const hero = {
	eyebrow: 'For Workshop developers and coding agents',
	headline: 'Workshop tooling that shows its work.',
	lead: 'Wright checks, lints, and analyzes raw Workshop and OverPy projects. Every finding points to the exact line and says how sure it is, and the same results come as structured data for your editor, your CI, and your coding agent.',
	primaryCta: { label: 'Install Wright', href: '#install' },
	secondaryCta: { label: 'View on GitHub', href: site.github },
	quickInstall: 'curl -fsSL https://wrightkit.dev/install.sh | bash'
} as const;

export type TerminalLineKind = 'prompt' | 'error' | 'warning' | 'dim' | 'blank';

/** Output captured from wright 0.2.40 (paths shortened); keep in sync with the real CLI. */
export const terminal = {
	title: 'Terminal',
	lines: [
		{ kind: 'prompt', text: 'wright check src/main.opy' },
		{ kind: 'error', text: "error[unknown-member]: unknown member 'setHealht'" },
		{ kind: 'dim', text: '  --> src/main.opy:3:5' },
		{ kind: 'blank', text: '' },
		{ kind: 'prompt', text: 'wright lint src/main.opy' },
		{ kind: 'warning', text: 'warning[min-wait-loop]: loop body waits at the workshop minimum rate' },
		{ kind: 'dim', text: '  --> src/main.opy:3:5' },
		{ kind: 'blank', text: '' },
		{ kind: 'prompt', text: 'wright lint src/main.opy --format json' },
		{ kind: 'dim', text: '{ "command": "lint", "ok": true, "result": { "findings": [ … ] } }' }
	] satisfies { kind: TerminalLineKind; text: string }[]
} as const;

export const tooling = {
	eyebrow: 'Tooling first',
	title: 'Built for checking real projects.',
	lead: 'Diagnostics, lints, and analysis share one semantic model, so each result carries a stable code and a source location. Compilation exists to connect languages; it is not the point.',
	items: [
		{
			id: 'check',
			title: 'Diagnostics',
			body: 'Errors and warnings with stable codes, severity, and exact source spans.',
			command: 'wright check'
		},
		{
			id: 'lint',
			title: 'High-confidence lints',
			body: 'A small built-in rule set for loop, wait, and condition patterns that load the server. Each finding says how strong its evidence is.',
			command: 'wright lint'
		},
		{
			id: 'analyze',
			title: 'Analysis',
			body: 'Control-flow hotspots, loops and waits, and variables shared across rules, with every fact labelled static or heuristic.',
			command: 'wright analyze'
		},
		{
			id: 'inspect',
			title: 'Inspection',
			body: 'The full structural and semantic picture of a program, for tools that need more than a summary.',
			command: 'wright inspect'
		},
		{
			id: 'lsp',
			title: 'Editor support',
			body: 'wright-lsp adds hover, go to definition, references, completion, rename, and live diagnostics to any LSP editor.',
			command: 'wright-lsp'
		},
		{
			id: 'ci',
			title: 'CI',
			body: 'Documented exit codes, one JSON result format, and GitHub Actions annotations detected automatically.',
			command: 'wright lint --format json'
		}
	]
} as const;

export const agents = {
	eyebrow: 'Developers and agents',
	title: 'One set of tools for you and your coding agent.',
	lead: 'Agents get the same semantic results you do, as deterministic structured data. No scraping terminal output, no reimplemented parsers. WrightKit is Workshop tooling for agents, not an agent framework.',
	columns: [
		{
			title: 'For developers',
			points: [
				'Readable terminal output that points at the offending line',
				'Editor integration through wright-lsp',
				'Per-project lint configuration: turn a rule off or change its severity',
				'Pull request annotations when Wright runs in GitHub Actions'
			]
		},
		{
			title: 'For coding agents',
			points: [
				'One versioned JSON result for every command',
				'Stable diagnostic codes, rule IDs, and exit codes to branch on',
				'Edit transactions validated as a whole, refusing overlapping or order-dependent edits',
				'The wright Agent Skill, published in wrightkit/skills'
			]
		}
	],
	loop: {
		title: 'Where this is heading',
		lead: 'The goal is intent-driven development: an agent takes a requirement and uses WrightKit at every step below, so you can focus on design instead of Workshop syntax. Parts of this loop ship today; a versioned agent contract is still in progress.',
		steps: [
			{ title: 'Inspect', body: 'Read the project, its rules, and dependencies.' },
			{ title: 'Edit', body: 'Apply targeted, validated source changes.' },
			{ title: 'Check', body: 'Re-run diagnostics and lints.' },
			{ title: 'Assess', body: 'Estimate cost and flag server-load risk.' },
			{ title: 'Report', body: 'State what cannot be proven statically.' }
		]
	}
} as const;

export type SupportTone = 'supported' | 'partial' | 'pending';

export const languages = {
	eyebrow: 'Languages',
	title: 'Raw Workshop at the center. Established languages around it.',
	lead: 'Workshop is the shared representation. Each source language has its own implementation, and conversions route through Workshop rather than bespoke bridges. Support grows with real projects, not a feature checklist.',
	items: [
		{
			name: 'Workshop',
			status: 'Supported',
			tone: 'supported',
			owner: 'workshop-rs',
			ownerHref: 'https://github.com/wrightkit/workshop-rs',
			body: 'A first-class source form, not just compiler output. Parsing, validation, analysis, canonical emission, and en-US ↔ zh-CN conversion.'
		},
		{
			name: 'OverPy',
			status: 'Partial',
			tone: 'partial',
			owner: 'opy-rs',
			ownerHref: 'https://github.com/wrightkit/opy-rs',
			body: 'Check, lint, and analyze existing OverPy projects in Wright. Compilation to Workshop covers the supported constructs; anything else gets a structured diagnostic.'
		},
		{
			name: 'OSTW',
			status: 'In development',
			tone: 'pending',
			owner: 'deltin-rs',
			ownerHref: 'https://github.com/wrightkit/deltin-rs',
			body: 'Parsing, projects, and type analysis live in deltin-rs. Advanced lowering is incomplete, and Wright does not ship OSTW support yet.'
		}
	] satisfies {
		name: string;
		status: string;
		tone: SupportTone;
		owner: string;
		ownerHref: string;
		body: string;
	}[],
	compatibility: {
		title: 'What “compatible” means',
		lead: 'For OverPy and OSTW, the upstream compiler is the specification. Wright and upstream compile the same source; both results are parsed as canonical Workshop programs and compared structure for structure.',
		criteria: [
			'Rule order',
			'Element identities',
			'Control flow',
			'Condition shape',
			'Value construction',
			'Variable names and indices',
			'Element cost'
		],
		notes: [
			'Formatting, whitespace, and comments do not count. Text diffs are never the measure.',
			'Any deviation from upstream output, even for an apparent upstream bug, needs an approved, recorded exception.',
			'New heroes, maps, actions, and settings land in workshop-rs without waiting for upstream releases.'
		]
	}
} as const;

export const install = {
	eyebrow: 'Install',
	title: 'Get Wright.',
	lead: 'One install gives you wright and wright-lsp. The language engines also publish their own libraries from their repositories.',
	targets: [
		{
			id: 'macos',
			label: 'macOS',
			badge: 'Apple silicon & Intel',
			method: 'Homebrew',
			command: 'brew install wrightkit/tap/wright',
			altMethod: 'Installer script',
			altCommand: 'curl -fsSL https://wrightkit.dev/install.sh | bash',
			note: 'Installs the released wright and wright-lsp binaries.'
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
			method: 'PowerShell installer',
			command: 'irm https://wrightkit.dev/install.ps1 | iex',
			altMethod: 'Custom install directory',
			altCommand:
				'$script = irm https://wrightkit.dev/install.ps1; & ([scriptblock]::Create($script)) -InstallDir "$HOME\\bin"',
			note: 'Downloads the matching Windows release and verifies its checksum.'
		},
		{
			id: 'ci',
			label: 'CI & agents',
			badge: 'Pinned',
			method: 'Pinned version',
			command:
				'curl -fsSL https://wrightkit.dev/install.sh | bash -s -- --version "$WRIGHT_VERSION"',
			altMethod: 'Machine-readable output',
			altCommand: 'wright lint src/main.opy --format json',
			note: 'Set WRIGHT_VERSION to a tag from GitHub Releases so every run uses the same build.'
		},
		{
			id: 'source',
			label: 'From source',
			badge: `Rust ${site.msrv}+`,
			method: 'Cargo build',
			command: 'cargo build --release -p wright-cli -p wright-lsp',
			altMethod: 'Run tests',
			altCommand: 'cargo test --workspace --all-targets --all-features',
			note: 'Build Wright from a checkout of wrightkit/wright.'
		}
	],
	fallbackArchive: {
		text: 'Release archives and checksums for every platform are on the',
		linkText: 'GitHub Releases page',
		href: site.releases
	}
} as const;

export const ecosystem = {
	eyebrow: 'Open source',
	title: 'How WrightKit fits together.',
	lead: 'Wright is the product you install. The language engines underneath are independent projects you can also use on their own, each with its own tests, releases, and license.',
	principles: [
		{
			title: 'Honest about limits',
			body: 'Wright explains its static reasoning and flags what it cannot prove. It does not promise how code behaves on a live server.'
		},
		{
			title: 'Technical, not taste',
			body: 'WrightKit tracks verified Workshop facts such as element catalogs and resource limits. It does not judge balance or game design.'
		},
		{
			title: 'Small, predictable core',
			body: 'Built-in rules aim for few false positives. Broader checks belong in optional rule sets.'
		}
	],
	repos: [
		{
			repo: 'wright',
			href: 'https://github.com/wrightkit/wright',
			role: 'The CLI and language server: diagnostics, lint, analysis, editor and CI integration.'
		},
		{
			repo: 'workshop-rs',
			href: 'https://github.com/wrightkit/workshop-rs',
			role: 'Canonical Workshop semantics: catalog, parsing, validation, localization, emission.'
		},
		{
			repo: 'opy-rs',
			href: 'https://github.com/wrightkit/opy-rs',
			role: 'OverPy implementation with semantic analysis and Workshop compilation.'
		},
		{
			repo: 'deltin-rs',
			href: 'https://github.com/wrightkit/deltin-rs',
			role: 'DeltinScript / OSTW implementation, in development.'
		},
		{
			repo: 'language-provider-protocol',
			href: 'https://github.com/wrightkit/language-provider-protocol',
			role: 'Versioned protocol between Wright and language providers.'
		},
		{
			repo: 'skills',
			href: 'https://github.com/wrightkit/skills',
			role: 'The wright Agent Skill for coding agents.'
		},
		{
			repo: 'homebrew-tap',
			href: 'https://github.com/wrightkit/homebrew-tap',
			role: 'Homebrew formula for Wright.'
		}
	],
	nonGoals: {
		title: 'Not in scope',
		items: [
			'A generic compiler framework',
			'A full IDE',
			'Project hosting',
			'A generic AI agent framework',
			'A game runtime simulator',
			'A transpiler collection'
		]
	}
} as const;

export const footer = {
	note: 'Tooling for Overwatch Workshop development.',
	copyright: '© 2026 WrightKit'
} as const;
