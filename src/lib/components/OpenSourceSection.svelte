<script lang="ts">
	import Section from './Section.svelte';
	import { openSource, site } from '$lib/site';
</script>

<Section title={openSource.title} lead={openSource.lead}>
	<div class="mt-8 flex flex-col gap-6">
		<a class="btn btn-primary w-fit" href={site.github} target="_blank" rel="noreferrer">
			Explore on GitHub
		</a>
		<ul class="flex flex-col gap-2">
			{#each openSource.links as link (link.href)}
				<li>
					<a
						class="text-[0.9375rem] text-ink-100 underline decoration-ink-600 underline-offset-4 transition-colors duration-150 hover:text-ink-50 hover:decoration-ink-300"
						href={link.href}
						target="_blank"
						rel="noreferrer"
					>
						{link.label}
					</a>
					{#if link.note}
						<span class="text-[0.9375rem] text-ink-500"> — {link.note}</span>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</Section>
