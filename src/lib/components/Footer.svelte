<script lang="ts">
	import Wordmark from './Wordmark.svelte';
	import { site, footer } from '$lib/site';
</script>

<footer class="border-t border-ink-800">
	<div class="container-site flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
		<div class="flex flex-col gap-2">
			<Wordmark compact />
			<p class="font-mono text-xs text-ink-500">{footer.note}</p>
		</div>
		<div class="flex flex-col gap-1 sm:items-end">
			<p class="font-mono text-xs text-ink-500">{footer.copyright}</p>
			<p class="font-mono text-xs text-ink-500">
				<a
					class="underline decoration-ink-600 underline-offset-4 transition-colors hover:text-ink-100 hover:decoration-accent-500"
					href={site.github}
					target="_blank"
					rel="noreferrer"
				>
					github.com/wrightkit<span aria-hidden="true"> ↗</span>
				</a>
				· {site.license}
			</p>
		</div>
	</div>
</footer>
