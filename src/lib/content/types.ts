import type { Track } from '$lib/bench';
import type { ThemePreference } from '$lib/theme.svelte';
import type {
	ExampleId,
	InstallTargetId,
	LanguageId,
	NavSection,
	StartStepId,
	ToolingId
} from '$lib/site';

type Tuple<T, N extends number, R extends T[] = []> = R['length'] extends N
	? readonly [...R]
	: Tuple<T, N, [T, ...R]>;

interface Block {
	title: string;
	body: string;
}

interface SectionCopy {
	title: string;
	lead?: string;
}

/**
 * The complete copy for one locale. Keyed records and fixed-length tuples keep
 * every locale structurally aligned with the shared data in `$lib/site`, so a
 * translation cannot silently drop or add a claim.
 */
export interface Messages {
	meta: {
		title: string;
		description: string;
		/** Alt text for the 1200×630 share image. */
		imageAlt: string;
		/** Terms that already appear on the page. Used by engines that still read meta keywords. */
		keywords: string;
	};
	ui: {
		skipToContent: string;
		home: string;
		primaryNav: string;
		navigation: string;
		openMenu: string;
		closeMenu: string;
		appearance: string;
		theme: Record<ThemePreference, string>;
		language: string;
		/** Accessible name of the language trigger, naming the current language. */
		currentLanguage: (name: string) => string;
		copy: string;
		copyInstall: string;
		copied: string;
	};
	nav: Record<NavSection, string> & { docs: string; results: string };
	hero: {
		eyebrow: string;
		headline: string;
		lead: string;
		primaryCta: string;
		secondaryCta: string;
	};
	terminal: {
		title: string;
		label: string;
	};
	start: SectionCopy & {
		steps: Record<StartStepId, Block>;
	};
	features: SectionCopy & {
		examples: Record<ExampleId, Block>;
	};
	tooling: SectionCopy & {
		items: Record<ToolingId, Block>;
	};
	languages: SectionCopy & {
		items: Record<LanguageId, { name: string; status: string; body: string }>;
	};
	agents: SectionCopy & {
		/** What ships today. */
		capabilities: Tuple<Block, 3>;
		upcomingLabel: string;
		upcoming: Tuple<string, 4>;
	};
	install: SectionCopy & {
		platformLabel: string;
		targets: Record<
			InstallTargetId,
			{ label: string; badge: string; method: string; altMethod: string; note: string }
		>;
		/** Sentence around the Releases link, split so each locale can place the link naturally. */
		releases: { before: string; link: string; after: string };
	};
	results: {
		meta: { title: string; description: string; imageAlt: string };
		eyebrow: string;
		title: string;
		lead: string;
		loading: string;
		empty: { title: string; body: string };
		unsupported: { title: string; body: string };
		columns: { rank: string; agent: string; model: string; effort: string };
		tracks: Record<Track, string>;
		interval: string;
		notRun: string;
		tiedWithTop: string;
		provisional: string;
		noEffort: string;
		howToRead: { title: string; items: readonly string[] };
		ran: { title: string; wright: string; suite: string };
	};
	footer: {
		note: string;
		openSource: string;
	};
}
