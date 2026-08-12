<script lang="ts">
	import Wordmark from './Wordmark.svelte';
	import { nav } from '$lib/site';
</script>

<header class="chrome sticky top-0 z-40">
	<div class="container-site flex h-14 items-center justify-between gap-6">
		<Wordmark />
		<nav aria-label="Primary" class="flex items-center">
			{#each nav as item}
				<a
					href={item.href}
					class="inline-flex min-h-11 items-center px-1 text-[0.9375rem] text-ink-200 transition-colors duration-150 hover:text-ink-50"
					{...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
				>
					{item.label}
				</a>
			{/each}
		</nav>
	</div>
</header>
