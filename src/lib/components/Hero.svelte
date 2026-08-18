<script lang="ts">
	import Terminal from './Terminal.svelte';
	import CopyButton from './CopyButton.svelte';
	import { site, hero } from '$lib/site';
</script>

<section>
	<div class="container-site py-12 sm:py-20 lg:py-28">
		<!-- Two-column on lg: text left, terminal right. Single column below lg. -->
		<div class="grid items-start lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">

			<!-- Left / top: copy, CTAs, quick-install -->
			<div class="min-w-0">
				<h1 class="font-sans font-semibold text-hero text-ink-50">
					{site.headline}
				</h1>
				<p class="mt-4 text-[0.9375rem] leading-relaxed text-ink-300 sm:mt-5 sm:text-[1.0625rem]">
					{site.description}
				</p>

				<div class="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
					<a class="btn btn-primary" href={hero.primaryCta.href}>
						{hero.primaryCta.label}
					</a>
					<a class="btn btn-ghost" href={hero.secondaryCta.href} target="_blank" rel="noreferrer">
						{hero.secondaryCta.label}
					</a>
				</div>

				<!-- Quick-install snippet: the command is long; truncate it inside an inner div so it never breaks the outer layout -->
				<div
					class="mt-5 flex min-w-0 items-center gap-2 rounded-xs border border-ink-800 bg-ink-900/60 px-3 py-2 sm:mt-6 sm:max-w-lg sm:gap-3 sm:px-3.5 sm:py-2.5"
				>
					<span class="shrink-0 select-none font-mono text-xs text-ink-500">$</span>
					<div class="min-w-0 flex-1 overflow-hidden">
						<code class="block truncate font-mono text-xs text-ink-200">{hero.quickInstall}</code>
					</div>
					<CopyButton text={hero.quickInstall} label="Copy" variant="inline" />
				</div>
			</div>

			<!-- Right: terminal — only visible on lg (side by side with copy) -->
			<div class="hidden min-w-0 lg:block lg:pt-2">
				<Terminal />
			</div>
		</div>

		<!-- Terminal shown stacked below copy on sm/md (not on mobile — too dense at <640px; not on lg — it's in the grid) -->
		<div class="mt-10 min-w-0 sm:mt-12 sm:block lg:hidden hidden">
			<Terminal />
		</div>
	</div>
</section>
