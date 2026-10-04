<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { prefersReducedMotion } from 'svelte/motion';
	import { MediaQuery } from 'svelte/reactivity';
	import Wordmark from './Wordmark.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import LanguageSwitcher from './LanguageSwitcher.svelte';
	import { navSections, pageSections, site } from '$lib/site';
	import { localePath } from '$lib/locales';
	import { currentLocale, currentMessages } from '$lib/content';
	import { page } from '$app/state';

	const t = $derived(currentMessages());
	const locale = $derived(currentLocale());
	const route = $derived(page.url.pathname.endsWith('/results') ? '/results' : '');
	const resultsHref = $derived(localePath(locale, '', '/results'));
	const nav = $derived([
		...navSections.map((id) => ({ label: t.nav[id], href: `#${id}`, to: localePath(locale, `#${id}`), external: false, wideOnly: false })),
		{ label: t.nav.results, href: resultsHref, to: resultsHref, external: false, wideOnly: false },
		// Docs stays in the mobile sheet but joins the desktop bar only when it fits.
		{ label: t.nav.docs, href: site.docs, to: site.docs, external: true, wideOnly: true },
		{ label: 'GitHub', href: site.org, to: site.org, external: true, wideOnly: false }
	]);

	let isOpen = $state(false);
	let current = $state('');
	let scrollY = $state(0);
	const desktop = new MediaQuery('min-width: 768px');

	const isCurrent = (href: string) => (route ? href === resultsHref : current === href);

	function closeMenu() {
		isOpen = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && isOpen) closeMenu();
	}

	$effect(() => {
		if (desktop.current) isOpen = false;
	});

	$effect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	});

	// Wayfinding: the section crossing the middle of the viewport. It highlights the
	// nav link and tells the language switcher where to land in the other locale.
	$effect(() => {
		const tracked: string[] = [...pageSections];
		const targets = tracked
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);
		// Track every section inside the band, so a section that passes through
		// it (e.g. while a language switch re-renders the page) does not stick.
		const inBand = new Set<string>();
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) inBand.add(entry.target.id);
					else inBand.delete(entry.target.id);
				}
				const id = tracked.find((section) => inBand.has(section));
				current = id ? `#${id}` : '';
			},
			{ rootMargin: '-45% 0px -50% 0px' }
		);
		targets.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});

	// Enter and exit along the same path; reduced motion becomes a cross-fade.
	const sheetMotion = $derived({
		y: prefersReducedMotion.current ? 0 : -12,
		duration: prefersReducedMotion.current ? 160 : 260,
		easing: cubicOut
	});
</script>

<svelte:window onkeydown={handleKeydown} bind:scrollY />

<header
	class="chrome sticky top-0 z-50 pt-[env(safe-area-inset-top)]"
	data-scrolled={scrollY > 8 || isOpen ? '' : undefined}
