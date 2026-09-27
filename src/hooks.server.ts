import type { Handle } from '@sveltejs/kit';
import { localeFromPath, localeInfo } from '$lib/locales';

// Runs while prerendering, so each static page ships with its own `lang`.
export const handle: Handle = ({ event, resolve }) => {
	const lang = localeInfo[localeFromPath(event.url.pathname)].tag;
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
