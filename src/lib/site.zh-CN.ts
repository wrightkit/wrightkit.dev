/**
 * Simplified Chinese public copy.
 *
 * Keep capability claims structurally aligned with site.ts. Commands, repository
 * names, protocol names, and captured CLI output remain literal.
 */

import {
	site as englishSite,
	terminal as englishTerminal,
	type NavItem,
	type SupportTone
} from './site';

export const site = {
	...englishSite,
	tagline: '守望先锋 Workshop 开发工具',
	description:
		'WrightKit 是一套以工具为先的《守望先锋》Workshop 工具链。其 CLI Wright 为真实的 Workshop 和 OverPy 项目提供诊断、静态分析和语义检查，并把同样的结构化结果提供给编辑器、CI 和编程 Agent。'
} as const;

export const nav = [
	{ label: '工具', href: '#tooling' },
	{ label: 'Agent', href: '#agents' },
	{ label: '语言', href: '#languages' },
	{ label: '安装', href: '#install' },
	{ label: 'GitHub', href: site.org, external: true }
] satisfies readonly NavItem[];

export const hero = {
	eyebrow: '面向 Workshop 开发者与编程 Agent',
	headline: '让判断过程清楚可见的 Workshop 工具。',
	lead: 'Wright 可以检查、lint 和分析原生 Workshop 与 OverPy 项目。每项结果都会定位到准确行，并说明判断的确定程度；同样的结果也会以结构化数据提供给编辑器、CI 和编程 Agent。',
	primaryCta: { label: '安装 Wright', href: '#install' },
	secondaryCta: { label: '在 GitHub 查看', href: site.github },
	quickInstall: 'curl -fsSL https://wrightkit.dev/install.sh | bash'
} as const;

export const terminal = { ...englishTerminal, title: '终端' } as const;

export const tooling = {
	eyebrow: '工具优先',
	title: '为真实项目检查而构建。',
	lead: '诊断、lint 与分析共享同一套语义模型，因此每项结果都有稳定代码和准确源码位置。编译用于连接语言，而不是产品本身的重点。',
	items: [
		{ id: 'check', title: '诊断', body: '错误和警告带有稳定代码、严重级别以及准确的源码范围。', command: 'wright check' },
		{ id: 'lint', title: '高置信度 lint', body: '内置少量针对循环、Wait 和条件模式的规则，用于识别可能增加服务器负载的写法。每条结果都会标明判断强度。', command: 'wright lint' },
		{ id: 'analyze', title: '分析', body: '定位控制流热点、循环与 Wait，以及跨规则共享的变量；每项结论都会标明是静态判断还是启发式判断。', command: 'wright analyze' },
		{ id: 'inspect', title: '深度检查', body: '提供程序完整的结构和语义视图，供需要超过摘要信息的工具使用。', command: 'wright inspect' },
		{ id: 'lsp', title: '编辑器支持', body: 'wright-lsp 为任何 LSP 编辑器提供 hover、跳转定义、查找引用、补全、重命名和实时诊断。', command: 'wright-lsp' },
		{ id: 'ci', title: 'CI', body: '明确的退出码、统一的 JSON 结果格式，并自动识别 GitHub Actions 注解。', command: 'wright lint --format json' }
	]
} as const;

