<script lang="ts">
	import Terminal from './Terminal.svelte';
	import { site, hero } from '$lib/site';
</script>

<section>
	<div class="container-site py-16 sm:py-24 lg:py-28">
		<div class="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-20">
			<div>
				<h1 class="max-w-[18ch] font-sans font-semibold text-hero text-ink-50">
					{site.headline}
				</h1>
				<p class="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink-300">
					{site.description}
				</p>
				<div class="mt-8 flex flex-wrap items-center gap-3">
					<a class="btn btn-primary" href={hero.primaryCta.href} target="_blank" rel="noreferrer">
						{hero.primaryCta.label}
					</a>
					<a class="btn btn-ghost" href={hero.secondaryCta.href}>
						{hero.secondaryCta.label}
					</a>
				</div>
			</div>
			<div class="lg:pt-2">
				<Terminal />
			</div>
		</div>
	</div>
</section>
