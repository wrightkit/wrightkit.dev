import type { Handle } from '@sveltejs/kit';
import { contentForPath } from '$lib/i18n';

export const handle: Handle = ({ event, resolve }) => {
	const lang = contentForPath(event.url.pathname).language.htmlLang;

	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace(
				'<html lang="en" data-locale-placeholder>',
				`<html lang="${lang}">`
			)
	});
};
