<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		index,
		eyebrow,
		title,
		lead,
		children
	}: {
		index: string;
		eyebrow: string;
		title: string;
		lead?: string;
		children?: Snippet;
	} = $props();
</script>

<section class="border-t border-ink-800">
	<div class="container-site py-20 sm:py-24 lg:py-28">
		<div class="max-w-3xl">
			<p class="eyebrow"><span class="accent">{index}</span>{eyebrow}</p>
			<h2 class="mt-5 font-sans font-bold text-title text-ink-50">{title}</h2>
			{#if lead}
				<p class="mt-5 text-lg leading-relaxed text-ink-300">{lead}</p>
			{/if}
		</div>
		{#if children}{@render children()}{/if}
	</div>
</section>
