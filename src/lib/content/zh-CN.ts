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
			'WrightKit 是守望先锋地图工坊的开发工具链。命令行工具 Wright 可以检查、lint 和分析真实的地图工坊与 OverPy 项目，开发者和 AI 编程助手都能直接使用。'
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
		eyebrow: '为地图工坊开发者和 AI 编程助手而做',
		headline: '有理有据的\u200b地图工坊工具。',
		lead: 'Wright 检查你的地图工坊和 OverPy 代码，找出错误和服务器负载隐患。每条结果都精确到行，并注明有多大把握。编辑器、CI 和 AI 编程助手拿到的是同一份结果。',
		primaryCta: '安装 Wright',
		secondaryCta: '在 GitHub 上查看'
	},
	terminal: {
		title: '终端',
		label: 'wright 使用示例'
	},
	tooling: {
		eyebrow: '工具优先',
		title: '为检查\u200b真实项目而做。',
		lead: '检查、lint 和分析用同一种方式理解你的代码，所以每条结果都有固定编号和精确位置。编译只用来打通不同语言，不是重点。',
		items: {
			check: {
				title: '诊断',
				body: '错误和警告都带有固定编号、严重级别和精确的源码位置。'
			},
			lint: {
				title: '可靠的 lint 规则',
				body: '一小组内置规则，专门找出会加重服务器负载的循环、等待和条件写法。每条结果都说明证据有多充分。'
			},
			analyze: {
				title: '分析',
				body: '找出热点、循环与等待，以及多条规则共用的变量。每项结论都标明是确定的还是推测的。'
			},
			inspect: {
				title: '结构查看',
				body: '完整呈现程序的结构和语义，供需要详细信息的工具使用。'
			},
			lsp: {
				title: '编辑器支持',
				body: 'wright-lsp 为任何支持 LSP 的编辑器提供悬停提示、跳转到定义、查找引用、自动补全、重命名和实时诊断。'
			},
			ci: {
				title: 'CI',
				body: '退出码有文档可查，所有结果统一为 JSON 格式，在 GitHub Actions 中自动标注问题。'
			}
		}
	},
	agents: {
		eyebrow: '开发者与 AI 助手',
		title: '你和 AI 编程助手，用同一套工具。',
		lead: 'AI 助手拿到的结果和你看到的一样，而且是格式稳定的 JSON，不用解析终端输出，也不用自己写解析器。WrightKit 为 AI 助手提供地图工坊工具，但它不是 Agent 框架。',
		developers: {
			title: '给开发者',
			points: [
				'清晰的终端输出，直接指向出问题的那一行',
				'通过 wright-lsp 接入编辑器',
				'按项目配置 lint：可以关闭规则或调整严重级别',
				'在 GitHub Actions 中运行时，直接在 Pull Request 上标注问题'
			]
		},
		codingAgents: {
			title: '给 AI 编程助手',
			points: [
				'所有命令都输出同一种带版本号的 JSON',
				'诊断编号、规则 ID 和退出码固定不变，可以据此判断下一步',
				'批量修改整体校验，拒绝相互重叠或依赖先后顺序的修改',
				'wright Agent Skill，发布在 wrightkit/skills'
			]
		},
		loop: {
			title: '接下来的方向',
			lead: '目标是：你只需描述需求，AI 助手借助 WrightKit 完成下面每一步，你就能专注于设计，而不是地图工坊的语法细节。其中一部分现在已经可用，带版本的 Agent 接口约定仍在开发中。',
			steps: [
				{ title: '查看', body: '读取项目、规则和依赖关系。' },
				{ title: '修改', body: '精准修改源码，改动先经过校验。' },
				{ title: '检查', body: '重新运行诊断和 lint。' },
				{ title: '评估', body: '估算开销，标出服务器负载风险。' },
				{ title: '报告', body: '说明哪些行为不实际运行就无法确认。' }
			]
		}
	},
	languages: {
		eyebrow: '语言支持',
		title: '以地图工坊为核心，\u200b连接 OverPy 与 OSTW。',
		lead: '每种语言都有独立实现，语言之间的转换统一经过地图工坊，而不是各自搭桥。支持范围跟着真实项目扩展，而不是照着功能清单堆。',
		items: {
			workshop: {
				name: '地图工坊',
				status: '已支持',
				body: '可以直接编写的语言，而不只是编译产物。支持解析、校验、分析、规范格式输出，以及英文 (en-US) 与简体中文 (zh-CN) 代码互转。'
			},
			overpy: {
				name: 'OverPy',
				status: '部分支持',
				body: '用 Wright 检查、lint 和分析现有的 OverPy 项目。编译到地图工坊覆盖已支持的语法，其余部分会给出明确的诊断。'
			},
			ostw: {
				name: 'OSTW',
				status: '开发中',
				body: 'deltin-rs 已能处理解析、项目和类型分析。高级特性的编译还没完成，Wright 目前也还不支持 OSTW。'
			}
		},
		compatibility: {
			title: '“兼容”是什么意思',
			lead: '对 OverPy 和 OSTW 来说，原版编译器就是标准。Wright 和原版编译器编译同一份源码，再把两边生成的地图工坊代码按结构逐项比对。',
			criteriaLabel: '比对内容',
			criteria: [
				'规则顺序',
				'用到了哪些动作和值',
				'控制流',
				'条件结构',
				'值的构造方式',
				'变量名与索引',
				'元素数量'
			],
			notes: [
				'格式、空白和注释不算在内，也从不以文本差异作为衡量标准。',
				'任何与原版输出不同的地方，即使是为了绕开原版疑似的 bug，也必须经过批准并记录为例外。',
				'新英雄、新地图、新动作和新设置会直接加入 workshop-rs，不必等原版编译器更新。'
			]
		}
	},
	install: {
		eyebrow: '安装',
		title: '获取 Wright。',
		lead: '一次安装即可得到 wright 和 wright-lsp。各语言引擎也在各自的仓库里发布独立的库。',
		platformLabel: '平台',
		targets: {
			macos: {
				label: 'macOS',
				badge: 'Apple 芯片和 Intel',
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
				note: '把 WRIGHT_VERSION 设为 GitHub Releases 中的某个 tag，每次运行都会用同一个版本。'
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
			before: '各平台的发布包和校验和都可以在 ',
			link: 'GitHub Releases 页面',
			after: '下载。'
		}
	},
	ecosystem: {
		eyebrow: '开源',
		title: 'WrightKit \u200b由哪些部分组成。',
		lead: 'Wright 是你要安装的工具。它底下的各个语言引擎都是独立项目，也可以单独使用，各自有测试、版本发布和许可证。',
		principles: [
			{
				title: '坦诚说明局限',
				body: 'Wright 会说明每条结论从何而来，并标出它无法确认的部分。它不承诺代码在实际服务器上的运行表现。'
			},
			{
				title: '只谈技术，不评玩法',
				body: 'WrightKit 只记录经过验证的地图工坊事实，比如元素目录和资源上限，不评判平衡性或玩法设计。'
			},
			{
				title: '小而可靠的核心',
				body: '内置规则力求少误报，更宽泛的检查放在可选规则集中。'
			}
		],
		repos: {
			wright: '命令行工具和语言服务器：诊断、lint、分析，以及编辑器和 CI 集成。',
			'workshop-rs': '地图工坊核心：元素目录、解析、校验、本地化和代码输出。',
			'opy-rs': 'OverPy 实现，包括语义分析和到地图工坊的编译。',
			'deltin-rs': 'DeltinScript / OSTW 实现，开发中。',
			'language-provider-protocol': '连接 Wright 与各语言实现的版本化协议。',
			skills: '供 AI 编程助手使用的 wright Agent Skill。',
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
