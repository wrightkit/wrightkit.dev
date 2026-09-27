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
			'Wright 检查、lint 和分析守望先锋地图工坊与 OverPy 代码，编辑器、CI 和 AI 编程助手里都能用。'
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
		headline: '写地图工坊，\u200b心里有数。',
		lead: 'Wright 检查、lint 和分析守望先锋地图工坊与 OverPy 代码。进游戏之前，就能发现错误。',
		primaryCta: '安装 Wright',
		secondaryCta: '在 GitHub 上查看'
	},
	terminal: {
		title: '终端',
		label: 'wright 使用示例'
	},
	tooling: {
		title: '从写下第一行，\u200b到提交 PR。',
		items: {
			check: {
				title: '检查',
				body: '在游戏报错之前发现错误。每条诊断都有编号和精确位置。'
			},
			lint: {
				title: 'Lint',
				body: '揪出没有等待的循环和重复的条件，以及其他拖累服务器的写法。'
			},
			analyze: {
				title: '分析',
				body: '看清哪些规则最复杂，哪些变量被最多规则共用。'
			},
			inspect: {
				title: '结构',
				body: '所有规则、变量和引用，一目了然。'
			},
			lsp: {
				title: '编辑器',
				body: '边写边报错，支持跳转、补全和重命名。任何支持 LSP 的编辑器都能用。'
			},
			ci: {
				title: 'CI',
				body: '在 GitHub Actions 中运行，问题直接标在 PR 上。'
			}
		}
	},
	agents: {
		title: 'AI 编程助手，\u200b也能用。',
		capabilities: [
			{
				title: 'JSON 输出',
				body: '任何命令加上 --format json。统一格式，带版本号。'
			},
			{
				title: '固定编号',
				body: '诊断编号、规则 ID 和退出码固定不变，助手可以放心判断。'
			},
			{
				title: 'Agent Skill',
				body: '装上 wrightkit/skills 里的 wright skill，助手就会用 Wright。'
			}
		],
		upcoming: [
			{
				title: '从需求到改动',
				body: '说出需求，助手用 Wright 改好并检查。'
			},
			{
				title: '修改先校验',
				body: '修改在写入文件前先过校验。'
			},
			{
				title: '项目查询',
				body: '按需查询规则和变量，以及引用和调用关系。'
			},
			{
				title: '开销评估',
				body: '上线前就知道改动的服务器开销。'
			}
		],
		upcomingBadge: '即将推出'
	},
	languages: {
		title: '地图工坊、OverPy 和 OSTW。',
		items: {
			workshop: {
				name: '地图工坊',
				status: '已支持',
				body: '完整支持原生语法，中英文代码互转。'
			},
			overpy: {
				name: 'OverPy',
				status: '部分支持',
				body: '检查、lint 和分析 OverPy 项目，编译成地图工坊代码。'
			},
			ostw: {
				name: 'OSTW',
				status: '开发中',
				body: 'deltin-rs 开发中，之后接入 Wright。'
			}
		},
		compatibility: {
			title: '兼容性',
			lead: 'OverPy 和 OSTW 的编译结果，逐项对照原版编译器。',
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
		lead: '一次安装，wright 和 wright-lsp 都有。',
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
		title: 'WrightKit 的组成。',
		lead: '你安装的是 Wright。每种语言都有自己的开源项目。',
		principles: [
			{
				title: '说清局限',
				body: '确认不了的，Wright 会直说。线上服务器的表现，它不打包票。'
			},
			{
				title: '只讲事实',
				body: '只收录验证过的地图工坊数据，不评判平衡和玩法。'
			},
			{
				title: '少误报',
				body: '内置规则从严，更宽的检查放进可选规则集。'
			}
		],
		repos: {
			wright: '命令行工具和语言服务器。',
			'workshop-rs': '地图工坊核心，包括元素目录、解析和校验。',
			'opy-rs': 'OverPy 编译器和语义分析。',
			'deltin-rs': 'DeltinScript / OSTW（开发中）。',
			'language-provider-protocol': 'Wright 与各语言实现之间的协议。',
			skills: 'AI 编程助手用的 wright skill。',
			'homebrew-tap': 'Homebrew 安装配方。'
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
