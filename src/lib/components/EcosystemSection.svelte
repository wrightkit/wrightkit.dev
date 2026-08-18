<script lang="ts">
	import { ecosystem } from '$lib/site';
</script>

<section id="ecosystem" class="scroll-target border-t border-ink-800">
	<div class="container-site py-12 sm:py-20 lg:py-24">
		<div class="max-w-2xl">
			<h2 class="font-sans font-semibold text-title text-ink-50">{ecosystem.title}</h2>
			<p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-300 sm:text-[1.0625rem]">
				{ecosystem.lead}
			</p>
		</div>

		<div class="mt-8 sm:mt-10 max-w-3xl border-y border-ink-800">
			<ul class="divide-y divide-ink-800">
				{#each ecosystem.items as item (item.repo)}
					<li class="py-4 sm:py-5">
						<div class="flex items-start justify-between gap-3">
							<div class="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2.5">
								<a
									class="[overflow-wrap:anywhere] font-mono text-[0.875rem] font-medium text-ink-100 underline decoration-ink-600 underline-offset-4 transition-colors duration-150 hover:text-ink-50 hover:decoration-ink-300 active:text-accent-400 sm:text-[0.9375rem]"
									href={item.href}
									target="_blank"
									rel="noreferrer"
								>
									{item.repo}
								</a>
								<span class="text-xs text-ink-500">{item.role}</span>
							</div>
							<span
								class="shrink-0 rounded-xs px-2 py-0.5 text-xs font-medium {item.status.startsWith(
									'Released'
								)
									? 'border border-accent-500/40 bg-ink-900 text-accent-400'
									: 'border border-ink-800 bg-ink-900 text-ink-400'}"
							>
								{item.status}
							</span>
						</div>
						<p class="mt-2 max-w-xl text-[0.875rem] leading-relaxed text-ink-300">
							{item.desc}
						</p>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
