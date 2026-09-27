<script lang="ts">
	import { reveal } from '$lib/reveal';
	import { terminalLines } from '$lib/site';
	import { currentMessages } from '$lib/content';

	const t = $derived(currentMessages());

	// The terminal stays dark in both appearances, so it uses fixed colors
	// rather than the theme-aware ink tokens.
	const tone = {
		prompt: 'text-[#f7f7f5]',
		error: 'text-[#ff7b72]',
		warning: 'text-[#ff9a4d]',
		info: 'text-[#79c0ff]',
		dim: 'text-[#85857e]',
		blank: ''
	} as const;
</script>

<figure
	class="min-w-0 overflow-hidden rounded-card bg-[#1a1a17] shadow-md ring-1 shadow-black/15 ring-white/[0.06] ring-inset [color-scheme:dark]"
>
	<figcaption class="flex items-center gap-3 px-4 py-3">
		<span class="flex gap-1.5" aria-hidden="true">
			<span class="h-2.5 w-2.5 rounded-full bg-[#4d4d48]"></span>
			<span class="h-2.5 w-2.5 rounded-full bg-[#4d4d48]"></span>
			<span class="h-2.5 w-2.5 rounded-full bg-[#4d4d48]"></span>
		</span>
		<span class="text-xs font-medium text-[#85857e]">{t.terminal.title}</span>
	</figcaption>
	<pre
		class="whitespace-pre-wrap break-words px-4 pb-5 pt-1 font-mono text-[0.75rem] leading-[1.7] sm:px-5 sm:text-[0.8125rem]"
		aria-label={t.terminal.label}><code
			>{#each terminalLines as line, i (i)}<span
					class="block min-h-[1.7em] {tone[line.kind]}"
					data-reveal="fade"
					style="--reveal-delay: {600 + i * 110}ms"
					use:reveal
					>{#if line.kind === 'prompt'}<span class="select-none text-[#66665f]">$ </span
						>{/if}{line.text}</span
				>{/each}</code
		></pre>
</figure>
