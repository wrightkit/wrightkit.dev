import { page } from '$app/state';
import { defaultLocale, isLocale, type Locale } from '$lib/locales';
import type { Messages } from './types';
import en from './en';
import zhCN from './zh-CN';

export type { Messages };

export const messages: Record<Locale, Messages> = {
	en,
	'zh-CN': zhCN
};

/** Locale of the page being rendered; reactive when read inside `$derived`. */
export function currentLocale(): Locale {
	const locale = page.data.locale;
	return isLocale(locale) ? locale : defaultLocale;
}

/** Copy for the page being rendered; reactive when read inside `$derived`. */
export function currentMessages(): Messages {
	return messages[currentLocale()];
}
