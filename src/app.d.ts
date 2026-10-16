/// <reference types="@sveltejs/kit" />

import type { Locale } from '#lib/locales.js';

declare global {
	namespace App {
		interface PageData {
			locale?: Locale;
		}
	}
}

export {};
