<script lang="ts">
	import { terminal } from '$lib/site';

	const tone = {
		prompt: 'text-ink-50',
		error: 'text-[#ff7b72]',
		warning: 'text-accent-400',
		dim: 'text-ink-500',
		blank: ''
	} as const;
</script>

<figure class="surface min-w-0 overflow-hidden shadow-2xl shadow-black/40">
	<figcaption class="flex items-center gap-3 px-4 py-3">
		<span class="flex gap-1.5" aria-hidden="true">
			<span class="h-2.5 w-2.5 rounded-full bg-ink-700"></span>
			<span class="h-2.5 w-2.5 rounded-full bg-ink-700"></span>
			<span class="h-2.5 w-2.5 rounded-full bg-ink-700"></span>
		</span>
		<span class="text-xs font-medium text-ink-500">{terminal.title}</span>
	</figcaption>
	<pre
		class="whitespace-pre-wrap break-words px-4 pb-5 pt-1 font-mono text-[0.75rem] leading-[1.7] sm:px-5 sm:text-[0.8125rem]"
		aria-label="Example wright session"><code
			>{#each terminal.lines as line, i (i)}<span class="block min-h-[1.7em] {tone[line.kind]}"
					>{#if line.kind === 'prompt'}<span class="select-none text-ink-600">$ </span
						>{/if}{line.text}</span
				>{/each}</code
		></pre>
</figure>