export const agents = {
	eyebrow: '开发者与 Agent',
	title: '你和编程 Agent 使用同一套工具。',
	lead: 'Agent 获得与你相同的语义结果，并以确定性的结构化数据返回。不需要抓取终端文本，也不需要重新实现 parser。WrightKit 是面向 Agent 的 Workshop 工具，而不是一个 Agent 框架。',
	columns: [
		{
			title: '面向开发者',
			points: [
				'可读的终端输出，直接定位到出错行',
				'通过 wright-lsp 接入编辑器',
				'项目级 lint 配置：可以关闭规则或调整严重级别',
				'在 GitHub Actions 中运行 Wright 时生成 Pull Request 注解'
			]
		},
		{
			title: '面向编程 Agent',
			points: [
				'所有命令使用同一个版本化 JSON 结果格式',
				'稳定的诊断代码、Rule ID 和退出码，便于程序分支处理',
				'将编辑事务作为整体验证，拒绝重叠或依赖执行顺序的编辑',
				'发布在 wrightkit/skills 中的 wright Agent Skill'
			]
		}
	],
	loop: {
		title: '下一步方向',
		lead: '目标是意图驱动开发：Agent 接收需求，并在下面每一步使用 WrightKit，让你把注意力放在设计而不是 Workshop 语法上。这个循环已有部分能力可用，版本化 Agent contract 仍在推进中。',
		steps: [
			{ title: 'Inspect', body: '读取项目、规则及其依赖。' },
			{ title: 'Edit', body: '应用有针对性且经过验证的源码修改。' },
			{ title: 'Check', body: '重新运行诊断和 lint。' },
			{ title: 'Assess', body: '估算成本并标记服务器负载风险。' },
			{ title: 'Report', body: '明确哪些行为无法通过静态分析证明。' }
		]
	}
} as const;

export const languages = {
	eyebrow: '语言',
	title: '以原生 Workshop 为中心，连接成熟语言。',
	lead: 'Workshop 是共享表示。每种源语言都有自己的实现，转换统一经过 Workshop，而不是建立两两之间的专用桥接。支持范围由真实项目推动，而不是靠功能清单。',
	items: [
		{
			name: 'Workshop', status: '已支持', tone: 'supported', owner: 'workshop-rs',
			ownerHref: 'https://github.com/wrightkit/workshop-rs',
			body: '原生 Workshop 是一等输入形式，不只是编译产物。支持解析、验证、分析、规范化输出，以及 en-US ↔ zh-CN 转换。'
		},
		{
			name: 'OverPy', status: '部分支持', tone: 'partial', owner: 'opy-rs',
			ownerHref: 'https://github.com/wrightkit/opy-rs',
			body: '可以在 Wright 中检查、lint 和分析现有 OverPy 项目。编译到 Workshop 覆盖已支持的语言结构，其余情况会返回结构化诊断。'
		},
		{
			name: 'OSTW', status: '开发中', tone: 'pending', owner: 'deltin-rs',
			ownerHref: 'https://github.com/wrightkit/deltin-rs',
			body: '解析、项目加载和类型分析由 deltin-rs 提供。高级 lowering 尚未完整，Wright 目前也尚未发布 OSTW 支持。'
		}
	] satisfies {
		name: string; status: string; tone: SupportTone; owner: string; ownerHref: string; body: string;
	}[],
	compatibility: {
		title: '“兼容”意味着什么',
		lead: '对于 OverPy 和 OSTW，上游编译器就是规范。WrightKit 与上游编译同一份源码，再把两边结果解析为规范化 Workshop 程序，逐结构比较。',
		criteria: ['规则顺序', '元素标识', '控制流', '条件结构', '值构造', '变量名与索引', '元素成本'],
		notes: [
			'格式、空白和注释不计入兼容性判断，绝不使用文本 diff 作为衡量方式。',
			'任何偏离上游输出的行为，即使看起来是上游 bug，也需要经过批准并记录为明确例外。',
			'新的英雄、地图、动作和设置直接进入 workshop-rs，无需等待上游发布。'
		]
	}
} as const;

