<script lang="ts">
	import Terminal from './Terminal.svelte';
	import CopyButton from './CopyButton.svelte';
	import { page } from '$app/state';
	import { contentForPath } from '$lib/i18n';

	let content = $derived(contentForPath(page.url.pathname));
	let hero = $derived(content.hero);
	let ui = $derived(content.ui);
</script>

<section class="relative overflow-hidden">
	<!-- Soft accent glow; static, so it adds depth without motion. -->
	<div
		class="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[56rem] -translate-x-1/2 rounded-full bg-accent-500/[0.07] blur-3xl"
		aria-hidden="true"
	></div>

	<div class="container-site relative pb-16 pt-14 sm:pb-24 sm:pt-24 lg:pb-28 lg:pt-28">
		<div class="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
			<div class="min-w-0">
				<p class="eyebrow">{hero.eyebrow}</p>
				<h1 class="mt-3 text-hero font-semibold text-balance text-ink-50">
					{hero.headline}
				</h1>
				<p class="mt-5 max-w-xl text-lead text-pretty text-ink-400 sm:mt-6">
					{hero.lead}
				</p>

				<div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
					<a class="btn btn-primary" href={hero.primaryCta.href}>{hero.primaryCta.label}</a>
					<a class="btn btn-ghost" href={hero.secondaryCta.href} target="_blank" rel="noreferrer">
						{hero.secondaryCta.label}
					</a>
				</div>

				<div
					class="mt-6 flex min-w-0 max-w-lg items-center gap-3 rounded-full bg-ink-900/70 py-1.5 pl-4 pr-1.5 ring-1 ring-ink-50/[0.06] ring-inset"
				>
					<span class="shrink-0 select-none font-mono text-xs text-ink-600" aria-hidden="true">$</span>
					<code class="min-w-0 flex-1 truncate font-mono text-xs text-ink-200">{hero.quickInstall}</code>
					<CopyButton text={hero.quickInstall} label={ui.copyInstallCommand} copiedLabel={ui.copiedToClipboard} />
				</div>
			</div>

			<div class="min-w-0">
				<Terminal />
			</div>
		</div>
	</div>
</section>
