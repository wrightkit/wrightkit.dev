<script lang="ts">
	import { agents } from '$lib/site';
</script>

<section id="agents" class="scroll-mt-16 border-t border-ink-800">
	<div class="container-site py-16 sm:py-20 lg:py-24">
		<div class="max-w-2xl">
			<h2 class="font-sans font-semibold text-title text-ink-50">{agents.title}</h2>
			<p class="mt-3 text-[1.0625rem] leading-relaxed text-ink-300">{agents.lead}</p>
		</div>

		<div class="mt-10 grid gap-6 sm:grid-cols-2">
			{#each agents.points as point (point.title)}
				<div class="border border-ink-800 bg-ink-900/30 p-5">
					<h3 class="text-base font-semibold text-ink-50">{point.title}</h3>
					<p class="mt-2 text-[0.875rem] leading-relaxed text-ink-300">{point.body}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
