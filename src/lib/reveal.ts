/**
 * Scroll reveal for elements marked `data-reveal` in markup. The hidden start
 * state lives in CSS behind `:root[data-js]` (set by the boot script in
 * app.html), so prerendered HTML never flashes hidden-then-visible, and a
 * CSS fallback shows everything if hydration never happens.
 */
let observer: IntersectionObserver | undefined;

function getObserver() {
	observer ??= new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				const el = entry.target as HTMLElement;
				el.dataset.revealed = '';
				observer?.unobserve(el);
				// The stagger delay is only for the entrance; later hover and
				// theme transitions on the same element should start at once.
				el.addEventListener('transitionend', () => el.style.removeProperty('--reveal-delay'), {
					once: true
				});
			}
		},
		{ rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
	);
	return observer;
}

export function reveal(node: HTMLElement) {
	if (node.dataset.revealed !== undefined) return;
	const io = getObserver();
	io.observe(node);
	return {
		destroy() {
			io.unobserve(node);
		}
	};
}
