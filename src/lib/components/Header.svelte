<script lang="ts">
	import Wordmark from './Wordmark.svelte';
	import { nav } from '$lib/site';
</script>

<header class="border-b border-ink-800">
	<div class="container-site flex h-16 items-center justify-between gap-6">
		<Wordmark />
		<nav aria-label="Primary" class="flex items-center gap-6">
			{#each nav as item}
				<a
					href={item.href}
					class="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.18em] text-ink-300 transition-colors hover:text-ink-50 sm:text-sm"
					{...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
				>
					{item.label}
					{#if item.external}<span class="text-accent-500" aria-hidden="true">↗</span>{/if}
				</a>
			{/each}
		</nav>
	</div>
</header>
