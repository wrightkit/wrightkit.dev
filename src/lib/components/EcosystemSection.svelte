<script lang="ts">
	import { ecosystem } from '$lib/site';
</script>

<section id="ecosystem" class="scroll-mt-16 border-t border-ink-800">
	<div class="container-site py-16 sm:py-20 lg:py-24">
		<div class="max-w-2xl">
			<h2 class="font-sans font-semibold text-title text-ink-50">{ecosystem.title}</h2>
			<p class="mt-3 text-[1.0625rem] leading-relaxed text-ink-300">
				{ecosystem.lead}
			</p>
		</div>

		<div class="mt-10 max-w-3xl border-y border-ink-800">
			<ul class="divide-y divide-ink-800">
				{#each ecosystem.items as item (item.repo)}
					<li class="py-5">
						<div class="flex items-baseline justify-between gap-4">
							<div class="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
								<a
									class="text-[0.9375rem] font-medium text-ink-100 underline decoration-ink-600 underline-offset-4 transition-colors duration-150 hover:text-ink-50 hover:decoration-ink-300"
									href={item.href}
									target="_blank"
									rel="noreferrer"
								>
									{item.repo}
								</a>
								<span class="text-xs text-ink-500">{item.role}</span>
							</div>
							<span class="shrink-0 text-xs font-medium text-ink-400">{item.status}</span>
						</div>
						<p class="mt-1.5 max-w-xl text-[0.875rem] leading-relaxed text-ink-300">
							{item.desc}
						</p>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