>
	<div class="container-site flex h-14 items-center justify-between gap-4">
		<Wordmark />

		<div class="hidden md:flex md:items-center md:gap-2 lg:gap-3">
		<nav aria-label={t.ui.primaryNav} class="flex items-center gap-0.5">
			{#each nav as item (item.href)}
				<a
					href={item.to}
					aria-current={isCurrent(item.href) ? (item.href === resultsHref ? 'page' : 'location') : undefined}
					class="{item.wideOnly ? 'hidden lg:inline-flex' : 'inline-flex'} min-h-9 items-center whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors duration-150 active:text-ink-50 lg:px-3.5 {isCurrent(
						item.href
					)
						? 'bg-ink-800/70 text-ink-50'
						: 'text-ink-400 hover:text-ink-50'}"
					{...item.external ? { target: '_blank', rel: 'noreferrer' } : {}}
				>
					{item.label}
				</a>
			{/each}
		</nav>
		<div class="flex items-center gap-1">
			<LanguageSwitcher hash={current} {route} />
			<ThemeSwitcher />
		</div>
		</div>

		<button
			type="button"
			class="relative -mr-2 flex h-11 w-11 touch-manipulation items-center justify-center rounded-full text-ink-200 transition-transform duration-100 active:scale-[0.92] md:hidden"
			aria-expanded={isOpen}
			aria-controls="mobile-nav"
			aria-label={isOpen ? t.ui.closeMenu : t.ui.openMenu}
			onclick={() => (isOpen = !isOpen)}
		>
			<span class="relative block h-3 w-[1.125rem]" aria-hidden="true">
				<span
					data-motion="move"
					class="absolute inset-x-0 top-0 h-[1.5px] rounded-full bg-current transition-transform duration-300 ease-(--ease-settle) {isOpen
						? 'translate-y-[5.25px] rotate-45'
						: ''}"
				></span>
				<span
					data-motion="move"
					class="absolute inset-x-0 bottom-0 h-[1.5px] rounded-full bg-current transition-transform duration-300 ease-(--ease-settle) {isOpen
						? '-translate-y-[5.25px] -rotate-45'
						: ''}"
				></span>
			</span>
		</button>
	</div>

	{#if isOpen}
		<!-- The menu is a modal task: dim and push the page back. -->
		<button
			type="button"
			class="fixed inset-x-0 bottom-0 top-[calc(3.5rem+env(safe-area-inset-top))] z-30 bg-scrim md:hidden"
			aria-label={t.ui.closeMenu}
			tabindex="-1"
			onclick={closeMenu}
			transition:fade={{ duration: 200 }}
		></button>
		<div
			id="mobile-nav"
			class="fixed inset-x-0 top-[calc(3.5rem+env(safe-area-inset-top))] z-40 max-h-[calc(100dvh-3.5rem-env(safe-area-inset-top))] overflow-y-auto rounded-b-card bg-ink-900/95 shadow-2xl shadow-black/30 backdrop-blur-2xl md:hidden"
			role="dialog"
			aria-modal="true"
			aria-label={t.ui.navigation}
			transition:fly={sheetMotion}
		>
			<div class="container-site pb-[max(1.5rem,calc(1rem+env(safe-area-inset-bottom)))] pt-1">
				<nav class="flex flex-col" aria-label={t.ui.primaryNav}>
					{#each nav as item (item.href)}
						<a
							href={item.to}
							aria-current={isCurrent(item.href) ? (item.href === resultsHref ? 'page' : 'location') : undefined}
							class="flex min-h-12 items-center justify-between border-b border-ink-800/70 text-[1.0625rem] font-medium transition-colors active:text-accent-400 {isCurrent(
								item.href
							)
								? 'text-ink-50'
								: 'text-ink-200'}"
							{...item.external ? { target: '_blank', rel: 'noreferrer' } : {}}
							onclick={closeMenu}
						>
							<span>{item.label}</span>
							<svg
								class="h-4 w-4 text-ink-600"
								viewBox="0 0 16 16"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								{#if item.external}
									<path d="M5.5 10.5l5-5M6.5 5.5h4v4" />
								{:else}
									<path d="M6 3.5l4.5 4.5-4.5 4.5" />
								{/if}
							</svg>
						</a>
					{/each}
				</nav>

				<div class="mt-6">
					<span class="text-sm font-medium text-ink-400">{t.ui.language}</span>
					<div class="mt-2"><LanguageSwitcher variant="list" hash={current} {route} onselect={closeMenu} /></div>
				</div>
				<div class="mt-5 flex items-center justify-between gap-4">
					<span class="text-sm font-medium text-ink-400">{t.ui.appearance}</span>
					<div class="w-60 max-w-[65%]"><ThemeSwitcher labelled /></div>
				</div>
				<a href={localePath(locale, '#install')} class="btn btn-primary mt-6 w-full" onclick={closeMenu}>{t.hero.primaryCta}</a>
			</div>
		</div>
	{/if}
</header>
