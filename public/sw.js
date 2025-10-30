const CACHE_NAME = 'finflow-v1.3';
const API_CACHE = 'finflow-api-v1';

const STATIC_URLS = [
	'/',
	'/manifest.json',
	'/favicon.ico',
	'/logo192.png',
	'/logo512.png'
];

const CACHE_STRATEGIES = {
	STATIC: 'cache-first',
	API: 'network-first',
	IMAGES: 'cache-first'
};

self.addEventListener('install', (event) => {
	console.log('Service Worker installing');
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(cache => cache.addAll(STATIC_URLS))
		.then(() => self.skipWaiting())
	);
});

self.addEventListener('activate', (event) => {
	console.log('Service Worker activating');
	event.waitUntil(
		caches.keys().then(keys =>
			Promise.all(
				keys.map(key => {
					if (key !== CACHE_NAME && key !== API_CACHE) {
						console.log('Deleting old cache:', key);
						return caches.delete(key);
					}
				})
			)
		).then(() => self.clients.claim())
	);
});

self.addEventListener('fetch', (event) => {
	const { request } = event;
	const url = new URL(request.url);

	if (url.pathname.startsWith('/api/')) {
		event.respondWith(handleApiRequest(request));
	}
	else if (isStaticAsset(url)) {
		event.respondWith(handleStaticRequest(request));
	}
	else if (request.destination === 'image') {
		event.respondWith(handleImageRequest(request));
	}
});

async function handleApiRequest(request) {
	const cache = await caches.open(API_CACHE);

	try {
		const networkResponse = await fetch(request);

		if (networkResponse.ok) {
			cache.put(request, networkResponse.clone());
		}

		return networkResponse;
	} catch (error) {
		const cachedResponse = await cache.match(request);
		if (cachedResponse) {
			return cachedResponse;
		}

		return new Response(
			JSON.stringify({
				error: 'You are offline',
				timestamp: Date.now()
			}),
			{
				status: 503,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	}
}

async function handleStaticRequest(request) {
	const cache = await caches.open(CACHE_NAME);
	const cachedResponse = await cache.match(request);

    if (cachedResponse) {
		fetch(request).then(response => {
			if (response.ok) {
				cache.put(request, response);
			}
		});

		return cachedResponse;
	}

	return fetch(request);
}

async function handleImageRequest(request) {
	const cache = await caches.open(CACHE_NAME);
	const cachedResponse = await cache.match(request);

	if (cachedResponse) {
		return cachedResponse;
	}

	const networkResponse = await fetch(request);
	if (networkResponse.ok) {
		cache.put(request, networkResponse.clone());
	}

	return networkResponse;
}

function isStaticAsset(url) {
    // Avoid caching built JS/CSS chunks and Vite prebundles to prevent outdated optimize deps
    const isBundle = url.pathname.includes('/assets/') || url.pathname.includes('/node_modules/.vite');
    if (isBundle) return false;
    return STATIC_URLS.includes(url.pathname);
}

self.addEventListener('sync', (event) => {
	if (event.tag === 'background-sync') {
		console.log('Background sync triggered');
		event.waitUntil(doBackgroundSync());
	}
});

async function doBackgroundSync() {
	console.log('Syncing offline data...');
}

self.addEventListener('notificationclick', (event) => {
	console.log('Notification clicked:', event);

		event.notification.close();

	const urlToOpen = event.notification.data?.url || self.location.origin;

		event.waitUntil(
		clients.matchAll({
			type: 'window',
			includeUncontrolled: true
		}).then((clientList) => {
			for (let i = 0; i < clientList.length; i++) {
				const client = clientList[i];
				const clientUrl = new URL(client.url);
				const targetUrl = new URL(urlToOpen);
				if (clientUrl.origin === targetUrl.origin && 'focus' in client) {
					return client.focus();
				}
			}

			if (clients.openWindow) {
				return clients.openWindow(urlToOpen);
			}
		})
	);
});

self.addEventListener('notificationclose', (event) => {
	console.log('Notification closed:', event);
});