const endpoint = '/api/analytics/view';

function track(payload: Record<string, string>) {
	const body = JSON.stringify(payload);

	if (navigator.sendBeacon) {
		navigator.sendBeacon(endpoint, new Blob([body], { type: 'application/json' }));
		return;
	}

	void fetch(endpoint, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body,
		keepalive: true,
	});
}

if (typeof window !== 'undefined') {
	const path = window.location.pathname || '/';
	if (!path.startsWith('/admin') && !path.startsWith('/api')) {
		const match = path.match(/^\/collections\/([^/]+)/);

		track({
			path,
			...(match?.[1] ? { collectionId: decodeURIComponent(match[1]) } : {}),
		});

		document.addEventListener('click', (event) => {
			const target = event.target instanceof Element ? event.target.closest('[data-post-id]') : null;
			if (!(target instanceof HTMLElement)) return;

			const postId = target.dataset.postId;
			if (postId) track({ postId });
		});
	}
}
