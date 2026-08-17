<script lang="ts">
	import Wordmark from './Wordmark.svelte';
	import { nav, site } from '$lib/site';

	let isOpen = $state(false);

	function toggleMenu() {
		isOpen = !isOpen;
	}

	function closeMenu() {
		isOpen = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && isOpen) {
			closeMenu();
		}
	}

	$effect(() => {
		if (typeof document !== 'undefined') {
			if (isOpen) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = '';
			}
		}
		return () => {
			if (typeof document !== 'undefined') {
				document.body.style.overflow = '';
			}
		};
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<header class="chrome sticky top-0 z-50 border-b border-ink-800/80 pt-[env(safe-area-inset-top)]">
	<div class="container-site flex h-14 items-center justify-between gap-4">
		<Wordmark />

		<!-- Desktop navigation (Adaptive Regular width) -->
		<nav aria-label="Primary" class="hidden md:flex md:items-center md:gap-1">
			{#each nav as item}
				<a
					href={item.href}
					class="inline-flex min-h-9 items-center rounded-xs px-3 text-sm font-medium text-ink-300 transition-all duration-120 hover:text-ink-50 active:scale-[0.96] active:text-ink-50"
					{...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<!-- Mobile adaptive menu toggle (Apple style 2-line animated button) -->
		<button
			type="button"
			class="relative flex h-11 w-11 touch-manipulation items-center justify-center rounded-xs text-ink-300 transition-all duration-120 hover:text-ink-50 active:scale-[0.92] md:hidden"
			aria-expanded={isOpen}
			aria-controls="mobile-nav"
			aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
			onclick={toggleMenu}
		>
			<span class="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
			<div class="relative h-4 w-5">
				<span
					class="absolute left-0 top-0.5 h-0.5 w-5 rounded-full bg-current transition-all duration-200 ease-out {isOpen
						? 'top-2 rotate-45'
						: ''}"
				></span>
				<span
					class="absolute bottom-0.5 left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-200 ease-out {isOpen
						? 'bottom-1.5 -rotate-45'
						: ''}"
				></span>
			</div>
		</button>
	</div>

	<!-- Mobile adaptive sheet overlay (Apple Frosted Glass) -->
	{#if isOpen}
		<div
			id="mobile-nav"
			class="fixed inset-x-0 bottom-0 top-[calc(3.5rem+env(safe-area-inset-top))] z-40 flex flex-col justify-between border-b border-ink-800 bg-ink-950/95 backdrop-blur-2xl md:hidden"
			role="dialog"
			aria-modal="true"
			aria-label="Mobile navigation"
		>
			<div class="container-site flex min-h-0 flex-1 flex-col overflow-y-auto py-6">
				<nav class="flex flex-col divide-y divide-ink-800/60" aria-label="Mobile Primary">
					{#each nav as item}
						<a
							href={item.href}
							class="flex min-h-12 items-center justify-between py-3.5 font-sans text-base font-medium text-ink-100 transition-all active:scale-[0.98] active:text-accent-400"
							{...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
							onclick={closeMenu}
						>
							<span>{item.label}</span>
							<svg
								class="h-4 w-4 text-ink-500"
								viewBox="0 0 16 16"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<path d="M6 3.5l4.5 4.5-4.5 4.5" />
							</svg>
						</a>
					{/each}
				</nav>

				<div class="mt-8 border-t border-ink-800/80 pt-6">
					<div class="flex flex-col gap-3">
						<a
							href="#install"
							class="btn btn-primary w-full justify-center text-center font-medium"
							onclick={closeMenu}
						>
							Install Wright
						</a>
						<a
							href={site.github}
							target="_blank"
							rel="noreferrer"
							class="btn btn-ghost w-full justify-center text-center font-medium"
							onclick={closeMenu}
						>
							GitHub Repository
						</a>
					</div>
				</div>
			</div>
		</div>
	{/if}
</header>
