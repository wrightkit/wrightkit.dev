<script lang="ts">
	import Section from './Section.svelte';
	import { openSource, site } from '$lib/site';
</script>

<Section title={openSource.title} lead={openSource.lead}>
	<div class="mt-8 flex flex-col gap-6">
		<div class="flex flex-wrap items-center gap-3">
			<a class="btn btn-primary" href={site.github} target="_blank" rel="noreferrer">
				View wright on GitHub
			</a>
			<a class="btn btn-ghost" href={site.releases} target="_blank" rel="noreferrer">
				Releases
			</a>
		</div>

		<ul class="mt-4 divide-y divide-ink-800 border-y border-ink-800">
			{#each openSource.links as link (link.href)}
				<li class="py-4">
					<a
						class="text-[0.9375rem] font-medium text-ink-100 underline decoration-ink-600 underline-offset-4 transition-colors duration-150 hover:text-ink-50 hover:decoration-ink-300"
						href={link.href}
						target="_blank"
						rel="noreferrer"
					>
						{link.label}
					</a>
					{#if link.note}
						<p class="mt-1 text-xs text-ink-400">{link.note}</p>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</Section>
