<script lang="ts">
	import { wright } from '$lib/site';
</script>

<section id="wright" class="scroll-mt-16 border-t border-ink-800">
	<div class="container-site py-16 sm:py-20 lg:py-24">
		<div class="max-w-2xl">
			<h2 class="font-sans font-semibold text-title text-ink-50">{wright.title}</h2>
			<p class="mt-3 text-[1.0625rem] leading-relaxed text-ink-300">{wright.lead}</p>
			<p class="mt-5 text-[0.9375rem] leading-relaxed text-ink-300">
				<strong class="font-semibold text-ink-50">{wright.status.value}.</strong>
				{wright.status.detail}
			</p>
		</div>

		<ul class="mt-10 max-w-2xl divide-y divide-ink-800 border-y border-ink-800">
			{#each wright.capabilities as capability (capability.title)}
				<li class="py-6">
					<h3 class="text-base font-semibold text-ink-50">{capability.title}</h3>
					<p class="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-300">{capability.body}</p>
					<p class="path mt-3">{capability.artifact}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>
