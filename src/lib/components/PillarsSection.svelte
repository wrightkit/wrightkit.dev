<script lang="ts">
	import CopyButton from './CopyButton.svelte';
	import { pillars } from '$lib/site';

	let active = $state(0);
</script>

<section id="workflows" class="scroll-target border-t border-ink-800">
	<div class="container-site py-12 sm:py-20 lg:py-24">
		<div class="max-w-2xl">
			<h2 class="font-sans font-semibold text-title text-ink-50">Who is WrightKit for?</h2>
			<p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-300 sm:text-[1.0625rem]">
				WrightKit supports three established Workshop development workflows. Pick the one closest to
				how you work.
			</p>
		</div>

		<!-- Tab strip -->
		<div class="mt-8 sm:mt-10 flex gap-1 border-b border-ink-800" role="tablist">
			{#each pillars as pillar, i (pillar.id)}
				<button
					role="tab"
					aria-selected={active === i}
					aria-controls="pillar-panel-{pillar.id}"
					id="pillar-tab-{pillar.id}"
					class="relative px-4 py-2.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950
						{active === i
						? 'text-ink-50 after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-accent-400'
						: 'text-ink-400 hover:text-ink-200'}"
					onclick={() => (active = i)}
				>
					{pillar.label}
				</button>
			{/each}
		</div>

		<!-- Panels -->
		{#each pillars as pillar, i (pillar.id)}
			<div
				id="pillar-panel-{pillar.id}"
				role="tabpanel"
				aria-labelledby="pillar-tab-{pillar.id}"
				hidden={active !== i}
				class="mt-6 sm:mt-8"
			>
				<div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-12">
					<!-- Left: copy -->
					<div class="min-w-0">
						<h3 class="font-sans text-xl font-semibold text-ink-50 sm:text-2xl">
							{pillar.headline}
						</h3>
						<p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-300 sm:mt-4 sm:text-[1.0625rem]">
							{pillar.body}
						</p>

						<!-- Capability list -->
						<ul class="mt-5 sm:mt-6 space-y-2">
							{#each pillar.capabilities as cap}
								<li class="flex items-start gap-2.5 text-[0.875rem] leading-relaxed text-ink-300">
									<span
										class="mt-[0.2em] shrink-0 h-4 w-4 rounded-full bg-accent-500/20 flex items-center justify-center"
										aria-hidden="true"
									>
										<svg
											width="8"
											height="8"
											viewBox="0 0 8 8"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M1.5 4L3.16667 5.66667L6.5 2.33333"
												stroke="currentColor"
												stroke-width="1.2"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="text-accent-400"
											/>
										</svg>
									</span>
									{cap}
								</li>
							{/each}
						</ul>
					</div>

					<!-- Right: command snippet -->
					<div class="min-w-0 lg:pt-1">
						<div class="rounded-xs border border-ink-800 bg-ink-900/60 overflow-hidden">
							<div class="flex items-center gap-2 border-b border-ink-800 px-3 py-2 sm:px-4">
								<span class="text-[0.6875rem] font-mono text-ink-500 select-none">$</span>
								<div class="min-w-0 flex-1 overflow-hidden">
									<code class="block truncate font-mono text-xs text-ink-200">{pillar.command}</code>
								</div>
								<CopyButton text={pillar.command} label="Copy" variant="inline" />
							</div>
							<p class="px-3 py-2.5 text-[0.75rem] leading-relaxed text-ink-500 sm:px-4">
								{pillar.commandCaption}
							</p>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>
