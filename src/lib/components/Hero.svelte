<script lang="ts">
	import { reveal } from '$lib/reveal';
	import Terminal from './Terminal.svelte';
	import CopyButton from './CopyButton.svelte';
	import { quickInstall, site } from '$lib/site';
	import { currentMessages } from '$lib/content';

	const t = $derived(currentMessages());
</script>

<section>
	<div class="container-site pb-16 pt-14 sm:pb-24 sm:pt-24 lg:pb-28 lg:pt-28">
		<div class="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
			<div class="min-w-0">
				<p class="eyebrow" data-reveal use:reveal>{t.hero.eyebrow}</p>
				<h1 class="mt-3 text-hero font-semibold text-balance text-ink-50" data-reveal style="--reveal-delay: 70ms" use:reveal>
					{t.hero.headline}
				</h1>
				<p class="mt-5 max-w-xl text-lead text-pretty text-ink-400 sm:mt-6" data-reveal style="--reveal-delay: 140ms" use:reveal>
					{t.hero.lead}
				</p>

				<div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap" data-reveal style="--reveal-delay: 210ms" use:reveal>
					<a class="btn btn-primary" href="#install">{t.hero.primaryCta}</a>
					<a class="btn btn-ghost" href={site.github} target="_blank" rel="noreferrer">
						{t.hero.secondaryCta}
					</a>
				</div>

				<div
					data-reveal
					style="--reveal-delay: 280ms"
					use:reveal
					class="mt-6 flex min-w-0 max-w-lg items-center gap-3 rounded-full bg-ink-900/70 py-1.5 pl-4 pr-1.5 ring-1 ring-ink-50/[0.06] ring-inset"
				>
					<span class="shrink-0 select-none font-mono text-xs text-ink-600" aria-hidden="true">$</span>
					<code class="min-w-0 flex-1 truncate font-mono text-xs text-ink-200">{quickInstall}</code>
					<CopyButton text={quickInstall} label={t.ui.copyInstall} />
				</div>
			</div>

			<div class="min-w-0" data-reveal style="--reveal-delay: 180ms" use:reveal>
				<Terminal />
			</div>
		</div>
	</div>
</section>
