<script lang="ts">
	import CopyButton from './CopyButton.svelte';
	import { install, site } from '$lib/site';

	let activeTargetId = $state('macos');
	let activeTarget = $derived(
		install.targets.find((t) => t.id === activeTargetId) ?? install.targets[0]
	);
</script>

<section id="install" class="scroll-mt-16 border-t border-ink-800">
	<div class="container-site py-16 sm:py-20 lg:py-24">
		<div class="max-w-2xl">
			<h2 class="font-sans font-semibold text-title text-ink-50">{install.title}</h2>
			<p class="mt-3 text-[1.0625rem] leading-relaxed text-ink-300">
				{install.lead}
			</p>
		</div>

		<!-- Segmented platform tabs -->
		<div class="mt-8">
			<div
				class="inline-flex max-w-full flex-wrap gap-1 rounded-sm border border-ink-800 bg-ink-950 p-1"
				role="tablist"
				aria-label="Target platform"
			>
				{#each install.targets as target (target.id)}
					<button
						type="button"
						role="tab"
						aria-selected={activeTargetId === target.id}
						class="flex items-center gap-2 rounded-xs px-3.5 py-1.5 font-sans text-xs font-medium tracking-tight transition-colors duration-140 active:scale-[0.98] {activeTargetId ===
						target.id
							? 'bg-ink-800 text-ink-50 shadow-xs'
							: 'text-ink-400 hover:bg-ink-900 hover:text-ink-200'}"
						onclick={() => (activeTargetId = target.id)}
					>
						<span>{target.label}</span>
						<span
							class="text-[0.6875rem] font-normal {activeTargetId === target.id
								? 'text-ink-400'
								: 'text-ink-600'}"
						>
							{target.badge}
						</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Active platform install card -->
		<div class="mt-4 max-w-3xl border border-ink-800 bg-ink-900/40">
			<!-- Header / Method info -->
			<div
				class="flex flex-wrap items-center justify-between gap-3 border-b border-ink-800 bg-ink-900/80 px-4 py-2.5 sm:px-5"
			>
				<div class="flex items-center gap-2">
					<span class="text-xs font-semibold text-ink-50">{activeTarget.method}</span>
				</div>
				<CopyButton text={activeTarget.command} label="Copy command" />
			</div>

			<!-- Command snippet -->
			<div class="p-4 sm:p-5">
				<pre
					class="overflow-x-auto rounded-sm border border-ink-800/80 bg-ink-950 p-3.5 font-mono text-[0.8125rem] leading-relaxed text-ink-100"><code
						>{activeTarget.command}</code
					></pre>

				<p class="mt-3 text-xs leading-relaxed text-ink-400">
					{activeTarget.note}
				</p>

				{#if activeTarget.altCommand}
					<div class="mt-5 border-t border-ink-800/70 pt-4">
						<div class="flex items-center justify-between gap-2">
							<span class="text-xs font-medium text-ink-300">
								Alternative: {activeTarget.altMethod}
							</span>
							<CopyButton text={activeTarget.altCommand} label="Copy" variant="inline" />
						</div>
						<pre
							class="mt-2 overflow-x-auto rounded-sm border border-ink-800/60 bg-ink-950/80 p-3 font-mono text-xs text-ink-300"><code
								>{activeTarget.altCommand}</code
							></pre>
					</div>
				{/if}
			</div>
		</div>

		<!-- Fallback release archives note -->
		<div class="mt-6 flex max-w-3xl items-center gap-2 text-xs text-ink-400">
			<svg
				class="h-4 w-4 shrink-0 text-ink-500"
				viewBox="0 0 16 16"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				aria-hidden="true"
			>
				<circle cx="8" cy="8" r="6.5" />
				<line x1="8" y1="5" x2="8" y2="8.5" />
				<circle cx="8" cy="11" r="0.5" fill="currentColor" />
			</svg>
			<span>
				{install.fallbackArchive.text}
				<a
					href={install.fallbackArchive.href}
					target="_blank"
					rel="noreferrer"
					class="text-ink-200 underline decoration-ink-600 underline-offset-2 transition-colors hover:text-ink-50 hover:decoration-ink-300"
				>
					{install.fallbackArchive.linkText}
				</a>.
			</span>
		</div>
	</div>
</section>
