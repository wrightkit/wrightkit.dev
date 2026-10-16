<script lang="ts">
	import Mark from './Mark.svelte';
	import { localePath } from '#lib/locales.js';
	import { currentLocale, currentMessages } from '#lib/content/index.js';

	let { compact = false }: { compact?: boolean } = $props();

	const t = $derived(currentMessages());
</script>

<a href={localePath(currentLocale())} class="inline-flex min-h-11 items-center gap-2 transition-transform duration-120 active:scale-[0.96]" aria-label={t.ui.home}>
	<Mark size={compact ? 20 : 22} />
	<span class="font-semibold tracking-tight text-ink-50 {compact ? 'text-[0.9375rem]' : 'text-base'}">
		WrightKit
	</span>
</a>
