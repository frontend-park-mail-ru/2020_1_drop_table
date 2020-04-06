'use strict';

const CACHE_NAME = 'eloyalty';

/** Urls поддерживающие кэширование */
const cacheUrls = [
    '/',
    '/landing',
    '/reg',
    '/login',
    '/myCafes',
    '/profile',
    '/createCafe',
    '/staff',
    '/addStaff',
    '/myCafes',

];

/** Обработчик установки Service worker */
this.addEventListener('install', async (event) => {
    const cache = await event.waitUntil(caches.open(CACHE_NAME));
    return cache.addAll(cacheUrls);
});

/** Обработчик запроса (fetch) для Service worker */
this.addEventListener('fetch', (event) => {
    alert('fetch');
    event.respondWith(
        caches.match(event.request).then(function(cachedResponse) {
            if (cachedResponse && !navigator.onLine) {
                return cachedResponse;
            }
            return fetch(event.request);
        })
    );
});