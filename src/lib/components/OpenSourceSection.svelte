<script lang="ts">
	import Section from './Section.svelte';
	import { openSource, site } from '$lib/site';
</script>

<Section index="04" eyebrow={openSource.eyebrow} title={openSource.title} lead={openSource.lead}>
	<div class="mt-14 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
		<a
			class="btn btn-primary"
			href={site.github}
			target="_blank"
			rel="noreferrer"
		>
			Explore on GitHub<span aria-hidden="true">↗</span>
		</a>
		<ul class="flex flex-col gap-3">
			{#each openSource.links as link (link.href)}
				<li>
					<a
						class="group inline-flex items-baseline gap-2"
						href={link.href}
						target="_blank"
						rel="noreferrer"
					>
						<span class="font-mono text-sm text-ink-100 underline decoration-ink-600 underline-offset-4 transition-colors group-hover:text-accent-400 group-hover:decoration-accent-500">
							{link.label}
						</span>
						<span class="text-accent-500" aria-hidden="true">↗</span>
						{#if link.note}
							<span class="text-sm text-ink-500">— {link.note}</span>
						{/if}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</Section>
