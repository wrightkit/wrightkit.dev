<script lang="ts">
	import Terminal from './Terminal.svelte';
	import { site, hero } from '$lib/site';
</script>

<section class="relative overflow-hidden">
	<div class="grid-bg absolute inset-0" aria-hidden="true"></div>
	<div class="container-site relative py-20 sm:py-28 lg:py-32">
		<div class="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
			<div>
				<p class="eyebrow"><span class="accent" aria-hidden="true">▪</span>{site.kicker}</p>
				<h1 class="mt-6 max-w-xl font-sans font-bold text-hero text-ink-50">
					Modern tools for Overwatch<br class="hidden sm:block" />
					Workshop development.
				</h1>
				<p class="mt-6 max-w-xl text-lg leading-relaxed text-ink-300">
					{site.description}
				</p>
				<div class="mt-10 flex flex-wrap items-center gap-4">
					<a
						class="btn btn-primary"
						href={hero.primaryCta.href}
						target="_blank"
						rel="noreferrer"
					>
						{hero.primaryCta.label}<span aria-hidden="true">↗</span>
					</a>
					<a class="btn btn-ghost" href={hero.secondaryCta.href}>
						{hero.secondaryCta.label}<span aria-hidden="true">↓</span>
					</a>
				</div>
			</div>
			<div>
				<Terminal />
			</div>
		</div>
	</div>
</section>

<style>
	.grid-bg {
		background-image:
			linear-gradient(to right, rgb(255 255 255 / 0.035) 1px, transparent 1px),
			linear-gradient(to bottom, rgb(255 255 255 / 0.035) 1px, transparent 1px);
		background-size: 4rem 4rem;
		mask-image: radial-gradient(ellipse 85% 70% at 50% 0%, black 25%, transparent 78%);
		-webkit-mask-image: radial-gradient(ellipse 85% 70% at 50% 0%, black 25%, transparent 78%);
	}
</style>
