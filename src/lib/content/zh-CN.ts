import { site } from '$lib/site';
import type { Messages } from './types';

/*
 * Simplified Chinese copy. Written for Chinese Workshop developers rather than
 * translated word for word: Workshop terms follow the zh-CN game client
 * (地图工坊, 规则, 动作, 值, 服务器负载), and a space separates CJK text from
 * Latin words and numbers. Headings use keep-all line breaking, so `\u200b`
 * marks where a long heading may wrap without splitting a word.
 */
const zhCN: Messages = {
	meta: {
		title: 'WrightKit：守望先锋地图工坊开发工具',
		description:
			'WrightKit 是守望先锋地图工坊的开发工具链。命令行工具 Wright 可以检查、lint 和分析地图工坊与 OverPy 项目，开发者和 AI 编程助手都能用。'
	},
	ui: {
		skipToContent: '跳到正文',
		home: 'WrightKit 首页',
		primaryNav: '主导航',
		navigation: '导航',
		openMenu: '打开导航菜单',
		closeMenu: '关闭导航菜单',
		appearance: '外观',
		theme: { system: '自动', light: '浅色', dark: '深色' },
		language: '语言',
		currentLanguage: (name) => `语言：${name}`,
		copy: '复制命令',
		copyInstall: '复制安装命令',
		copied: '已复制到剪贴板'
	},
	nav: {
		tooling: '功能',
		agents: 'AI 助手',
		languages: '语言支持',
		install: '安装'
	},
	hero: {
		eyebrow: '面向地图工坊开发者和 AI 编程助手',
		headline: '进游戏前，\u200b先把代码查一遍。',
		lead: 'Wright 检查地图工坊和 OverPy 代码，找出错误和加重服务器负载的写法，并指到具体哪一行。终端和编辑器里能用，CI 和 AI 编程助手也能调用。',
		primaryCta: '安装 Wright',
		secondaryCta: '在 GitHub 上查看'
	},
	terminal: {
		title: '终端',
		label: 'wright 使用示例'
	},
	tooling: {
		title: 'Wright 能做的事。',
		items: {
			check: {
				title: '检查',
				body: '报告错误和警告，标出文件和行号。每类问题都有固定编号，方便查找。'
			},
			lint: {
				title: 'Lint',
				body: '找出能运行但容易出问题的写法，比如 While 循环里没有等待，或者同一条规则里把一个条件判断了两遍。规则可以按项目关闭或调整级别。'
			},
			analyze: {
				title: '分析',
				body: '列出最长和分支最多的规则，以及被最多规则共用的变量。'
			},
			inspect: {
				title: '查看结构',
				body: '列出项目里的每条规则和每个变量，以及它们在哪些地方被用到。'
			},
			lsp: {
				title: '编辑器支持',
				body: 'wright-lsp 让支持 LSP 的编辑器边写边报错，还能跳转到定义，支持补全和重命名。'
			},
			ci: {
				title: 'CI',
				body: '在 GitHub Actions 里运行 Wright，问题会直接标在 Pull Request 上。'
			}
		}
	},
	agents: {
		title: '给 AI 编程助手的工具。',
		capabilities: [
			{
				title: 'JSON 输出',
				body: '每个命令都支持 --format json，格式统一，带版本号。'
			},
			{
				title: '固定编号',
				body: '诊断编号、规则 ID 和退出码都是固定的，助手可以直接据此决定下一步。'
			},
			{
				title: 'Agent Skill',
				body: '从 wrightkit/skills 安装 wright skill，助手就知道怎么用 Wright。'
			}
		],
		upcoming: [
			{
				title: '从需求到改动',
				body: '你说要做什么，助手用 Wright 读懂项目，改完代码再检查一遍。'
			},
			{
				title: '修改先校验',
				body: '助手的修改先经过 Wright 校验，通过后才写进文件。'
			},
			{
				title: '项目查询',
				body: '助手可以直接查到规则和变量，以及它们的引用和调用关系。'
			},
			{
				title: '开销评估',
				body: '看一次修改会增加多少服务器负载。'
			}
		],
		upcomingBadge: '即将推出'
	},
	languages: {
		title: '以地图工坊为核心，\u200b连接 OverPy 与 OSTW。',
		items: {
			workshop: {
				name: '地图工坊',
				status: '已支持',
				body: '完整支持原生地图工坊语法，中英文代码可以互相转换。'
			},
			overpy: {
				name: 'OverPy',
				status: '部分支持',
				body: '检查、lint 和分析 OverPy 项目，也能编译成地图工坊代码。'
			},
			ostw: {
				name: 'OSTW',
				status: '开发中',
				body: 'deltin-rs 正在开发，完成后接入 Wright。'
			}
		},
		compatibility: {
			title: '兼容性',
			lead: 'OverPy 和 OSTW 以原版编译器为准，Wright 的输出和原版逐项比对下面这些内容。',
			criteriaLabel: '比对内容',
			criteria: [
				'规则顺序',
				'用到的动作和值',
				'控制流',
				'条件结构',
				'值的构建方式',
				'变量名与索引',
				'元素数量'
			]
		}
	},
	install: {
		title: '获取 Wright。',
		lead: '安装后可以使用 wright 和 wright-lsp 两个命令。',
		platformLabel: '平台',
		targets: {
			macos: {
				label: 'macOS',
				badge: 'Apple 芯片与 Intel',
				method: 'Homebrew',
				altMethod: '安装脚本',
				note: '安装已发布的 wright 和 wright-lsp 可执行文件。'
			},
			linux: {
				label: 'Linux',
				badge: 'x86_64',
				method: '安装脚本',
				altMethod: '自定义安装目录',
				note: '下载对应的发布包，并验证校验和。'
			},
			windows: {
				label: 'Windows',
				badge: 'x86_64',
				method: 'PowerShell 安装脚本',
				altMethod: '自定义安装目录',
				note: '下载对应的 Windows 发布包，并验证校验和。'
			},
			ci: {
				label: 'CI 与 AI 助手',
				badge: '固定版本',
				method: '安装指定版本',
				altMethod: 'JSON 输出',
				note: '把 WRIGHT_VERSION 设为 GitHub Releases 里的某个 tag，每次运行都用同一个版本。'
			},
			source: {
				label: '从源码构建',
				badge: `Rust ${site.msrv}+`,
				method: 'Cargo 构建',
				altMethod: '运行测试',
				note: '克隆 wrightkit/wright 后在本地构建。'
			}
		},
		releases: {
			before: '各平台的发布包和校验和都在 ',
			link: 'GitHub Releases 页面',
			after: '。'
		}
	},
	ecosystem: {
		eyebrow: '开源',
		title: 'WrightKit \u200b由哪些部分组成。',
		lead: 'Wright 是你要安装的工具。底层的各个语言实现都是独立项目，也可以单独使用。',
		principles: [
			{
				title: '坦诚说明局限',
				body: 'Wright 会标出它确认不了的地方，也不保证代码在实际服务器上的运行结果。'
			},
			{
				title: '只管技术事实',
				body: '只收录验证过的地图工坊数据，比如元素目录和资源上限，不评判平衡性和玩法设计。'
			},
			{
				title: '小而可靠的核心',
				body: '内置规则尽量少误报，更宽泛的检查放在可选规则集里。'
			}
		],
		repos: {
			wright: '命令行工具和语言服务器。',
			'workshop-rs': '地图工坊核心实现，包括元素目录、解析和校验。',
			'opy-rs': 'OverPy 实现，可以编译到地图工坊。',
			'deltin-rs': 'DeltinScript / OSTW 实现（开发中）。',
			'language-provider-protocol': '连接 Wright 与各语言实现的版本化协议。',
			skills: '给 AI 编程助手用的 wright skill。',
			'homebrew-tap': 'Wright 的 Homebrew 安装配方。'
		},
		nonGoals: {
			title: '不做什么',
			items: [
				'通用编译器框架',
				'完整的 IDE',
				'项目托管',
				'通用 AI Agent 框架',
				'游戏运行模拟器',
				'转译器合集'
			]
		}
	},
	footer: {
		note: '守望先锋地图工坊开发工具。'
	}
};

export default zhCN;
