<script lang="ts">
	let {
		text,
		label = 'Copy',
		copiedLabel = 'Copied',
		variant = 'ghost'
	}: {
		text: string;
		label?: string;
		copiedLabel?: string;
		variant?: 'ghost' | 'primary' | 'inline';
	} = $props();

	let copied = $state(false);
	let timeoutId: ReturnType<typeof setTimeout> | undefined;

	async function handleCopy() {
		try {
			await navigator.clipboard.writeText(text);
			copied = true;
			if (timeoutId) clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				copied = false;
			}, 2000);
		} catch {
			// Fallback: execCommand for older environments
			try {
				const textarea = document.createElement('textarea');
				textarea.value = text;
				textarea.style.position = 'fixed';
				textarea.style.opacity = '0';
				document.body.appendChild(textarea);
				textarea.select();
				document.execCommand('copy');
				document.body.removeChild(textarea);
				copied = true;
				if (timeoutId) clearTimeout(timeoutId);
				timeoutId = setTimeout(() => {
					copied = false;
				}, 2000);
			} catch {
				// Silently fail if clipboard denied
			}
		}
	}
</script>

<button
	type="button"
	class="inline-flex items-center justify-center gap-1.5 rounded-sm font-sans text-xs font-medium tracking-tight transition-all duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 {variant ===
	'primary'
		? 'bg-accent-500 px-3 py-1.5 text-ink-950 hover:bg-accent-400'
		: variant === 'inline'
			? 'border border-ink-700 bg-ink-900 px-2 py-1 text-ink-300 hover:border-ink-500 hover:text-ink-50'
			: 'border border-ink-700 bg-ink-900/80 px-2.5 py-1 text-ink-200 hover:border-ink-500 hover:bg-ink-800 hover:text-ink-50'}"
	onclick={handleCopy}
	aria-label={copied ? copiedLabel : label}
	title={copied ? copiedLabel : label}
>
	{#if copied}
		<svg
			class="h-3.5 w-3.5 text-accent-400"
			viewBox="0 0 16 16"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
		</svg>
		<span class="text-accent-400">{copiedLabel}</span>
	{:else}
		<svg
			class="h-3.5 w-3.5 text-ink-400"
			viewBox="0 0 16 16"
			fill="none"
			stroke="currentColor"
			stroke-width="1.6"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
			<path d="M3.5 10.5V3.5a1 1 0 0 1 1-1h7" />
		</svg>
		<span>{label}</span>
	{/if}
</button>
