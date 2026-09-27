import { defaultLocale } from '$lib/locales';
import type { LayoutLoad } from './$types';

export const prerender = true;

export const load: LayoutLoad = ({ params }) => ({
	locale: params.lang ?? defaultLocale
});
