import type { ThemePreference } from '$lib/theme.svelte';
import type { InstallTargetId, LanguageId, NavSection, RepoName, ToolingId } from '$lib/site';

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
	nav: Record<NavSection, string>;
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
	tooling: SectionCopy & {
		items: Record<ToolingId, Block>;
	};
	agents: SectionCopy & {
		/** What ships today. */
		capabilities: Tuple<Block, 3>;
		/** Planned features; each card carries the `upcomingBadge` label. */
		upcoming: Tuple<Block, 4>;
		upcomingBadge: string;
	};
	languages: SectionCopy & {
		items: Record<LanguageId, { name: string; status: string; body: string }>;
		compatibility: {
			title: string;
			lead: string;
			criteriaLabel: string;
			criteria: Tuple<string, 7>;
		};
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
	ecosystem: SectionCopy & {
		/** Only the ecosystem section keeps a kicker: it adds "open source", which the title doesn't say. */
		eyebrow: string;
		principles: Tuple<Block, 3>;
		repos: Record<RepoName, string>;
		nonGoals: { title: string; items: Tuple<string, 6> };
	};
	footer: {
		note: string;
	};
}
