<script lang="ts">
	import Mark from './Mark.svelte';

	let { compact = false }: { compact?: boolean } = $props();
</script>

<a href="/" class="group inline-flex items-center gap-2.5" aria-label="Wright Kit — home">
	<Mark size={compact ? 22 : 26} />
	<span
		class="font-sans font-bold uppercase tracking-tight text-ink-50 {compact ? 'text-base' : 'text-lg'}"
	>
		Wright<span class="text-accent-500"> Kit</span>
	</span>
</a>
