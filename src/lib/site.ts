/**
 * Locale-independent site data: URLs, commands, repository names, and the
 * captured CLI output. None of it is translated, because translating it would
 * change the technical content. Localized copy lives in `src/lib/content/`.
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
	url: 'https://wrightkit.dev',
	github: 'https://github.com/wrightkit/wright',
	org: 'https://github.com/wrightkit',
	releases: 'https://github.com/wrightkit/wright/releases',
	license: 'AGPL-3.0-or-later',
	msrv: '1.85'
} as const;

export const quickInstall = 'curl -fsSL https://wrightkit.dev/install.sh | bash';

export const navSections = ['tooling', 'agents', 'languages', 'install'] as const;
export type NavSection = (typeof navSections)[number];

export type TerminalLineKind = 'prompt' | 'error' | 'warning' | 'dim' | 'blank';

/** Output captured from wright 0.2.40 (paths shortened); keep in sync with the real CLI. */
export const terminalLines = [
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
] as const satisfies readonly { kind: TerminalLineKind; text: string }[];

export const tooling = [
	{ id: 'check', command: 'wright check' },
	{ id: 'lint', command: 'wright lint' },
	{ id: 'analyze', command: 'wright analyze' },
	{ id: 'inspect', command: 'wright inspect' },
	{ id: 'lsp', command: 'wright-lsp' },
	{ id: 'ci', command: 'wright lint --format json' }
] as const;
export type ToolingId = (typeof tooling)[number]['id'];

export type SupportTone = 'supported' | 'partial' | 'pending';

export const languages = [
	{
		id: 'workshop',
		tone: 'supported',
		owner: 'workshop-rs',
		ownerHref: 'https://github.com/wrightkit/workshop-rs'
	},
	{
		id: 'overpy',
		tone: 'partial',
		owner: 'opy-rs',
		ownerHref: 'https://github.com/wrightkit/opy-rs'
	},
	{
		id: 'ostw',
		tone: 'pending',
		owner: 'deltin-rs',
		ownerHref: 'https://github.com/wrightkit/deltin-rs'
	}
] as const satisfies readonly { id: string; tone: SupportTone; owner: string; ownerHref: string }[];
export type LanguageId = (typeof languages)[number]['id'];

export const installTargets = [
	{
		id: 'macos',
		command: 'brew install wrightkit/tap/wright',
		altCommand: 'curl -fsSL https://wrightkit.dev/install.sh | bash'
	},
	{
		id: 'linux',
		command: 'curl -fsSL https://wrightkit.dev/install.sh | bash',
		altCommand: 'curl -fsSL https://wrightkit.dev/install.sh | bash -s -- --dir ~/.local/bin'
	},
	{
		id: 'windows',
		command: 'irm https://wrightkit.dev/install.ps1 | iex',
		altCommand:
			'$script = irm https://wrightkit.dev/install.ps1; & ([scriptblock]::Create($script)) -InstallDir "$HOME\\bin"'
	},
	{
		id: 'ci',
		command:
			'curl -fsSL https://wrightkit.dev/install.sh | bash -s -- --version "$WRIGHT_VERSION"',
		altCommand: 'wright lint src/main.opy --format json'
	},
	{
		id: 'source',
		command: 'cargo build --release -p wright-cli -p wright-lsp',
		altCommand: 'cargo test --workspace --all-targets --all-features'
	}
] as const;
export type InstallTargetId = (typeof installTargets)[number]['id'];

export const repos = [
	{ repo: 'wright', href: 'https://github.com/wrightkit/wright' },
	{ repo: 'workshop-rs', href: 'https://github.com/wrightkit/workshop-rs' },
	{ repo: 'opy-rs', href: 'https://github.com/wrightkit/opy-rs' },
	{ repo: 'deltin-rs', href: 'https://github.com/wrightkit/deltin-rs' },
	{
		repo: 'language-provider-protocol',
		href: 'https://github.com/wrightkit/language-provider-protocol'
	},
	{ repo: 'skills', href: 'https://github.com/wrightkit/skills' },
	{ repo: 'homebrew-tap', href: 'https://github.com/wrightkit/homebrew-tap' }
] as const;
export type RepoName = (typeof repos)[number]['repo'];
