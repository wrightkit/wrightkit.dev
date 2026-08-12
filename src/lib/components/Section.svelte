<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		lead,
		children
	}: {
		title: string;
		lead?: string;
		children?: Snippet;
	} = $props();
</script>

<section class="border-t border-ink-800">
	<div class="container-site py-16 sm:py-20 lg:py-24">
		<div class="max-w-2xl">
			<h2 class="font-sans font-semibold text-title text-ink-50">{title}</h2>
			{#if lead}
				<p class="mt-3 text-[1.0625rem] leading-relaxed text-ink-300">{lead}</p>
			{/if}
		</div>
		{#if children}{@render children()}{/if}
	</div>
</section>
