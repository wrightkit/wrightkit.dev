<script lang="ts">
	import Wordmark from './Wordmark.svelte';
	import { site, footer } from '$lib/site';
</script>

<footer class="border-t border-ink-800">
	<div class="container-site flex flex-col gap-4 py-10 sm:flex-row sm:items-end sm:justify-between">
		<div class="flex flex-col gap-1.5">
			<Wordmark compact />
			<p class="text-sm text-ink-500">{footer.note}</p>
		</div>
		<div class="flex flex-col gap-1 sm:items-end">
			<p class="text-sm text-ink-500">{footer.copyright}</p>
			<p class="text-sm text-ink-500">
				<a
					class="underline decoration-ink-600 underline-offset-4 transition-colors duration-150 hover:text-ink-100 hover:decoration-ink-300"
					href={site.github}
					target="_blank"
					rel="noreferrer"
				>
					github.com/wrightkit
				</a>
				· {site.license}
			</p>
		</div>
	</div>
</footer>
