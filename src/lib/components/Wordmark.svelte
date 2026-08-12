<script lang="ts">
	import Mark from './Mark.svelte';

	let { compact = false }: { compact?: boolean } = $props();
</script>

<a href="/" class="inline-flex min-h-11 items-center gap-2" aria-label="Wright Kit — home">
	<Mark size={compact ? 20 : 22} />
	<span class="font-semibold tracking-tight text-ink-50 {compact ? 'text-[0.9375rem]' : 'text-base'}">
		Wright Kit
	</span>
</a>
