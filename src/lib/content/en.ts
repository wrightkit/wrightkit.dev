import { site } from '$lib/site';
import type { Messages } from './types';

const en: Messages = {
	meta: {
		title: 'WrightKit: Tooling for Overwatch Workshop development',
		description:
			'WrightKit is tooling for Overwatch Workshop development. Its CLI, Wright, checks, lints, and analyzes real Workshop and OverPy projects, for developers and their coding agents.'
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
		headline: 'Workshop tooling that shows its work.',
		lead: 'Wright checks your Workshop and OverPy code for errors and server-load risks. Every finding points to the exact line and says how sure it is. Your editor, your CI, and your coding agent get the same results.',
		primaryCta: 'Install Wright',
		secondaryCta: 'View on GitHub'
	},
	terminal: {
		title: 'Terminal',
		label: 'Example wright session'
	},
	tooling: {
		title: 'Built for checking real projects.',
		lead: 'Checks, lints, and analysis read your code the same way, so every result has a fixed code and an exact location. Compiling between languages is there to support these checks.',
		items: {
			check: {
				title: 'Diagnostics',
				body: 'Errors and warnings, each with a fixed code, a severity, and the exact source range.'
			},
			lint: {
				title: 'High-confidence lints',
				body: 'A small set of built-in rules for loops, waits, and conditions that load the server. Each finding says how strong its evidence is.'
			},
			analyze: {
				title: 'Analysis',
				body: 'Hot spots, loops and waits, and variables shared between rules. Every fact says whether it is certain or a heuristic.'
			},
			inspect: {
				title: 'Inspection',
				body: 'The full structure and meaning of a program, for tools that need more than a summary.'
			},
			lsp: {
				title: 'Editor support',
				body: 'wright-lsp adds hover, go to definition, references, completion, rename, and live diagnostics to any editor that speaks LSP.'
			},
			ci: {
				title: 'CI',
				body: 'Documented exit codes, one JSON format for every result, and automatic annotations in GitHub Actions.'
			}
		}
	},
	agents: {
		title: 'One set of tools for you and your coding agent.',
		lead: 'Your agent gets the same results you do, as stable JSON. It does not have to scrape terminal output or parse code itself. WrightKit gives agents Workshop tooling; it is not an agent framework.',
		developers: {
			title: 'For developers',
			points: [
				'Clear terminal output that points to the problem line',
				'Editor integration through wright-lsp',
				'Per-project lint settings: turn a rule off or change its severity',
				'Pull request annotations when Wright runs in GitHub Actions'
			]
		},
		codingAgents: {
			title: 'For coding agents',
			points: [
				'One versioned JSON format for every command',
				'Fixed diagnostic codes, rule IDs, and exit codes to branch on',
				'Batches of edits checked as a whole; overlapping or order-dependent edits are refused',
				'The wright Agent Skill, published in wrightkit/skills'
			]
		},
		loop: {
			title: 'Where this is heading',
			lead: 'The goal: you describe what you want, and an agent uses WrightKit for every step below, so you can focus on design instead of Workshop syntax. Parts of this work today; a versioned agent contract is still in progress.',
			steps: [
				{ title: 'Inspect', body: 'Read the project, its rules, and dependencies.' },
				{ title: 'Edit', body: 'Make targeted source changes that are checked first.' },
				{ title: 'Check', body: 'Re-run diagnostics and lints.' },
				{ title: 'Assess', body: 'Estimate cost and flag server-load risk.' },
				{ title: 'Report', body: 'Say what cannot be proven without running it.' }
			]
		}
	},
	languages: {
		title: 'Workshop at the center, OverPy and OSTW around it.',
		lead: 'Each language has its own implementation, and conversions between them go through Workshop instead of one-off bridges. Support is added where real projects need it.',
		items: {
			workshop: {
				name: 'Workshop',
				status: 'Supported',
				body: 'Wright treats it as source you write: parsing, validation, analysis, standard-form output, and en-US ↔ zh-CN conversion.'
			},
			overpy: {
				name: 'OverPy',
				status: 'Partial',
				body: 'Check, lint, and analyze existing OverPy projects with Wright. Compiling to Workshop covers the supported syntax; anything else gets a clear diagnostic.'
			},
			ostw: {
				name: 'OSTW',
				status: 'In development',
				body: 'deltin-rs handles parsing, projects, and type analysis. Compiling advanced features is unfinished, and Wright does not support OSTW yet.'
			}
		},
		compatibility: {
			title: 'What “compatible” means',
			lead: 'For OverPy and OSTW, the original compiler is the reference. Wright and the original compile the same source, and the two Workshop results are compared structure by structure.',
			criteriaLabel: 'What gets compared',
			criteria: [
				'Rule order',
				'Which actions and values are used',
				'Control flow',
				'Condition structure',
				'How values are built',
				'Variable names and indices',
				'Element count'
			],
			notes: [
				'Formatting, whitespace, and comments do not count. Text diffs are never the measure.',
				'Any difference from the original output, even for an apparent upstream bug, needs an approved, recorded exception.',
				'New heroes, maps, actions, and settings land in workshop-rs without waiting for upstream releases.'
			]
		}
	},
	install: {
		title: 'Get Wright.',
		lead: 'One install gives you wright and wright-lsp. The language engines also publish their own libraries from their repositories.',
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
		title: 'How WrightKit fits together.',
		lead: 'Wright is what you install. The language engines under it are separate projects you can also use on their own, each with its own tests, releases, and license.',
		principles: [
			{
				title: 'Honest about limits',
				body: 'Wright explains how it reached each result and flags what it cannot prove. It does not promise how code behaves on a live server.'
			},
			{
				title: 'Technical facts only',
				body: 'WrightKit tracks verified Workshop facts such as the element catalog and resource limits. It does not judge balance or game design.'
			},
			{
				title: 'Small, predictable core',
				body: 'Built-in rules aim for few false positives. Broader checks belong in optional rule sets.'
			}
		],
		repos: {
			wright: 'The CLI and language server: diagnostics, lint, analysis, editor and CI integration.',
			'workshop-rs':
				'The Workshop core: element catalog, parsing, validation, localization, and output.',
			'opy-rs': 'OverPy implementation with semantic analysis and compilation to Workshop.',
			'deltin-rs': 'DeltinScript / OSTW implementation (in development).',
			'language-provider-protocol': 'Versioned protocol that connects Wright to language implementations.',
			skills: 'The wright Agent Skill for coding agents.',
			'homebrew-tap': 'Homebrew formula for Wright.'
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
