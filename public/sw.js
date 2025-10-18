const CACHE_NAME = 'finflow-v1.2';
const API_CACHE = 'finflow-api-v1';

// Статические ресурсы
const STATIC_URLS = [
	'/',
	'/static/css/main.css',
	'/static/js/main.js',
	'/manifest.json',
	'/icon-192.png',
	'/icon-512.png'
];

// Стратегия кэширования
const CACHE_STRATEGIES = {
	STATIC: 'cache-first',
	API: 'network-first',
	IMAGES: 'cache-first'
};

// Установка - кэшируем статику
self.addEventListener('install', (event) => {
	console.log('Service Worker installing');
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(cache => cache.addAll(STATIC_URLS))
		.then(() => self.skipWaiting())
	);
});

// Активация - очистка старых кэшей
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

// Fetch events
self.addEventListener('fetch', (event) => {
	const { request } = event;
	const url = new URL(request.url);

	// API запросы - Network First
	if (url.pathname.startsWith('/api/')) {
		event.respondWith(handleApiRequest(request));
	}
	// Статика - Cache First
	else if (isStaticAsset(url)) {
		event.respondWith(handleStaticRequest(request));
	}
	// Изображения - Cache First с обновлением
	else if (request.destination === 'image') {
		event.respondWith(handleImageRequest(request));
	}
});

async function handleApiRequest(request) {
	const cache = await caches.open(API_CACHE);

	try {
		// Пробуем сеть сначала
		const networkResponse = await fetch(request);

		// Кэшируем успешные ответы
		if (networkResponse.ok) {
			cache.put(request, networkResponse.clone());
		}

		return networkResponse;
	} catch (error) {
		// Fallback к кэшу
		const cachedResponse = await cache.match(request);
		if (cachedResponse) {
			return cachedResponse;
		}

		// Оффлайн-ответ для API
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
		// Обновляем кэш в фоне
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
	return url.pathname.startsWith('/static/') ||
		url.pathname.endsWith('.css') ||
		url.pathname.endsWith('.js');
}

// Background sync для оффлайн-действий
self.addEventListener('sync', (event) => {
	if (event.tag === 'background-sync') {
		console.log('Background sync triggered');
		event.waitUntil(doBackgroundSync());
	}
});

async function doBackgroundSync() {
	// Здесь можно синхронизировать оффлайн-данные
	console.log('Syncing offline data...');
}