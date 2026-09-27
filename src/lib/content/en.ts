import { site } from '$lib/site';
import type { Messages } from './types';

const en: Messages = {
	meta: {
		title: 'WrightKit: Tooling for Overwatch Workshop development',
		description:
			'WrightKit is tooling for Overwatch Workshop development. Its CLI, Wright, checks, lints, and analyzes Workshop and OverPy projects, for developers and their coding agents.'
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
		headline: 'Catch Workshop bugs before you load the game.',
		lead: 'Wright finds errors and server-heavy code in Workshop and OverPy projects and points to the exact line. Use it in your terminal, editor, or CI, or let your coding agent run it.',
		primaryCta: 'Install Wright',
		secondaryCta: 'View on GitHub'
	},
	terminal: {
		title: 'Terminal',
		label: 'Example wright session'
	},
	tooling: {
		title: 'What Wright does.',
		items: {
			check: {
				title: 'Check',
				body: 'Reports errors and warnings with the file and line. Each kind of problem has a fixed code you can look up.'
			},
			lint: {
				title: 'Lint',
				body: 'Flags code that runs but causes trouble, such as a While loop with no Wait, or the same condition checked twice in one rule. Turn rules off or change their severity per project.'
			},
			analyze: {
				title: 'Analyze',
				body: 'Shows your longest and most branched rules, and the variables shared by the most rules.'
			},
			inspect: {
				title: 'Inspect',
				body: 'Lists every rule and variable in a project, and everywhere each one is used.'
			},
			lsp: {
				title: 'Editor support',
				body: 'wright-lsp shows errors as you type, with go to definition, completion, and rename, in any editor that supports LSP.'
			},
			ci: {
				title: 'CI',
				body: 'Run Wright in GitHub Actions and problems show up on the pull request.'
			}
		}
	},
	agents: {
		title: 'Tools for coding agents.',
		capabilities: [
			{
				title: 'JSON output',
				body: 'Every command supports --format json, in one versioned format.'
			},
			{
				title: 'Stable codes',
				body: 'Diagnostic codes, rule IDs, and exit codes stay fixed, so an agent can decide its next step from them.'
			},
			{
				title: 'Agent Skill',
				body: 'Install the wright skill from wrightkit/skills so your agent knows how to use Wright.'
			}
		],
		upcoming: [
			{
				title: 'From request to change',
				body: 'Describe what you want. The agent reads, edits, and checks the project with Wright.'
			},
			{
				title: 'Checked edits',
				body: 'Wright checks an agent’s edits before they are written to your files.'
			},
			{
				title: 'Project queries',
				body: 'Agents ask for rules, variables, references, and call relationships directly.'
			},
			{
				title: 'Cost estimates',
				body: 'See how much server load a change adds.'
			}
		],
		upcomingBadge: 'Coming soon'
	},
	languages: {
		title: 'Workshop at the center, OverPy and OSTW around it.',
		items: {
			workshop: {
				name: 'Workshop',
				status: 'Supported',
				body: 'Full support for native Workshop syntax, including conversion between English and Chinese code.'
			},
			overpy: {
				name: 'OverPy',
				status: 'Partial',
				body: 'Check, lint, and analyze OverPy projects, and compile them to Workshop.'
			},
			ostw: {
				name: 'OSTW',
				status: 'In development',
				body: 'The deltin-rs implementation is in progress. Wright support comes after it.'
			}
		},
		compatibility: {
			title: 'Compatibility',
			lead: 'The original OverPy and OSTW compilers are the reference. Wright’s output is compared with theirs on these points.',
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
		lead: 'Installs the wright and wright-lsp commands.',
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
		lead: 'Wright is what you install. The language implementations under it are separate projects you can also use on their own.',
		principles: [
			{
				title: 'Honest about limits',
				body: 'Wright marks what it cannot confirm. It does not promise how code behaves on a live server.'
			},
			{
				title: 'Technical facts only',
				body: 'Only verified Workshop data such as the element catalog and resource limits. No opinions on balance or game design.'
			},
			{
				title: 'Small, predictable core',
				body: 'Built-in rules aim for few false positives. Broader checks belong in optional rule sets.'
			}
		],
		repos: {
			wright: 'The CLI and language server.',
			'workshop-rs': 'The Workshop core: element catalog, parsing, and validation.',
			'opy-rs': 'The OverPy implementation, including compiling to Workshop.',
			'deltin-rs': 'DeltinScript / OSTW implementation (in development).',
			'language-provider-protocol': 'Versioned protocol that connects Wright to language implementations.',
			skills: 'The wright skill for coding agents.',
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
