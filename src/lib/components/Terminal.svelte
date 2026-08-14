<script lang="ts">
	import { terminal, hero } from '$lib/site';
</script>

<figure class="border border-ink-800 bg-ink-900/90">
	<figcaption class="flex items-center justify-between border-b border-ink-800 bg-ink-900 px-4 py-2">
		<span class="font-mono text-xs text-ink-300">wright lint & compile</span>
		<span class="font-mono text-xs text-ink-500">v0.1.0</span>
	</figcaption>
	<div class="terminal p-4 sm:p-5">
		<pre
			aria-label="Example session with wright linter and compiler"><code class="font-mono text-[0.8125rem] leading-relaxed">{#each terminal as line}<span class="block">{#if line.prompt}<span class="select-none text-ink-500">{line.prompt} </span><span class="text-ink-100">{line.text}</span>{:else if line.text.startsWith('warning')}<span class="text-accent-400">{line.text}</span>{:else if line.text.includes('^^^^')}<span class="text-accent-400">{line.text}</span>{:else if line.text.startsWith('✓')}<span class="text-ink-50 font-semibold">{line.text}</span>{:else}<span class="text-ink-300">{line.text}</span>{/if}</span>{/each}</code></pre>
		<p class="mt-4 border-t border-ink-800 pt-3 text-xs leading-relaxed text-ink-500">
			{hero.terminalCaption}
		</p>
	</div>
</figure>
