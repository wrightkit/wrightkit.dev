import * as en from './site';
import * as zhCN from './site.zh-CN';

export const alternateLocales = [
	{ hreflang: 'en', href: 'https://wrightkit.dev' },
	{ hreflang: 'zh-CN', href: 'https://wrightkit.dev/zh-CN' },
	{ hreflang: 'x-default', href: 'https://wrightkit.dev' }
] as const;

const enUi = {
	skipToContent: 'Skip to content',
	primaryNavigation: 'Primary',
	mobilePrimaryNavigation: 'Mobile primary',
	navigation: 'Navigation',
	openNavigationMenu: 'Open navigation menu',
	closeNavigationMenu: 'Close navigation menu',
	appearance: 'Appearance',
	language: 'Language',
	installWright: 'Install Wright',
	copy: 'Copy',
	copyInstallCommand: 'Copy install command',
	copyCommand: 'Copy command',
	copiedToClipboard: 'Copied to clipboard',
	terminalExample: 'Example wright session',
	comparedStructure: 'Compared structure',
	platform: 'Platform',
	themeSystem: 'System',
	themeLight: 'Light',
	themeDark: 'Dark'
} as const;

const zhCNUi = {
	skipToContent: '跳到主要内容',
	primaryNavigation: '主导航',
	mobilePrimaryNavigation: '移动端主导航',
	navigation: '导航',
	openNavigationMenu: '打开导航菜单',
	closeNavigationMenu: '关闭导航菜单',
	appearance: '外观',
	language: '语言',
	installWright: '安装 Wright',
	copy: '复制',
	copyInstallCommand: '复制安装命令',
	copyCommand: '复制命令',
	copiedToClipboard: '已复制到剪贴板',
	terminalExample: 'Wright 命令示例',
	comparedStructure: '比较的结构',
	platform: '平台',
	themeSystem: '跟随系统',
	themeLight: '浅色',
	themeDark: '深色'
} as const;

export const contentByLocale = {
	en: {
		...en,
		language: {
			htmlLang: 'en',
			canonical: 'https://wrightkit.dev',
			ogLocale: 'en_US',
			switchHref: '/zh-CN',
			switchHreflang: 'zh-CN',
			switchLabel: '中文',
			switchAriaLabel: 'Switch to Chinese'
		},
		ui: enUi
	},
	'zh-CN': {
		...zhCN,
		language: {
			htmlLang: 'zh-CN',
			canonical: 'https://wrightkit.dev/zh-CN',
			ogLocale: 'zh_CN',
			switchHref: '/',
			switchHreflang: 'en',
			switchLabel: 'English',
			switchAriaLabel: '切换到 English'
		},
		ui: zhCNUi
	}
} as const;

export type Locale = keyof typeof contentByLocale;
export type SiteContent = (typeof contentByLocale)[Locale];

export function localeForPath(pathname: string): Locale {
	return pathname === '/zh-CN' || pathname.startsWith('/zh-CN/') ? 'zh-CN' : 'en';
}

export function contentForPath(pathname: string): SiteContent {
	return contentByLocale[localeForPath(pathname)];
}
