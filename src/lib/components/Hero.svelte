<script lang="ts">
	import Terminal from './Terminal.svelte';
	import CopyButton from './CopyButton.svelte';
	import { site, hero } from '$lib/site';
</script>

<section>
	<div class="container-site py-16 sm:py-24 lg:py-28">
		<div class="grid items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
			<div>
				<h1 class="font-sans font-semibold text-hero text-ink-50">
					{site.headline}
				</h1>
				<p class="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink-300">
					{site.description}
				</p>

				<div class="mt-8 flex flex-wrap items-center gap-3">
					<a class="btn btn-primary" href={hero.primaryCta.href}>
						{hero.primaryCta.label}
					</a>
					<a class="btn btn-ghost" href={hero.secondaryCta.href} target="_blank" rel="noreferrer">
						{hero.secondaryCta.label}
					</a>
				</div>

				<!-- Quick install snippet -->
				<div class="mt-6 flex max-w-lg items-center justify-between gap-3 border border-ink-800 bg-ink-900/60 px-3.5 py-2">
					<div class="flex items-center gap-2 overflow-hidden">
						<span class="select-none font-mono text-xs text-ink-500">$</span>
						<code class="truncate font-mono text-xs text-ink-200">{hero.quickInstall}</code>
					</div>
					<CopyButton text={hero.quickInstall} label="Copy" variant="inline" />
				</div>
			</div>

			<div class="lg:pt-2">
				<Terminal />
			</div>
		</div>
	</div>
</section>
