<script lang="ts">
	import { onMount } from 'svelte';
	import { theme, initTheme, setTheme, type ThemePreference } from '$lib/theme.svelte';

	import { currentMessages } from '$lib/content';

	let { labelled = false }: { labelled?: boolean } = $props();

	const t = $derived(currentMessages());
	const options: ThemePreference[] = ['system', 'light', 'dark'];
	let buttons: HTMLButtonElement[] = $state([]);

	function onKeydown(e: KeyboardEvent, index: number) {
		const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
		if (!step) return;
		e.preventDefault();
		const next = (index + step + options.length) % options.length;
		setTheme(options[next]);
		buttons[next]?.focus();
	}

	onMount(initTheme);
</script>

<div
	role="radiogroup"
	aria-label={t.ui.appearance}
	class="inline-flex gap-0.5 rounded-full bg-ink-900 p-0.5 ring-1 ring-inset ring-ink-800/60 {labelled
		? 'w-full'
		: ''}"
>
	{#each options as option, i (option)}
		{@const checked = theme.preference === option}
		{@const label = t.ui.theme[option]}
		<button
			bind:this={buttons[i]}
			type="button"
			role="radio"
			aria-checked={checked}
			aria-label={labelled ? undefined : label}
			title={label}
			tabindex={checked ? 0 : -1}
			class="flex touch-manipulation items-center justify-center gap-1.5 rounded-full text-sm font-medium transition-[background-color,color,transform] duration-150 active:scale-[0.94] {labelled
				? 'h-9 flex-1'
				: 'h-7 w-7'} {checked
				? 'bg-raised text-ink-50 shadow-sm shadow-black/15'
				: 'text-ink-500 hover:text-ink-100'}"
			onclick={() => setTheme(option)}
			onkeydown={(e) => onKeydown(e, i)}
		>
			<svg class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				{#if option === 'system'}
					<rect x="2" y="3" width="12" height="8.5" rx="1.5" />
					<path d="M6 14h4M8 11.5V14" />
				{:else if option === 'light'}
					<circle cx="8" cy="8" r="2.75" />
					<path d="M8 1.75v1.5M8 12.75v1.5M1.75 8h1.5M12.75 8h1.5M3.6 3.6l1.05 1.05M11.35 11.35l1.05 1.05M3.6 12.4l1.05-1.05M11.35 4.65l1.05-1.05" />
				{:else}
					<path d="M13.25 9.6A5.5 5.5 0 0 1 6.4 2.75a5.5 5.5 0 1 0 6.85 6.85Z" />
				{/if}
			</svg>
			{#if labelled}<span>{label}</span>{/if}
		</button>
	{/each}
</div>
