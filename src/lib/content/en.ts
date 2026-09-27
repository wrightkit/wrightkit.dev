import { site } from '$lib/site';
import type { Messages } from './types';

const en: Messages = {
	meta: {
		title: 'WrightKit: Tooling for Overwatch Workshop development',
		description:
			'Wright checks, lints, and analyzes Overwatch Workshop and OverPy code, from your editor to CI to your coding agent.'
	},
	ui: {
		skipToContent: 'Skip to content',
		home: 'WrightKit home',
		primaryNav: 'Primary',
		navigation: 'Navigation',
		openMenu: 'Open navigation menu',
		closeMenu: 'Close navigation menu',
		appearance: 'Appearance',
		theme: { system: 'System', light: 'Light', dark: 'Dark' },
		language: 'Language',
		currentLanguage: (name) => `Language: ${name}`,
		copy: 'Copy command',
		copyInstall: 'Copy install command',
		copied: 'Copied to clipboard'
	},
	nav: {
		tooling: 'Tooling',
		agents: 'Agents',
		languages: 'Languages',
		install: 'Install'
	},
	hero: {
		eyebrow: 'For Workshop developers and coding agents',
		headline: 'Workshop code, checked.',
		lead: 'Wright checks, lints, and analyzes Overwatch Workshop and OverPy code. Catch errors before you load the game.',
		primaryCta: 'Install Wright',
		secondaryCta: 'View on GitHub'
	},
	terminal: {
		title: 'Terminal',
		label: 'Example wright session'
	},
	tooling: {
		title: 'From first line to pull request.',
		items: {
			check: {
				title: 'Check',
				body: 'Catch errors before the game does. Every diagnostic has a code and an exact location.'
			},
			lint: {
				title: 'Lint',
				body: 'Flag loops without a Wait, duplicate conditions, and other code that strains the server.'
			},
			analyze: {
				title: 'Analyze',
				body: 'See your most complex rules and the variables most rules share.'
			},
			inspect: {
				title: 'Inspect',
				body: 'Every rule, variable, and reference in one view.'
			},
			lsp: {
				title: 'Editor',
				body: 'Diagnostics as you type, plus go to definition, completion, and rename. Works in any LSP editor.'
			},
			ci: {
				title: 'CI',
				body: 'Findings show up right on your pull request in GitHub Actions.'
			}
		}
	},
	agents: {
		title: 'Built for coding agents, too.',
		capabilities: [
			{
				title: 'JSON output',
				body: 'Add --format json to any command. One versioned schema.'
			},
			{
				title: 'Stable codes',
				body: 'Diagnostic codes, rule IDs, and exit codes an agent can rely on.'
			},
			{
				title: 'Agent Skill',
				body: 'Teach your agent Wright with the skill in wrightkit/skills.'
			}
		],
		upcoming: [
			{
				title: 'Request to change',
				body: 'Describe the feature. Your agent builds and checks it with Wright.'
			},
			{
				title: 'Checked edits',
				body: 'Edits are validated before they touch your files.'
			},
			{
				title: 'Project queries',
				body: 'Rules, variables, references, and call graphs on request.'
			},
			{
				title: 'Cost estimates',
				body: 'Know the server cost of a change before you ship it.'
			}
		],
		upcomingBadge: 'Coming soon'
	},
	languages: {
		title: 'Workshop, OverPy, and OSTW.',
		items: {
			workshop: {
				name: 'Workshop',
				status: 'Supported',
				body: 'Full native syntax support, in English and Chinese. Convert between the two.'
			},
			overpy: {
				name: 'OverPy',
				status: 'Partial',
				body: 'Check, lint, and analyze OverPy projects. Compile them to Workshop.'
			},
			ostw: {
				name: 'OSTW',
				status: 'In development',
				body: 'deltin-rs is in progress. Wright support follows.'
			}
		},
		compatibility: {
			title: 'Compatibility',
			lead: 'OverPy and OSTW output is compared with the original compilers, structure by structure.',
			criteriaLabel: 'What gets compared',
			criteria: [
				'Rule order',
				'Which actions and values are used',
				'Control flow',
				'Condition structure',
				'How values are built',
				'Variable names and indices',
				'Element count'
			]
		}
	},
	install: {
		title: 'Get Wright.',
		lead: 'wright and wright-lsp, in one install.',
		platformLabel: 'Platform',
		targets: {
			macos: {
				label: 'macOS',
				badge: 'Apple silicon & Intel',
				method: 'Homebrew',
				altMethod: 'Installer script',
				note: 'Installs the released wright and wright-lsp binaries.'
			},
			linux: {
				label: 'Linux',
				badge: 'x86_64',
				method: 'Installer script',
				altMethod: 'Custom install directory',
				note: 'Downloads the matching release archive and verifies its checksum.'
			},
			windows: {
				label: 'Windows',
				badge: 'x86_64',
				method: 'PowerShell installer',
				altMethod: 'Custom install directory',
				note: 'Downloads the matching Windows release and verifies its checksum.'
			},
			ci: {
				label: 'CI & agents',
				badge: 'Pinned',
				method: 'Pinned version',
				altMethod: 'JSON output',
				note: 'Set WRIGHT_VERSION to a tag from GitHub Releases so every run uses the same build.'
			},
			source: {
				label: 'From source',
				badge: `Rust ${site.msrv}+`,
				method: 'Cargo build',
				altMethod: 'Run tests',
				note: 'Build Wright from a checkout of wrightkit/wright.'
			}
		},
		releases: {
			before: 'Release archives and checksums for every platform are on the ',
			link: 'GitHub Releases page',
			after: '.'
		}
	},
	ecosystem: {
		eyebrow: 'Open source',
		title: 'How it fits together.',
		lead: 'Wright is the tool you install. Each language lives in its own open-source project.',
		principles: [
			{
				title: 'Honest',
				body: 'Wright tells you what it can’t verify, and makes no promises about a live server.'
			},
			{
				title: 'Just the facts',
				body: 'Verified Workshop data. No calls on balance or game design.'
			},
			{
				title: 'Few false positives',
				body: 'Built-in rules stay strict. Broader checks go in optional rule sets.'
			}
		],
		repos: {
			wright: 'CLI and language server.',
			'workshop-rs': 'Workshop core: elements, parsing, validation.',
			'opy-rs': 'OverPy compiler and analysis.',
			'deltin-rs': 'DeltinScript / OSTW (in development).',
			'language-provider-protocol': 'Protocol between Wright and language implementations.',
			skills: 'wright skill for coding agents.',
			'homebrew-tap': 'Homebrew formula.'
		},
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
	},
	footer: {
		note: 'Tooling for Overwatch Workshop development.'
	}
};

export default en;
