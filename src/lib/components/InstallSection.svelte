<script lang="ts">
	import { onMount, tick } from 'svelte';
	import Section from './Section.svelte';
	import CopyButton from './CopyButton.svelte';
	import { installTargets as targets, site, type InstallTargetId as TargetId } from '$lib/site';
	import { currentMessages } from '$lib/content';

	const t = $derived(currentMessages());
	const install = $derived(t.install);

	let activeId = $state<TargetId>('macos');
	let active = $derived(targets.find((target) => target.id === activeId) ?? targets[0]);
	let activeCopy = $derived(install.targets[active.id]);
	let tabs: HTMLButtonElement[] = $state([]);
	let indicator = $state({ x: 0, width: 0, ready: false });

	function measure() {
		const el = tabs[targets.findIndex((target) => target.id === activeId)];
		if (el) indicator = { x: el.offsetLeft, width: el.offsetWidth, ready: true };
	}

	async function select(id: TargetId, focus = false) {
		activeId = id;
		await tick();
		const el = tabs[targets.findIndex((target) => target.id === id)];
		if (focus) el?.focus();
		el?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
	}

	function onKeydown(e: KeyboardEvent, index: number) {
		const last = targets.length - 1;
		const next =
			e.key === 'ArrowRight' ? (index === last ? 0 : index + 1)
			: e.key === 'ArrowLeft' ? (index === 0 ? last : index - 1)
			: e.key === 'Home' ? 0
			: e.key === 'End' ? last
			: null;
		if (next === null) return;
		e.preventDefault();
		select(targets[next].id, true);
	}

	function detectTarget(): TargetId | null {
		const ua = navigator.userAgent.toLowerCase();
		if (/android|iphone|ipad|ipod/.test(ua)) return null;
		if (ua.includes('windows')) return 'windows';
		if (ua.includes('macintosh')) return 'macos';
		if (ua.includes('linux') || ua.includes('x11')) return 'linux';
		return null;
	}

	// Re-measure when the tab or the locale (and so the label widths) changes.
	$effect(() => {
		void activeId;
		void install;
		measure();
	});

	onMount(() => {
		const detected = detectTarget();
		if (detected) activeId = detected;
		const observer = new ResizeObserver(measure);
		tabs.forEach((el) => el && observer.observe(el));
		return () => observer.disconnect();
	});
</script>

<Section id="install" title={install.title} lead={install.lead}>
	<div class="mt-10 max-w-3xl sm:mt-12">
		<div class="no-scrollbar -mx-1 overflow-x-auto px-1 py-1">
			<div
				class="relative inline-flex gap-0.5 rounded-full bg-ink-900 p-1 ring-1 ring-inset ring-ink-50/[0.06]"
				role="tablist"
				aria-label={install.platformLabel}
			>
				<span
					data-motion="move"
					class="absolute bottom-1 left-0 top-1 rounded-full bg-raised shadow-sm shadow-black/15 transition-[transform,width,opacity] duration-300 ease-(--ease-settle) {indicator.ready
						? 'opacity-100'
						: 'opacity-0'}"
					style="transform: translateX({indicator.x}px); width: {indicator.width}px;"
					aria-hidden="true"
				></span>
				{#each targets as target, i (target.id)}
					<button
						bind:this={tabs[i]}
						type="button"
						role="tab"
						id="install-tab-{target.id}"
						aria-selected={activeId === target.id}
						aria-controls="install-panel"
						tabindex={activeId === target.id ? 0 : -1}
						class="relative z-10 flex min-h-9 shrink-0 touch-manipulation select-none items-center whitespace-nowrap rounded-full px-4 text-sm font-medium transition-colors duration-150 {activeId ===
						target.id
							? 'text-ink-50'
							: 'text-ink-400 hover:text-ink-100'}"
						onclick={() => select(target.id)}
						onkeydown={(e) => onKeydown(e, i)}
					>
						{install.targets[target.id].label}
					</button>
				{/each}
			</div>
		</div>

		<div
			id="install-panel"
			class="surface mt-4 min-w-0 p-5 sm:p-6"
			role="tabpanel"
			aria-labelledby="install-tab-{active.id}"
		>
			<div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
				<h3 class="text-[0.9375rem] font-semibold text-ink-50">{activeCopy.method}</h3>
				<span class="text-xs text-ink-500">{activeCopy.badge}</span>
			</div>

			<div class="mt-3 flex items-start gap-2 rounded-control bg-ink-950/80 p-1.5 pl-3.5 ring-1 ring-inset ring-ink-800/80">
				<pre class="min-w-0 flex-1 overflow-x-auto py-1.5 font-mono text-[0.8125rem] leading-relaxed text-ink-100"><code>{active.command}</code></pre>
				<CopyButton text={active.command} />
			</div>
			<p class="mt-3 text-sm leading-relaxed text-ink-500">{activeCopy.note}</p>

			<div class="mt-6 border-t border-ink-800/80 pt-5">
				<h4 class="text-sm font-medium text-ink-300">{activeCopy.altMethod}</h4>
				<div class="mt-2.5 flex items-start gap-2 rounded-control bg-ink-950/60 p-1.5 pl-3.5">
					<pre class="min-w-0 flex-1 overflow-x-auto py-1.5 font-mono text-xs leading-relaxed text-ink-300"><code>{active.altCommand}</code></pre>
					<CopyButton text={active.altCommand} />
				</div>
			</div>
		</div>

		<p class="mt-5 text-sm leading-relaxed text-ink-500">
			{install.releases.before}<a class="text-link" href={site.releases} target="_blank" rel="noreferrer"
				>{install.releases.link}</a
			>{install.releases.after}
		</p>
	</div>
</Section>
