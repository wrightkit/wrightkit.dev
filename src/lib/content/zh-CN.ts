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
			'Wright 检查守望先锋地图工坊和 OverPy 代码里的错误和拖累服务器的循环。把游戏里的代码复制出来，结果精确到行。'
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
		start: '上手',
		features: '功能',
		languages: '语言支持',
		install: '安装',
		docs: '文档'
	},
	hero: {
		eyebrow: '守望先锋地图工坊 · OverPy',
		headline: '写地图工坊，\u200b心里有数。',
		lead: '把代码从游戏里复制出来，Wright 帮你找出错误和拖累服务器的循环，精确到行，不用进房间测试。',
		primaryCta: '安装 Wright',
		secondaryCta: '在 GitHub 上查看'
	},
	terminal: {
		title: '终端',
		label: '对从游戏复制的规则运行 wright lint'
	},
	start: {
		title: '复制，保存，检查。',
		steps: {
			copy: {
				title: '从游戏复制',
				body: '像平时分享代码那样，复制规则或整套设置。'
			},
			save: {
				title: '粘贴成文件',
				body: '存成文本文件，比如 rules.txt。中英文客户端的代码都可以。'
			},
			check: {
				title: '运行 Wright',
				body: '每条结果都指向文件里的具体行。改好后粘回游戏。'
			}
		}
	},
	features: {
		title: '能查出什么。',
		examples: {
			typo: {
				title: '写错名字',
				body: '动作或值的名字写错了，粘回游戏前就能发现。'
			},
			noWait: {
				title: '没有等待的 While',
				body: '循环一直不停，容易让服务器过载。'
			},
			minWait: {
				title: '只等 0.016 秒',
				body: '循环会以游戏允许的最快速度运行。'
			},
			losInLoop: {
				title: '循环里做视线检测',
				body: '每一轮都算一次几何检测，开销可能很大。'
			}
		}
	},
	tooling: {
		title: '更多工具。',
		items: {
			analyze: {
				title: '分析',
				body: '找出最复杂的规则，以及被最多规则共用的变量。'
			},
			inspect: {
				title: '结构',
				body: '项目里所有规则、变量和引用。'
			},
			lsp: {
				title: '编辑器',
				body: '在支持语言服务器的编辑器里边写边报错，还能跳转、补全和重命名。VS Code 扩展暂时还没有。'
			},
			ci: {
				title: 'CI',
				body: '在 GitHub Actions 中运行，问题直接标在 PR 上。'
			}
		}
	},
	languages: {
		title: '地图工坊、OverPy 和 OSTW。',
		items: {
			workshop: {
				name: '地图工坊',
				status: '已支持',
				body: '完整支持原生语法，英文和简体中文客户端的代码都能直接检查。'
			},
			overpy: {
				name: 'OverPy',
				status: '部分支持',
				body: '照常写 .opy。Wright 负责检查，并编译成地图工坊代码，结果以原版 OverPy 编译器为准。'
			},
			ostw: {
				name: 'OSTW',
				status: '开发中',
				body: 'deltin-rs 开发中，之后接入 Wright。'
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
		upcomingLabel: '即将推出',
		upcoming: ['从需求到改动', '修改先校验', '项目查询', '开销评估']
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
	footer: {
		note: '守望先锋地图工坊开发工具。',
		openSource: '开源'
	}
};

export default zhCN;
