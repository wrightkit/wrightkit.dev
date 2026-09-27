<script lang="ts">
	import { tick } from 'svelte';
	import { scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { prefersReducedMotion } from 'svelte/motion';
	import { localeInfo, localePath, locales } from '$lib/locales';
	import { currentLocale, currentMessages } from '$lib/content';

	let {
		variant = 'menu',
		hash = '',
		onselect
	}: {
		/** `menu`: compact header trigger with a popover. `list`: inline rows for the mobile sheet. */
		variant?: 'menu' | 'list';
		/** Section to land on in the other locale, so switching keeps the reader's place. */
		hash?: string;
		onselect?: () => void;
	} = $props();

	const uid = $props.id();
	const t = $derived(currentMessages());
	const locale = $derived(currentLocale());

	let open = $state(false);
	let root: HTMLElement | undefined = $state();
	let trigger: HTMLButtonElement | undefined = $state();
	let links: HTMLAnchorElement[] = $state([]);

	// Anchored to the trigger: grows from its corner; reduced motion keeps only the fade.
	const popMotion = $derived({
		start: prefersReducedMotion.current ? 1 : 0.96,
		duration: prefersReducedMotion.current ? 120 : 160,
		easing: cubicOut
	});

	async function toggle() {
		open = !open;
		if (!open) return;
		await tick();
		links[locales.indexOf(locale)]?.focus();
	}

	function close(restoreFocus = false) {
		if (!open) return;
		open = false;
		if (restoreFocus) trigger?.focus();
	}

	function onMenuKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault();
			close(true);
			return;
		}
		const index = links.findIndex((el) => el === document.activeElement);
		const last = links.length - 1;
		const next =
			e.key === 'ArrowDown' ? (index >= last ? 0 : index + 1)
			: e.key === 'ArrowUp' ? (index <= 0 ? last : index - 1)
			: e.key === 'Home' ? 0
			: e.key === 'End' ? last
			: null;
		if (next === null) return;
		e.preventDefault();
		links[next]?.focus();
	}

	function onPointerDown(e: PointerEvent) {
		if (open && root && !root.contains(e.target as Node)) close();
	}

	function onFocusOut(e: FocusEvent) {
		if (open && root && !root.contains(e.relatedTarget as Node | null)) close();
	}

	function onChoose() {
		close();
		onselect?.();
	}
</script>

{#snippet check()}
	<svg class="h-4 w-4 shrink-0 text-accent-400" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		<polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
	</svg>
{/snippet}

<svelte:window onpointerdown={onPointerDown} />

{#if variant === 'menu'}
	<div class="relative" bind:this={root} onfocusout={onFocusOut}>
		<button
			bind:this={trigger}
			type="button"
			class="inline-flex h-8 touch-manipulation items-center gap-1.5 rounded-full px-2.5 text-sm font-medium transition-[background-color,color,transform] duration-150 active:scale-[0.96] {open
				? 'bg-ink-800/70 text-ink-50'
				: 'text-ink-400 hover:text-ink-50'}"
			aria-expanded={open}
			aria-controls="{uid}-menu"
			aria-label={t.ui.currentLanguage(localeInfo[locale].name)}
			title={t.ui.language}
			onclick={toggle}
		>
			<svg class="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				<circle cx="8" cy="8" r="6.25" />
				<path d="M1.75 8h12.5M8 1.75c1.7 1.75 2.55 3.83 2.55 6.25S9.7 12.5 8 14.25M8 1.75C6.3 3.5 5.45 5.58 5.45 8S6.3 12.5 8 14.25" />
			</svg>
			<span>{localeInfo[locale].short}</span>
			<svg
				data-motion="move"
				class="h-3 w-3 shrink-0 opacity-70 transition-transform duration-200 ease-(--ease-settle) {open ? 'rotate-180' : ''}"
				viewBox="0 0 12 12"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<path d="M3 4.75 6 7.75l3-3" />
			</svg>
		</button>

		{#if open}
			<div
				id="{uid}-menu"
				class="popover absolute right-0 top-full z-50 mt-2 min-w-44 origin-top-right p-1"
				transition:scale={popMotion}
			>
				<ul role="list" aria-label={t.ui.language}>
					{#each locales as option, i (option)}
						{@const selected = option === locale}
						<li>
							<a
								bind:this={links[i]}
								href={localePath(option, hash)}
								hreflang={localeInfo[option].tag}
								lang={localeInfo[option].tag}
								aria-current={selected ? 'true' : undefined}
								class="flex min-h-10 items-center justify-between gap-6 rounded-control px-3 text-sm transition-colors duration-150 focus-visible:outline-offset-[-2px] {selected
									? 'font-medium text-ink-50'
									: 'text-ink-300 hover:bg-ink-800/60 hover:text-ink-50'}"
								onclick={onChoose}
								onkeydown={onMenuKeydown}
							>
								<span>{localeInfo[option].name}</span>
								{#if selected}{@render check()}{/if}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
{:else}
	<ul
		role="list"
		aria-label={t.ui.language}
		class="divide-y divide-ink-800/70 overflow-hidden rounded-control bg-ink-950/70 ring-1 ring-inset ring-ink-800/70"
	>
		{#each locales as option (option)}
			{@const selected = option === locale}
			<li>
				<a
					href={localePath(option, hash)}
					hreflang={localeInfo[option].tag}
					lang={localeInfo[option].tag}
					aria-current={selected ? 'true' : undefined}
					class="flex min-h-11 items-center justify-between gap-4 px-3.5 text-[0.9375rem] transition-colors duration-150 focus-visible:outline-offset-[-2px] active:bg-ink-800/60 {selected
						? 'font-medium text-ink-50'
						: 'text-ink-300'}"
					onclick={onChoose}
				>
					<span>{localeInfo[option].name}</span>
					{#if selected}{@render check()}{/if}
				</a>
			</li>
		{/each}
	</ul>
{/if}
