<script lang="ts">
	import { architecture } from '$lib/site';
</script>

<section id="architecture" class="scroll-mt-16 border-t border-ink-800">
	<div class="container-site py-16 sm:py-20 lg:py-24">
		<div class="max-w-2xl">
			<h2 class="font-sans font-semibold text-title text-ink-50">{architecture.title}</h2>
			<p class="mt-3 text-[1.0625rem] leading-relaxed text-ink-300">
				{architecture.lead}
			</p>
		</div>

		<!-- Pipeline steps -->
		<div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each architecture.pipeline as step (step.step)}
				<div class="flex flex-col justify-between border border-ink-800 bg-ink-900/30 p-5">
					<div>
						<span class="font-mono text-xs font-semibold text-accent-400">{step.step}</span>
						<h3 class="mt-2 font-sans text-base font-semibold text-ink-50">{step.name}</h3>
						<p class="mt-2 text-[0.875rem] leading-relaxed text-ink-300">
							{step.desc}
						</p>
					</div>
					<div class="mt-6 border-t border-ink-800/80 pt-3">
						<p class="path">{step.artifact}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
