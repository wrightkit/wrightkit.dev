<script lang="ts">
	import Wordmark from './Wordmark.svelte';
	import { nav } from '$lib/site';
</script>

<header class="chrome sticky top-0 z-40 border-b border-ink-800/80 pt-[env(safe-area-inset-top)]">
	<div class="container-site flex h-14 items-center justify-between gap-3 sm:gap-4">
		<Wordmark />
		<nav
			aria-label="Primary"
			class="no-scrollbar flex items-center gap-0.5 overflow-x-auto py-1 -mr-2 sm:mr-0 sm:gap-1.5"
		>
			{#each nav as item}
				<a
					href={item.href}
					class="inline-flex min-h-11 items-center whitespace-nowrap rounded-xs px-2.5 text-xs font-medium text-ink-300 transition-all duration-120 hover:text-ink-50 active:scale-[0.95] active:text-ink-50 sm:text-sm"
					{...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
				>
					{item.label}
				</a>
			{/each}
		</nav>
	</div>
</header>
