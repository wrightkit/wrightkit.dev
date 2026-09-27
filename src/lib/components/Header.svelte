<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { prefersReducedMotion } from 'svelte/motion';
	import { MediaQuery } from 'svelte/reactivity';
	import Wordmark from './Wordmark.svelte';
	import { nav } from '$lib/site';

	let isOpen = $state(false);
	let current = $state('');
	const desktop = new MediaQuery('min-width: 768px');

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

	// Wayfinding: highlight the section that crosses the middle of the viewport.
	$effect(() => {
		const targets = nav
			.filter((item) => item.href.startsWith('#'))
			.map((item) => document.querySelector<HTMLElement>(item.href))
			.filter((el): el is HTMLElement => el !== null);
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) current = `#${entry.target.id}`;
				}
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

<svelte:window onkeydown={handleKeydown} />

<header class="chrome sticky top-0 z-50 pt-[env(safe-area-inset-top)]">
	<div class="container-site flex h-14 items-center justify-between gap-4">
		<Wordmark />

		<nav aria-label="Primary" class="hidden md:flex md:items-center md:gap-0.5">
			{#each nav as item (item.href)}
				<a
					href={item.href}
					aria-current={current === item.href ? 'location' : undefined}
					class="inline-flex min-h-9 items-center rounded-full px-3.5 text-sm font-medium transition-colors duration-150 active:text-ink-50 {current ===
					item.href
						? 'bg-ink-800/70 text-ink-50'
						: 'text-ink-400 hover:text-ink-50'}"
					{...item.external ? { target: '_blank', rel: 'noreferrer' } : {}}
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<button
			type="button"
			class="relative -mr-2 flex h-11 w-11 touch-manipulation items-center justify-center rounded-full text-ink-200 transition-transform duration-100 active:scale-[0.92] md:hidden"
			aria-expanded={isOpen}
			aria-controls="mobile-nav"
			aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
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
			class="fixed inset-x-0 bottom-0 top-[calc(3.5rem+env(safe-area-inset-top))] z-30 bg-ink-950/60 md:hidden"
			aria-label="Close navigation menu"
			tabindex="-1"
			onclick={closeMenu}
			transition:fade={{ duration: 200 }}
		></button>
		<div
			id="mobile-nav"
			class="fixed inset-x-0 top-[calc(3.5rem+env(safe-area-inset-top))] z-40 max-h-[calc(100dvh-3.5rem-env(safe-area-inset-top))] overflow-y-auto rounded-b-card bg-ink-900/95 shadow-2xl shadow-black/60 backdrop-blur-2xl md:hidden"
			role="dialog"
			aria-modal="true"
			aria-label="Navigation"
			transition:fly={sheetMotion}
		>
			<div class="container-site pb-[max(1.5rem,calc(1rem+env(safe-area-inset-bottom)))] pt-1">
				<nav class="flex flex-col" aria-label="Mobile primary">
					{#each nav as item (item.href)}
						<a
							href={item.href}
							aria-current={current === item.href ? 'location' : undefined}
							class="flex min-h-12 items-center justify-between border-b border-ink-800/70 text-[1.0625rem] font-medium transition-colors active:text-accent-400 {current ===
							item.href
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

				<a href="#install" class="btn btn-primary mt-5 w-full" onclick={closeMenu}>Install Wright</a>
			</div>
		</div>
	{/if}
</header>
