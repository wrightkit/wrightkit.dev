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
			'WrightKit 是守望先锋地图工坊开发工具链。其命令行工具 Wright 可检查、lint 和分析真实的地图工坊与 OverPy 项目，供开发者与 AI 编程助手直接使用。'
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
		eyebrow: '面向地图工坊开发者与 AI 编程助手',
		headline: '有理有据的\u200b地图工坊工具。',
		lead: 'Wright 检查你的地图工坊和 OverPy 代码，找出错误和服务器负载隐患。每条结果都精确到行，并标明置信程度。你的编辑器、CI 与 AI 编程助手获得完全一致的结果。',
		primaryCta: '安装 Wright',
		secondaryCta: '在 GitHub 上查看'
	},
	terminal: {
		title: '终端',
		label: 'wright 使用示例'
	},
	tooling: {
		eyebrow: '工具优先',
		title: '专为检查\u200b真实项目打造。',
		lead: '检查、lint 和分析以同一种方式理解你的代码，每条结果都具备固定编号与精确位置。编译只负责连通不同语言，并非核心工作。',
		items: {
			check: {
				title: '诊断',
				body: '错误与警告均带有固定编号、严重级别和精确的源码位置。'
			},
			lint: {
				title: '高置信度 lint 规则',
				body: '一组精简的内置规则，专门排查会加重服务器负载的循环、等待和条件结构。每条结果均注明证据的充分程度。'
			},
			analyze: {
				title: '代码分析',
				body: '找出性能热点、循环与等待，以及多条规则共用的变量。每项结论均标明确凿事实与启发式推测。'
			},
			inspect: {
				title: '结构查看',
				body: '完整呈现程序的结构和语义，供需要深入细节的工具使用。'
			},
			lsp: {
				title: '编辑器支持',
				body: 'wright-lsp 为任何支持 LSP 的编辑器提供悬停提示、跳转到定义、查找引用、自动补全、重命名和实时诊断。'
			},
			ci: {
				title: 'CI 集成',
				body: '退出码有清晰文档说明，所有结果统一为 JSON 格式，并在 GitHub Actions 中自动标注问题。'
			}
		}
	},
	agents: {
		eyebrow: '开发者与 AI 助手',
		title: '你和 AI 编程助手，用同一套工具。',
		lead: 'AI 助手获得与你完全一致的结果，且采用格式稳定的 JSON，无需解析终端输出，亦无需自行编写解析器。WrightKit 为 AI 助手提供地图工坊工具支持，但其本身并非 Agent 框架。',
		developers: {
			title: '面向开发者',
			points: [
				'清晰的终端输出，直接定位出问题的那一行',
				'通过 wright-lsp 深度接入常用编辑器',
				'按项目配置 lint：可自由关闭规则或调整严重级别',
				'在 GitHub Actions 中运行时，直接在 Pull Request 上标注问题'
			]
		},
		codingAgents: {
			title: '面向 AI 编程助手',
			points: [
				'所有命令统一输出同一种带版本约定的 JSON',
				'固定不变的诊断编号、规则 ID 与退出码，便于做出分支判断',
				'批量修改整体校验，自动拒绝彼此重叠或依赖执行顺序的修改',
				'内置 wright Agent Skill，发布于 wrightkit/skills'
			]
		},
		loop: {
			title: '未来演进方向',
			lead: '目标是：你只需描述需求，AI 助手借助 WrightKit 完成以下每一步，让你专注于玩法设计而非地图工坊的语法细节。其中部分能力现已可用，带版本约定的 Agent 接口协议仍在开发中。',
			steps: [
				{ title: '查看', body: '读取项目、规则与依赖关系。' },
				{ title: '修改', body: '精准修改源码，改动均预先经过校验。' },
				{ title: '检查', body: '重新运行诊断与 lint 规则。' },
				{ title: '评估', body: '估算资源开销，标出服务器负载风险。' },
				{ title: '报告', body: '明确说明哪些行为未经实际运行便无法确认。' }
			]
		}
	},
	languages: {
		eyebrow: '语言支持',
		title: '以地图工坊为核心，\u200b连接 OverPy 与 OSTW。',
		lead: '每种语言均有独立实现，语言间转换统一以地图工坊为中枢，而非各自搭桥。支持范围随真实项目需求扩展，而非机械对照功能清单堆砌。',
		items: {
			workshop: {
				name: '地图工坊',
				status: '已支持',
				body: '可以直接编写的头等语言，而不单纯是编译产物。支持解析、校验、分析、规范化格式输出，以及英文 (en-US) 与简体中文 (zh-CN) 代码互转。'
			},
			overpy: {
				name: 'OverPy',
				status: '部分支持',
				body: '使用 Wright 检查、lint 和分析现有的 OverPy 项目。已支持的语法可直接编译至地图工坊，其余部分则给出明确诊断。'
			},
			ostw: {
				name: 'OSTW',
				status: '开发中',
				body: 'deltin-rs 已支持解析、项目管理与类型分析。高级特性的编译尚未完成，Wright 目前暂未支持 OSTW。'
			}
		},
		compatibility: {
			title: '何谓“兼容”',
			lead: '对 OverPy 和 OSTW 而言，原版上游编译器就是既定基准。Wright 与原版编译器编译同一份源码，并将两端生成的地图工坊代码逐结构展开比对。',
			criteriaLabel: '比对内容',
			criteria: [
				'规则顺序',
				'调用的动作与值',
				'控制流',
				'条件结构',
				'值的构建方式',
				'变量名与索引',
				'元素数量'
			],
			notes: [
				'排版、空白字符与注释均不计入比对，绝不以纯文本差异衡量兼容性。',
				'任何与原版输出的不一致，即使是为了规避上游疑似缺陷，也必须经过审核并明确记录为例外。',
				'新英雄、新地图、新动作与新配置会第一时间合入 workshop-rs，无需等待原版编译器更新发布。'
			]
		}
	},
	install: {
		eyebrow: '安装',
		title: '获取 Wright。',
		lead: '一次安装即可获得 wright 与 wright-lsp。各语言引擎也在各自仓库中作为独立库发布。',
		platformLabel: '平台',
		targets: {
			macos: {
				label: 'macOS',
				badge: 'Apple 芯片与 Intel',
				method: 'Homebrew',
				altMethod: '安装脚本',
				note: '安装已发布的 wright 与 wright-lsp 可执行文件。'
			},
			linux: {
				label: 'Linux',
				badge: 'x86_64',
				method: '安装脚本',
				altMethod: '自定义安装目录',
				note: '下载对应的发布归档，并验证校验和。'
			},
			windows: {
				label: 'Windows',
				badge: 'x86_64',
				method: 'PowerShell 安装脚本',
				altMethod: '自定义安装目录',
				note: '下载对应的 Windows 发布归档，并验证校验和。'
			},
			ci: {
				label: 'CI 与 AI 助手',
				badge: '固定版本',
				method: '安装指定版本',
				altMethod: 'JSON 输出',
				note: '将 WRIGHT_VERSION 设为 GitHub Releases 中的指定 tag，确保每次运行使用相同版本。'
			},
			source: {
				label: '从源码构建',
				badge: `Rust ${site.msrv}+`,
				method: 'Cargo 构建',
				altMethod: '运行测试',
				note: '从 wrightkit/wright 源码检出并在本地构建。'
			}
		},
		releases: {
			before: '各平台的发布归档与校验和均可在 ',
			link: 'GitHub Releases 页面',
			after: '获取。'
		}
	},
	ecosystem: {
		eyebrow: '开源',
		title: 'WrightKit \u200b由哪些部分组成。',
		lead: 'Wright 是面向开发者的核心集成工具。其底层的各个语言引擎均为独立项目，拥有各自的测试、版本发布与开源许可，亦可单独使用。',
		principles: [
			{
				title: '坦诚说明局限',
				body: 'Wright 会说明每条结论从何而来，并如实标出无法确证的部分。它不轻许代码在真实服务器上的运行表现。'
			},
			{
				title: '只谈技术，不评玩法',
				body: 'WrightKit 只记录经过验证的地图工坊技术事实（如元素目录与资源上限），不评判游戏平衡性或玩法设计。'
			},
			{
				title: '小而可靠的核心',
				body: '内置规则力求极低误报，更宽泛的检查项放于可选规则集中。'
			}
		],
		repos: {
			wright: '命令行工具与语言服务器：提供诊断、lint、分析，以及编辑器与 CI 集成。',
			'workshop-rs': '地图工坊核心：元素目录、解析、校验、本地化和规范代码输出。',
			'opy-rs': 'OverPy 语言实现，包含语义分析以及向地图工坊代码的编译。',
			'deltin-rs': 'DeltinScript / OSTW 语言实现（开发中）。',
			'language-provider-protocol': '连接 Wright 与各语言实现的版本化协议。',
			skills: '供 AI 编程助手使用的 wright Agent Skill。',
			'homebrew-tap': 'Wright 的 Homebrew 安装配方。'
		},
		nonGoals: {
			title: '明确不做的方向',
			items: [
				'通用编译器框架',
				'完整的 IDE',
				'项目托管平台',
				'通用 AI Agent 框架',
				'游戏运行模拟器',
				'纯转译器合集'
			]
		}
	},
	footer: {
		note: '守望先锋地图工坊开发工具。'
	}
};

export default zhCN;