export const install = {
	eyebrow: '安装',
	title: '安装 Wright。',
	lead: '一次安装即可获得 wright 和 wright-lsp。底层语言引擎也会从各自仓库发布可独立使用的库。',
	targets: [
		{
			id: 'macos', label: 'macOS', badge: 'Apple 芯片与 Intel', method: 'Homebrew',
			command: 'brew install wrightkit/tap/wright', altMethod: '安装脚本',
			altCommand: 'curl -fsSL https://wrightkit.dev/install.sh | bash',
			note: '安装已发布的 wright 和 wright-lsp 二进制文件。'
		},
		{
			id: 'linux', label: 'Linux', badge: 'x86_64', method: '安装脚本',
			command: 'curl -fsSL https://wrightkit.dev/install.sh | bash', altMethod: '自定义安装目录',
			altCommand: 'curl -fsSL https://wrightkit.dev/install.sh | bash -s -- --dir ~/.local/bin',
			note: '下载匹配平台的 release 压缩包并校验 checksum。'
		},
		{
			id: 'windows', label: 'Windows', badge: 'x86_64', method: 'PowerShell 安装脚本',
			command: 'irm https://wrightkit.dev/install.ps1 | iex', altMethod: '自定义安装目录',
			altCommand: '$script = irm https://wrightkit.dev/install.ps1; & ([scriptblock]::Create($script)) -InstallDir "$HOME\\bin"',
			note: '下载匹配的 Windows release 并校验 checksum。'
		},
		{
			id: 'ci', label: 'CI 与 Agent', badge: '固定版本', method: '固定版本',
			command: 'curl -fsSL https://wrightkit.dev/install.sh | bash -s -- --version "$WRIGHT_VERSION"',
			altMethod: '机器可读输出', altCommand: 'wright lint src/main.opy --format json',
			note: '将 WRIGHT_VERSION 设为 GitHub Releases 中的 tag，保证每次运行使用同一个构建版本。'
		},
		{
			id: 'source', label: '从源码构建', badge: `Rust ${site.msrv}+`, method: 'Cargo build',
			command: 'cargo build --release -p wright-cli -p wright-lsp', altMethod: '运行测试',
			altCommand: 'cargo test --workspace --all-targets --all-features',
			note: '从 wrightkit/wright checkout 构建 Wright。'
		}
	],
	fallbackArchive: {
		text: '所有平台的 release 压缩包和 checksum 都可以在',
		linkText: 'GitHub Releases 页面',
		href: site.releases
	}
} as const;

export const ecosystem = {
	eyebrow: '开源',
	title: 'WrightKit 如何协同工作。',
	lead: 'Wright 是你实际安装的产品。底层语言引擎是可独立使用的项目，各自维护自己的测试、release 和 license。',
	principles: [
		{ title: '明确能力边界', body: 'Wright 会解释静态判断，并明确标出无法证明的部分。它不会承诺代码在真实服务器上的运行结果。' },
		{ title: '技术事实，不做主观判断', body: 'WrightKit 追踪已验证的 Workshop 技术事实，例如元素目录和资源限制；不会评价平衡性或游戏设计。' },
		{ title: '小而可预测的核心', body: '内置规则优先减少误报；更宽泛的检查应放在可选规则集中。' }
	],
	repos: [
		{ repo: 'wright', href: 'https://github.com/wrightkit/wright', role: 'CLI 与 language server：诊断、lint、分析，以及编辑器和 CI 集成。' },
		{ repo: 'workshop-rs', href: 'https://github.com/wrightkit/workshop-rs', role: '规范化 Workshop 语义：catalog、解析、验证、本地化和输出。' },
		{ repo: 'opy-rs', href: 'https://github.com/wrightkit/opy-rs', role: 'OverPy 实现，包含语义分析和 Workshop 编译。' },
		{ repo: 'deltin-rs', href: 'https://github.com/wrightkit/deltin-rs', role: 'DeltinScript / OSTW 实现，仍在开发中。' },
		{ repo: 'language-provider-protocol', href: 'https://github.com/wrightkit/language-provider-protocol', role: 'Wright 与语言 provider 之间的版本化协议。' },
		{ repo: 'skills', href: 'https://github.com/wrightkit/skills', role: '面向编程 Agent 的 wright Agent Skill。' },
		{ repo: 'homebrew-tap', href: 'https://github.com/wrightkit/homebrew-tap', role: 'Wright 的 Homebrew formula。' }
	],
	nonGoals: {
		title: '不在范围',
		items: ['通用编译器框架', '完整 IDE', '项目托管', '通用 AI Agent 框架', '游戏运行时模拟器', '转译器集合']
	}
} as const;

export const footer = {
	note: '守望先锋 Workshop 开发工具。',
	copyright: '© 2026 WrightKit'
} as const;
