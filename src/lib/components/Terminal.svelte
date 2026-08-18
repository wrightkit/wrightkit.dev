<script lang="ts">
	import { terminal, hero } from '$lib/site';
</script>

<figure class="rounded-xs border border-ink-800 bg-ink-900/90 overflow-hidden">
	<figcaption class="flex items-center justify-between border-b border-ink-800 bg-ink-900 px-3.5 py-2 sm:px-4 sm:py-2.5">
		<span class="font-mono text-xs font-medium text-ink-300">wright lint & compile</span>
		<span class="font-mono text-xs text-ink-500">v0.1.0</span>
	</figcaption>
	<div class="terminal p-3.5 sm:p-5">
		<pre
			class="overflow-x-auto"
			aria-label="Example session with wright linter and compiler"><code class="font-mono text-[0.75rem] sm:text-[0.8125rem] leading-relaxed">{#each terminal as line}<span class="block">{#if line.prompt}<span class="select-none text-ink-500">{line.prompt} </span><span class="text-ink-100">{line.text}</span>{:else if line.text.startsWith('warning')}<span class="text-accent-400">{line.text}</span>{:else if line.text.includes('^^^^')}<span class="text-accent-400">{line.text}</span>{:else if line.text.startsWith('✓')}<span class="text-ink-50 font-semibold">{line.text}</span>{:else}<span class="text-ink-300">{line.text}</span>{/if}</span>{/each}</code></pre>
		<p class="mt-3.5 border-t border-ink-800/80 pt-2.5 text-xs leading-relaxed text-ink-500 sm:mt-4 sm:pt-3">
			{hero.terminalCaption}
		</p>
	</div>
</figure>
