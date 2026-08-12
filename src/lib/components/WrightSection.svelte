<script lang="ts">
	import Section from './Section.svelte';
	import { wright } from '$lib/site';
</script>

<section id="wright" class="scroll-mt-8 border-t border-ink-800">
	<div class="container-site py-20 sm:py-24 lg:py-28">
		<div class="max-w-3xl">
			<p class="eyebrow"><span class="accent">02</span>{wright.eyebrow}</p>
			<h2 class="mt-5 font-sans font-bold text-title text-ink-50">{wright.title}</h2>
			<p class="mt-5 text-lg leading-relaxed text-ink-300">{wright.lead}</p>
		</div>

		<div class="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
			<div class="card p-7 sm:p-8">
				<p class="eyebrow"><span class="accent">▪</span>{wright.status.label}</p>
				<p class="mt-4 inline-block border border-accent-500/50 bg-accent-500/10 px-2.5 py-1 font-mono text-xs uppercase tracking-[0.18em] text-accent-400">
					{wright.status.value}
				</p>
				<p class="mt-4 text-sm leading-relaxed text-ink-300">{wright.status.detail}</p>
			</div>

			<ul class="divide-y divide-ink-800 border-y border-ink-800">
				{#each wright.capabilities as capability, i (capability.title)}
					<li class="grid gap-2 py-6 sm:grid-cols-[2rem_1fr] sm:gap-5">
						<span class="font-mono text-xs text-ink-500">{String(i + 1).padStart(2, '0')}</span>
						<div>
							<h3 class="font-sans text-base font-semibold text-ink-50">
								{capability.title}
							</h3>
							<p class="mt-2 text-sm leading-relaxed text-ink-300">{capability.body}</p>
							<p class="mt-3 font-mono text-xs text-accent-500/80">{capability.artifact}</p>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
