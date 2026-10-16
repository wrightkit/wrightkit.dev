import { defineParams } from '@sveltejs/kit/params';
import { defaultLocale, isLocale, type Locale } from '#lib/locales.ts';

// The default locale is served at `/`, so `/en` must not become a duplicate page.
const matchLocale = (param: string): param is Exclude<Locale, typeof defaultLocale> => isLocale(param) && param !== defaultLocale;

export const params = defineParams({
	locale: (param) => (matchLocale(param) ? param : undefined)
});
