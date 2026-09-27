import type { ParamMatcher } from '@sveltejs/kit';
import { defaultLocale, isLocale, type Locale } from '$lib/locales';

// The default locale is served at `/`, so `/en` must not become a duplicate page.
export const match = ((param: string): param is Exclude<Locale, typeof defaultLocale> =>
	isLocale(param) && param !== defaultLocale) satisfies ParamMatcher;
