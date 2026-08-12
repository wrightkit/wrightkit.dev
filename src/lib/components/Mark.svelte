<script lang="ts">
	let { size = 24 }: { size?: number } = $props();
</script>

<!-- Project-owned geometric mark: an outlined square with an orange core. -->
<svg
	width={size}
	height={size}
	viewBox="0 0 32 32"
	fill="none"
	role="img"
	aria-label="Wright Kit mark"
>
	<rect x="2.5" y="2.5" width="27" height="27" stroke="currentColor" stroke-width="2.5" />
	<rect x="11" y="11" width="10" height="10" fill="var(--color-accent-500)" />
</svg>
