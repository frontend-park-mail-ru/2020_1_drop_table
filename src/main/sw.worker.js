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

    '/bundle.js',
    '/index.html',
    '/logo.ico',
    '/style.css',
    '/sw.worker.js',

    '/fonts',
    '/fonts/BentonSans',
    '/fonts/BentonSans/bentonSans.css',
    '/fonts/BentonSans/BentonSansC-Medium.otf',
    '/fonts/Futura-Medium',
    '/fonts/Futura-Medium/futura-Medium.css',
    '/fonts/Futura-Medium/Futura-Medium.ttf',
    '/fonts/FuturaBookCTT',
    '/fonts/FuturaBookCTT/futuraBookCTT.css',
    '/fonts/FuturaBookCTT/FuturaBookCTT.ttf',
    '/fonts/FuturaDemiCTT',
    '/fonts/FuturaDemiCTT/futuraDemiCTT.css',
    '/fonts/FuturaDemiCTT/FuturaDemiCTT-Normal.ttf',
    '/fonts/Montserrat',
    '/fonts/Montserrat/montserrat.css',
    '/fonts/Montserrat/Montserrat-Light.ttf',
    '/fonts/Montserrat/Montserrat-Medium.ttf',
    '/fonts/Montserrat/Montserrat-Regular.ttf',
    '/fonts/fonts.css',

    '/images',
    '/images/card.svg',
    '/images/card-coupon.svg',
    '/images/cardlogo.png',
    '/images/icon1.svg',
    '/images/icon2.svg',
    '/images/icon3.svg',
    '/images/icon4.svg',
    '/images/icon5.svg',
    '/images/icon6.svg',
    '/images/logo.ico',
    '/images/phone.png',
    '/images/phones.svg',
    '/images/plus.png',
    '/images/plus.svg',
    '/images/strip.png',
    '/images/test.jpg',
    '/images/userpic.png',
];

/** Обработчик установки Service worker */
this.addEventListener('install', async (event) => {
    const cache = await event.waitUntil(caches.open(CACHE_NAME));
    return cache.addAll(cacheUrls);
});

/** Обработчик запроса (fetch) для Service worker */
self.addEventListener('fetch', function(event) {
    event.respondWith(fromCache(event.request));
    event.waitUntil(update(event.request));
});

/** Получаем данные из Cache */
function fromCache(request) {
    return caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then((matching) =>
            matching || Promise.reject('no-match')
        ));
}

/** Делаем запрос на обновление данных в cache */
function update(request) {
    return caches.open(CACHE_NAME).then((cache) =>
        fetch(request).then((response) =>
            cache.put(request, response)
        )
    );
}