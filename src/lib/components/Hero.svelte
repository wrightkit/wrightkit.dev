<script lang="ts">
	import Terminal from './Terminal.svelte';
	import CopyButton from './CopyButton.svelte';
	import { site, hero } from '$lib/site';
</script>

<section>
	<div class="container-site py-10 sm:py-20 lg:py-28">
		<div class="grid min-w-0 items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
			<div>
				<h1 class="font-sans font-semibold text-hero text-ink-50">
					{site.headline}
				</h1>
				<p class="mt-4 text-[0.9375rem] leading-relaxed text-ink-300 sm:mt-5 sm:text-[1.0625rem] sm:max-w-xl">
					{site.description}
				</p>

				<div class="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
					<a class="btn btn-primary w-full sm:w-auto" href={hero.primaryCta.href}>
						{hero.primaryCta.label}
					</a>
					<a class="btn btn-ghost w-full sm:w-auto" href={hero.secondaryCta.href} target="_blank" rel="noreferrer">
						{hero.secondaryCta.label}
					</a>
				</div>

				<!-- Quick install snippet -->
				<div class="mt-5 flex min-w-0 max-w-lg items-center justify-between gap-2.5 rounded-xs border border-ink-800 bg-ink-900/60 px-3 py-2 sm:mt-6 sm:gap-3 sm:px-3.5 sm:py-2.5">
					<div class="flex min-w-0 items-center gap-2 overflow-hidden">
						<span class="select-none font-mono text-xs text-ink-500">$</span>
						<code class="truncate font-mono text-xs text-ink-200">{hero.quickInstall}</code>
					</div>
					<CopyButton text={hero.quickInstall} label="Copy" variant="inline" />
				</div>
			</div>

			<div class="min-w-0 lg:pt-2">
				<Terminal />
			</div>
		</div>
	</div>
</section>
