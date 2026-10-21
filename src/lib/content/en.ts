import { site } from '#lib/site.js';
import type { Messages } from './types';

const en: Messages = {
	meta: {
		title: 'WrightKit: Tooling for Overwatch Workshop development',
		description:
			'Stop guessing where the server-load risks are. Wright statically analyzes Overwatch Workshop and OverPy code and points every problem to a line.',
		imageAlt: 'WrightKit, tooling for Overwatch Workshop development',
		keywords: 'Overwatch Workshop, OverPy, Wright, WrightKit, Workshop lint, server load'
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
		start: 'Get started',
		features: 'Features',
		languages: 'Languages',
		install: 'Install',
		docs: 'Docs',
		results: 'Results'
	},
	hero: {
		eyebrow: 'For Overwatch Workshop and OverPy',
		headline: 'Workshop code, checked.',
		lead: 'Stop guessing where the server-load risks are. Wright statically analyzes Workshop and OverPy code and points every problem to a line.',
		primaryCta: 'Install Wright',
		secondaryCta: 'View on GitHub'
	},
	terminal: {
		title: 'Terminal',
		label: 'wright lint on rules copied from the game'
	},
	start: {
		title: 'Copy. Save. Check.',
		steps: {
			copy: {
				title: 'Copy from the game',
				body: 'Copy your rules or full game settings, the same way you would to share them.'
			},
			save: {
				title: 'Paste into a file',
				body: 'Save it as a text file, such as rules.txt. English and Chinese client code both work.'
			},
			check: {
				title: 'Run Wright',
				body: 'Each finding points to a line in the file. Fix it, then paste it back into the game.'
			}
		}
	},
	features: {
		title: 'What it catches.',
		examples: {
			typo: {
				title: 'Typos',
				body: 'A misspelled action or value, caught before you paste the code back.'
			},
			noWait: {
				title: 'While without Wait',
				body: 'A loop that never pauses can overload the server.'
			},
			minWait: {
				title: 'Waiting 0.016 seconds',
				body: 'The loop runs as fast as the game allows.'
			},
			losInLoop: {
				title: 'Line of sight in a loop',
				body: 'A geometry check repeated on every pass can get expensive.'
			}
		}
	},
	tooling: {
		title: 'More tools.',
		items: {
			analyze: {
				title: 'Analyze',
				body: 'Element cost, your most complex rules, server-load risks, and the variables most rules share. Each result says whether it is exact, static, or a heuristic.'
			},
			inspect: {
				title: 'Inspect',
				body: 'Query rules, symbols, references, control flow, and call graphs. inspect cost breaks down each rule’s element cost and compares it with your last run.'
			},
			edit: {
				title: 'Checked edits',
				body: 'Rename a variable or subroutine, or apply lint fixes with lint --fix. Wright shows the validated diff first and writes only with --write.'
			},
			lookup: {
				title: 'Lookup',
				body: 'Turn a near spelling into the exact name and signature of an action or value, in Workshop or OverPy.'
			},
			lsp: {
				title: 'Editor',
				body: 'Errors as you type in editors that support language servers. Workshop files get hover, go to definition, and find references; OverPy files get navigation and rename. No VS Code extension yet.'
			},
			ui: {
				title: 'Rule view',
				body: 'Browse a Workshop project’s rules in the browser, read-only and local: event, conditions, and actions, with names in your locale. Raw Workshop files only; OverPy is refused.'
			},
			ci: {
				title: 'CI',
				body: 'Run Wright in GitHub Actions and findings show up on the pull request.'
			}
		}
	},
	languages: {
		title: 'Workshop, OverPy, and OSTW.',
		items: {
			workshop: {
				name: 'Workshop',
				status: 'Supported',
				body: 'Full native syntax. Code from the English or Chinese client works as is.'
			},
			overpy: {
				name: 'OverPy',
				status: 'Partial',
				body: 'Keep your .opy files. Wright checks, lints, analyzes, and renames them, and compiles them to Workshop with output held to the original OverPy compiler.'
			},
			ostw: {
				name: 'OSTW',
				status: 'Paused',
				body: 'deltin-rs parses and type-checks OSTW, but feature work is paused. Wright does not support it yet.'
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
				title: 'Agent guide and MCP',
				body: 'wright agent install adds the Wright guide to your project. Add --mcp claude, cursor, or vscode to register the MCP server too.'
			}
		],
		upcomingLabel: 'Coming soon',
		upcoming: ['From request to change']
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
	results: {
		meta: {
			title: 'Wright Agent Score: how coding agents do with Wright | WrightKit',
			description:
				'Compare how coding agents score on Workshop and OverPy tasks when they work through Wright, with a 95% interval for every score.',
			imageAlt: 'WrightKit, tooling for Overwatch Workshop development'
		},
		eyebrow: 'Wright Agent Score',
		title: 'How coding agents score with Wright',
		lead: 'Every agent gets the same tasks, the same Wright release, and the same Wright skill. The score is the share of runs that end in a result that passes the checks.',
		loading: 'Loading results…',
		empty: {
			title: 'No results yet',
			body: 'Results appear here once a benchmark run is published. If you expected some, reload the page later.'
		},
		unsupported: {
			title: 'Older data format',
			body: 'The published results use a data format this page cannot read yet. Reload later, or check the repository for an update.'
		},
		columns: { rank: 'Rank', agent: 'Agent', model: 'Model', effort: 'Effort' },
		tracks: { workshop: 'Workshop', opy: 'OverPy' },
		interval: '95% interval',
		notRun: 'Not run',
		tiedWithTop: 'Tied with top',
		provisional: 'Provisional',
		noEffort: 'Default',
		howToRead: {
			title: 'How to read the score',
			items: [
				'A score runs from 0 to 100: the share of runs that end in a usable result, averaged over the tasks of one language. The dark bar is the score; the lighter range is its 95% interval.',
				'Workshop and OverPy are scored separately and never averaged. Rows are ordered by Workshop score, then OverPy score.',
				'When a row’s interval overlaps the first row’s, the data cannot tell them apart. That row is marked “Tied with top”.',
				'The network is off by instruction only: agents are told not to use it, and nothing blocks them.',
				'A run that times out counts as a failure.',
				'Each language has 8 tasks, so a single task moves a score a lot.',
				'The score is a reference for this setup, not a measure of an agent’s general ability.'
			]
		},
		ran: { title: 'What was run', wright: 'Wright', suite: 'Task suite' }
	},
	footer: {
		note: 'Tooling for Overwatch Workshop development.',
		openSource: 'Open source'
	}
};

export default en;
