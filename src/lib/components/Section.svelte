<script lang="ts">
	import { reveal } from '$lib/reveal';
	import type { Snippet } from 'svelte';

	let {
		id,
		eyebrow,
		title,
		lead,
		children
	}: {
		id: string;
		eyebrow?: string;
		title: string;
		lead?: string;
		children?: Snippet;
	} = $props();
</script>

<section {id} class="scroll-target" aria-labelledby="{id}-title">
	<div class="container-site py-16 sm:py-24 lg:py-28">
		<div class="max-w-3xl" data-reveal use:reveal>
			{#if eyebrow}
				<p class="eyebrow">{eyebrow}</p>
			{/if}
			<h2 id="{id}-title" class="{eyebrow ? 'mt-2.5' : ''} text-title font-semibold text-balance text-ink-50">{title}</h2>
			{#if lead}
				<p class="mt-4 max-w-2xl text-lead text-pretty text-ink-400">{lead}</p>
			{/if}
		</div>
		{#if children}{@render children()}{/if}
	</div>
</section>
