export type ThemePreference = 'system' | 'light' | 'dark';

const STORAGE_KEY = 'wrightkit-theme';
const THEME_COLOR = { light: '#f6f6f4', dark: '#10100e' } as const;

export const theme = $state({ preference: 'system' as ThemePreference });

function isPreference(value: unknown): value is 'light' | 'dark' {
	return value === 'light' || value === 'dark';
}

function apply(preference: ThemePreference) {
	const root = document.documentElement;
	if (preference === 'system') delete root.dataset.theme;
	else root.dataset.theme = preference;

	// System mode keeps the two media-scoped theme-color tags; an explicit choice pins both.
	for (const meta of document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')) {
		const scheme = meta.media.includes('dark') ? 'dark' : 'light';
		meta.content = THEME_COLOR[preference === 'system' ? scheme : preference];
	}
}

/** Sync state with the choice the inline boot script in app.html already applied. */
export function initTheme() {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		theme.preference = isPreference(stored) ? stored : 'system';
	} catch {
		theme.preference = 'system';
	}
}

export function setTheme(preference: ThemePreference) {
	if (preference === theme.preference) return;
	theme.preference = preference;
	try {
		if (preference === 'system') localStorage.removeItem(STORAGE_KEY);
		else localStorage.setItem(STORAGE_KEY, preference);
	} catch {
		// Storage can be unavailable (private mode); the choice still applies for this page.
	}

	// Cross-fade instead of an abrupt brightness jump.
	const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (!reduceMotion && 'startViewTransition' in document) {
		document.startViewTransition(() => apply(preference));
	} else {
		apply(preference);
	}
}
