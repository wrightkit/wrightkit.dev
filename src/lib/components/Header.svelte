<script lang="ts">
	import Wordmark from './Wordmark.svelte';
	import { nav } from '$lib/site';
</script>

<header class="chrome sticky top-0 z-40 border-b border-ink-800/60">
	<div class="container-site flex h-14 items-center justify-between gap-4">
		<Wordmark />
		<nav aria-label="Primary" class="flex items-center gap-1 overflow-x-auto py-1 sm:gap-2">
			{#each nav as item}
				<a
					href={item.href}
					class="inline-flex min-h-11 items-center whitespace-nowrap px-2 text-xs font-medium text-ink-300 transition-colors duration-140 hover:text-ink-50 active:scale-[0.97] sm:text-sm"
					{...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
				>
					{item.label}
				</a>
			{/each}
		</nav>
	</div>
</header>
