<script lang="ts">
	import CopyButton from './CopyButton.svelte';
	import { features } from '$lib/site';
</script>

<section id="features" class="scroll-mt-16 border-t border-ink-800">
	<div class="container-site py-16 sm:py-20 lg:py-24">
		<div class="max-w-2xl">
			<h2 class="font-sans font-semibold text-title text-ink-50">{features.title}</h2>
			<p class="mt-3 text-[1.0625rem] leading-relaxed text-ink-300">
				{features.lead}
			</p>
		</div>

		<div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each features.items as item (item.id)}
				<div class="flex flex-col justify-between border border-ink-800 bg-ink-900/30 p-5 transition-colors duration-150 hover:border-ink-700">
					<div>
						<h3 class="font-sans text-base font-semibold text-ink-50">{item.title}</h3>
						<p class="mt-2 text-[0.875rem] leading-relaxed text-ink-300">
							{item.body}
						</p>
					</div>

					<div class="mt-5 border-t border-ink-800/80 pt-3">
						<div class="flex items-center justify-between gap-2">
							<code class="truncate font-mono text-[0.75rem] text-ink-400">{item.command}</code>
							<CopyButton text={item.command} label="Copy" variant="inline" />
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
