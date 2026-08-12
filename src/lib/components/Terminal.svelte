<script lang="ts">
	import { terminal, hero } from '$lib/site';
</script>

<div class="card">
	<div class="flex items-center justify-between gap-4 border-b border-ink-800 px-4 py-2.5">
		<span class="font-mono text-xs text-ink-400">wright-tool · semantic service</span>
		<span class="font-mono text-xs text-accent-500">stdin / stdout</span>
	</div>
	<div class="terminal px-4 py-4 sm:px-5 sm:py-5">
		<pre aria-label="Example session with the wright-tool semantic service"><code>{#each
				terminal as line
			}<span class="block">
					{#if line.prompt}
						<span class="select-none font-mono text-xs text-accent-500">{line.prompt} </span>
					{/if}<span class="font-mono text-xs leading-relaxed text-ink-200">{line.text}</span>
				</span>{/each}</code></pre>
		<p class="mt-4 border-t border-ink-800 pt-3 font-mono text-[11px] leading-relaxed text-ink-500">
			{hero.terminalCaption}
		</p>
	</div>
</div>
