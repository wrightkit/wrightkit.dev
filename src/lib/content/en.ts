import { site } from '$lib/site';
import type { Messages } from './types';

const en: Messages = {
	meta: {
		title: 'WrightKit: Tooling for Overwatch Workshop development',
		description:
			'Wright finds errors and server-heavy code in Overwatch Workshop and OverPy projects before your players run into them. Every finding points to a line.'
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
		docs: 'Docs'
	},
	hero: {
		eyebrow: 'For Overwatch Workshop and OverPy',
		headline: 'Workshop code, checked.',
		lead: 'Wright finds errors and server-heavy code before your players run into them. Every finding points to a line.',
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
				body: 'Your most complex rules and the variables most rules share.'
			},
			inspect: {
				title: 'Inspect',
				body: 'Every rule, variable, and reference in a project.'
			},
			lsp: {
				title: 'Editor',
				body: 'Errors as you type, plus go to definition, completion, and rename, in editors that support language servers. No VS Code extension yet.'
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
				body: 'Keep your .opy files. Wright checks them and compiles them to Workshop, with output held to the original OverPy compiler.'
			},
			ostw: {
				name: 'OSTW',
				status: 'In development',
				body: 'deltin-rs is in progress. Wright support follows.'
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
		upcomingLabel: 'Coming soon',
		upcoming: ['Request to change', 'Checked edits', 'Project queries', 'Cost estimates']
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
	footer: {
		note: 'Tooling for Overwatch Workshop development.',
		openSource: 'Open source'
	}
};

export default en;
