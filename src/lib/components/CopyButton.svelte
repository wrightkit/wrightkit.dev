<script lang="ts">
	let {
		text,
		label = 'Copy',
		showLabel = false
	}: {
		text: string;
		/** Accessible name; shown next to the icon when showLabel is true. */
		label?: string;
		showLabel?: boolean;
	} = $props();

	let copied = $state(false);
	let timeoutId: ReturnType<typeof setTimeout> | undefined;

	function writeFallback(value: string) {
		const textarea = document.createElement('textarea');
		textarea.value = value;
		textarea.style.position = 'fixed';
		textarea.style.opacity = '0';
		document.body.appendChild(textarea);
		textarea.select();
		const ok = document.execCommand('copy');
		document.body.removeChild(textarea);
		if (!ok) throw new Error('copy failed');
	}

	async function handleCopy() {
		try {
			if (navigator.clipboard?.writeText) {
				await navigator.clipboard.writeText(text);
			} else {
				writeFallback(text);
			}
		} catch {
			return;
		}
		copied = true;
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => (copied = false), 1600);
	}

	$effect(() => () => clearTimeout(timeoutId));
</script>

<button
	type="button"
	class="relative inline-flex h-8 shrink-0 touch-manipulation select-none items-center justify-center gap-1.5 rounded-full text-xs font-medium transition-[background-color,color,transform] duration-150 active:scale-[0.92] active:duration-75 after:absolute after:-inset-1.5 after:content-[''] {showLabel
		? 'px-3'
		: 'w-8'} {copied
		? 'bg-accent-500/15 text-accent-400'
		: 'bg-ink-800/80 text-ink-300 hover:bg-ink-700 hover:text-ink-50'}"
	onclick={handleCopy}
	aria-label={showLabel ? undefined : label}
	title={label}
>
	{#if copied}
		<svg class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
		</svg>
	{:else}
		<svg class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<rect x="5.5" y="5.5" width="8" height="8" rx="2" />
			<path d="M3.5 10.5V4.5a1 1 0 0 1 1-1h6" />
		</svg>
	{/if}
	{#if showLabel}<span>{copied ? 'Copied' : label}</span>{/if}
	<span class="sr-only" aria-live="polite">{copied ? 'Copied to clipboard' : ''}</span>
</button>
