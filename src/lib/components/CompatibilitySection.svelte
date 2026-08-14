<script lang="ts">
	import { compatibility } from '$lib/site';
</script>

<section id="compatibility" class="scroll-mt-16 border-t border-ink-800">
	<div class="container-site py-16 sm:py-20 lg:py-24">
		<div class="max-w-2xl">
			<h2 class="font-sans font-semibold text-title text-ink-50">{compatibility.title}</h2>
			<p class="mt-3 text-[1.0625rem] leading-relaxed text-ink-300">
				{compatibility.lead}
			</p>
		</div>

		<!-- Frontends -->
		<div class="mt-10 grid gap-6 md:grid-cols-3">
			{#each compatibility.frontends as frontend (frontend.name)}
				<div class="border border-ink-800 bg-ink-900/30 p-5">
					<div class="flex items-center justify-between gap-2">
						<h3 class="font-sans text-base font-semibold text-ink-50">{frontend.name}</h3>
						<span
							class="rounded-xs px-2 py-0.5 text-xs font-medium {frontend.status ===
							'Supported'
								? 'bg-accent-500/10 text-accent-400 border border-accent-500/30'
								: 'bg-ink-800 text-ink-400'}"
						>
							{frontend.status}
						</span>
					</div>
					<p class="mt-1 text-xs text-ink-400">{frontend.role}</p>
					<p class="mt-3 text-[0.875rem] leading-relaxed text-ink-300">
						{frontend.details}
					</p>
				</div>
			{/each}
		</div>

		<!-- S/D/N/E Verification Model -->
		<div class="mt-12 border border-ink-800 bg-ink-900/50 p-6 sm:p-8">
			<div class="max-w-xl">
				<h3 class="font-sans text-lg font-semibold text-ink-50">
					{compatibility.sdne.title}
				</h3>
				<p class="mt-1.5 text-xs text-ink-400">
					{compatibility.sdne.lead}
				</p>
				<div class="mt-3 inline-block rounded-xs bg-ink-950 border border-ink-800 px-3 py-1.5 font-mono text-xs text-accent-400">
					Priority: {compatibility.sdne.priority}
				</div>
			</div>

			<div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{#each compatibility.sdne.levels as level (level.letter)}
					<div class="border-t border-ink-800 pt-3">
						<div class="flex items-center gap-2">
							<span class="font-mono text-sm font-bold text-ink-50">{level.letter}</span>
							<span class="text-xs font-semibold text-ink-200">({level.name})</span>
						</div>
						<p class="mt-1.5 text-xs leading-relaxed text-ink-400">
							{level.desc}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
