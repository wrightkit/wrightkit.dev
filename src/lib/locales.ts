/**
 * Supported site locales. English is the default and lives at `/`; every other
 * locale lives under `/<code>`. There is no browser-language redirect: the
 * reader picks a language explicitly.
 */

export const locales = ['en', 'zh-CN'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeInfo: Record<
	Locale,
	{
		/** Endonym shown in the language switcher. */
		name: string;
		/** Compact label for the header trigger. */
		short: string;
		/** BCP 47 tag for `lang` and `hreflang`. */
		tag: string;
		/** Open Graph locale. */
		og: string;
	}
> = {
	en: { name: 'English', short: 'EN', tag: 'en', og: 'en_US' },
	'zh-CN': { name: '简体中文', short: '中文', tag: 'zh-CN', og: 'zh_CN' }
};

export function isLocale(value: unknown): value is Locale {
	return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

/** Path of a locale's page: the homepage, or `route` such as `/results`, optionally with a hash. */
export function localePath(locale: Locale, hash = '', route = ''): string {
	return ((locale === defaultLocale ? '' : `/${locale}`) + route || '/') + hash;
}

export function localeFromPath(pathname: string): Locale {
	const segment = pathname.split('/')[1];
	return isLocale(segment) ? segment : defaultLocale;
}
