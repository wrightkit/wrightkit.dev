<script lang="ts">
	import { terminal, hero } from '$lib/site';
</script>

<figure class="border border-ink-800 bg-ink-900">
	<figcaption class="border-b border-ink-800 px-4 py-2 text-xs text-ink-400">
		wright-tool
	</figcaption>
	<div class="terminal px-4 py-4">
		<pre aria-label="Example session with the wright-tool semantic service"><code>{#each
				terminal as line
			}<span class="block"
					>{#if line.prompt}<span class="select-none font-mono text-xs text-ink-500"
							>{line.prompt} </span
						>{/if}<span class="font-mono text-xs leading-relaxed text-ink-200">{line.text}</span
					></span
				>{/each}</code
			></pre>
		<p class="mt-4 border-t border-ink-800 pt-3 text-xs leading-relaxed text-ink-500">
			{hero.terminalCaption}
		</p>
	</div>
</figure>
