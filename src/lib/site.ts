import type { Locale } from './locales';

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
	docs: 'https://github.com/wrightkit/wright#readme',
	org: 'https://github.com/wrightkit',
	releases: 'https://github.com/wrightkit/wright/releases',
	license: 'AGPL-3.0-or-later',
	msrv: '1.85'
} as const;

export const quickInstall = 'curl -fsSL https://install.wrightkit.dev/wright/install.sh | bash';

export const navSections = ['start', 'features', 'languages', 'install'] as const;
export type NavSection = (typeof navSections)[number];

/** Every section the header's wayfinding tracks, in page order. */
export const pageSections = ['start', 'features', 'tooling', 'languages', 'agents', 'install'] as const;

export type TerminalLineKind = 'prompt' | 'error' | 'warning' | 'info' | 'dim' | 'blank';

/**
 * `wright lint rules.txt` from wright 0.2.40 on a copied Workshop rule. Evidence
 * labels and source excerpts are trimmed; keep in sync with the real CLI.
 */
export const terminalLines = [
	{ kind: 'prompt', text: 'wright lint rules.txt' },
	{ kind: 'dim', text: 'WARN lint' },
	{ kind: 'dim', text: '  2 finding(s) across 6 rule(s)' },
	{ kind: 'blank', text: '' },
	{ kind: 'warning', text: 'warning[min-wait-loop]: loop body waits at the workshop minimum rate; the loop runs at maximum frequency' },
	{ kind: 'dim', text: '  --> rules.txt:18:3' },
	{ kind: 'blank', text: '' },
	{ kind: 'info', text: 'info[expensive-loop-check]: geometry predicate evaluated inside a loop body may be expensive per iteration' },
	{ kind: 'dim', text: '  --> rules.txt:20:4' }
] as const satisfies readonly { kind: TerminalLineKind; text: string }[];

/** The getting-started steps; only the last one runs a command. */
export const startSteps = [
	{ id: 'copy', command: null },
	{ id: 'save', command: null },
	{ id: 'check', command: 'wright lint rules.txt' }
] as const;
export type StartStepId = (typeof startSteps)[number]['id'];

/**
 * Real findings from wright 0.2.40. Each snippet is the actions block of an
 * `Ongoing - Each Player` rule, written the way the matching game client
 * copies it; the finding is the first line wright prints (evidence label
 * trimmed). Re-run both locales through `wright lint` when editing.
 */
export const examples = [
	{
		id: 'typo',
		kind: 'error',
		finding: {
			en: "error[unknown-action]: unknown action spelling 'Heall'",
			'zh-CN': "error[unknown-action]: unknown action spelling '治愈'"
		},
		code: {
			en: 'Heall(Event Player, Null, 10);',
			'zh-CN': '治愈(事件玩家, 空, 10);'
		}
	},
	{
		id: 'noWait',
		kind: 'warning',
		finding: {
			en: 'warning[while-without-wait]: loop body contains no wait call',
			'zh-CN': 'warning[while-without-wait]: loop body contains no wait call'
		},
		code: {
			en: 'While(Is Alive(Event Player));\n\tHeal(Event Player, Null, 10);\nEnd;',
			'zh-CN': 'While(存活(事件玩家));\n\t治疗(事件玩家, 空, 10);\nEnd;'
		}
	},
	{
		id: 'minWait',
		kind: 'warning',
		finding: {
			en: 'warning[min-wait-loop]: loop body waits at the workshop minimum rate',
			'zh-CN': 'warning[min-wait-loop]: loop body waits at the workshop minimum rate'
		},
		code: {
			en: 'While(Is Alive(Event Player));\n\tWait(0.016, Ignore Condition);\n\tHeal(Event Player, Null, 10);\nEnd;',
			'zh-CN': 'While(存活(事件玩家));\n\t等待(0.016, 无视条件);\n\t治疗(事件玩家, 空, 10);\nEnd;'
		}
	},
	{
		id: 'losInLoop',
		kind: 'info',
		finding: {
			en: 'info[expensive-loop-check]: geometry predicate evaluated inside a loop body',
			'zh-CN': 'info[expensive-loop-check]: geometry predicate evaluated inside a loop body'
		},
		code: {
			en: 'While(Is Alive(Event Player));\n\tWait(0.25, Ignore Condition);\n\tIf(Is In Line of Sight(Event Player, Vector(0, 0, 0), Barriers Do Not Block LOS));\n\t\tHeal(Event Player, Null, 10);\n\tEnd;\nEnd;',
			'zh-CN': 'While(存活(事件玩家));\n\t等待(0.25, 无视条件);\n\tIf(在视线内(事件玩家, 矢量(0, 0, 0), 屏障不会阻挡视线));\n\t\t治疗(事件玩家, 空, 10);\n\tEnd;\nEnd;'
		}
	}
] as const satisfies readonly {
	id: string;
	kind: 'error' | 'warning' | 'info';
	finding: Record<Locale, string>;
	code: Record<Locale, string>;
}[];
export type ExampleId = (typeof examples)[number]['id'];

export const tooling = [
	{ id: 'analyze', command: 'wright analyze' },
	{ id: 'inspect', command: 'wright inspect' },
	{ id: 'lsp', command: 'wright-lsp' },
	{ id: 'ci', command: 'wright lint' }
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
		altCommand: 'curl -fsSL https://install.wrightkit.dev/wright/install.sh | bash'
	},
	{
		id: 'linux',
		command: 'curl -fsSL https://install.wrightkit.dev/wright/install.sh | bash',
		altCommand: 'curl -fsSL https://install.wrightkit.dev/wright/install.sh | bash -s -- --dir ~/.local/bin'
	},
	{
		id: 'windows',
		command: 'irm https://install.wrightkit.dev/wright/install.ps1 | iex',
		altCommand:
			'$script = irm https://install.wrightkit.dev/wright/install.ps1; & ([scriptblock]::Create($script)) -InstallDir "$HOME\\bin"'
	},
	{
		id: 'ci',
		command:
			'curl -fsSL https://install.wrightkit.dev/wright/install.sh | bash -s -- --version "$WRIGHT_VERSION"',
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
