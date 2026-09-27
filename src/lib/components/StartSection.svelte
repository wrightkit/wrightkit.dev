<script lang="ts">
	import { reveal } from '$lib/reveal';
	import Section from './Section.svelte';
	import CopyButton from './CopyButton.svelte';
	import { startSteps } from '$lib/site';
	import { currentMessages } from '$lib/content';

	const t = $derived(currentMessages());
</script>

<Section id="start" title={t.start.title} lead={t.start.lead}>
	<ol class="mt-10 grid gap-3 sm:mt-14 sm:gap-4 md:grid-cols-3">
		{#each startSteps as step, i (step.id)}
			<li class="surface flex flex-col p-5 sm:p-6" data-reveal style="--reveal-delay: {i * 70}ms" use:reveal>
				<span class="font-mono text-xs text-ink-600">{i + 1}</span>
				<h3 class="mt-2 text-[1.0625rem] font-semibold tracking-[-0.012em] text-ink-50">
					{t.start.steps[step.id].title}
				</h3>
				<p class="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-400">{t.start.steps[step.id].body}</p>
				{#if step.command}
					<div class="mt-5 flex min-w-0 items-center gap-2 rounded-control bg-ink-950/80 py-1 pl-3 pr-1">
						<code class="min-w-0 flex-1 truncate font-mono text-xs text-ink-200">{step.command}</code>
						<CopyButton text={step.command} label={t.ui.copy} />
					</div>
				{/if}
			</li>
		{/each}
	</ol>
</Section>
