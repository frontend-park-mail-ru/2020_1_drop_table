'use strict';

const CACHE_NAME = 'eloyalty';
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

this.addEventListener('install', async (event) => {
    const cache = await event.waitUntil(caches.open(CACHE_NAME));
    return cache.addAll(cacheUrls);
});

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