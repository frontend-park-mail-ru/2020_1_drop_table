'use strict';

const CACHE_NAME = 'eloyalty';
const cacheUrls = ['/index.html'];

self.addEventListener('install', (event) => {
    event.waitUntil(async ()=>{
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(cacheUrls);
    });
});

self.addEventListener('fetch', (event) => {
    return;
});

//
// const CACHE_NAME = 'eloyalty';
//
// /** Urls поддерживающие кэширование */
// const cacheUrls = [
//     // '/bundle.js',
//     // '/index.html',
//     // '/logo.png',
//     // '/style.css',
//     // '/style_color.css',
//     // '/sw.worker.js',
//     //
//     // '/fonts',
//     // '/fonts/BentonSans',
//     // '/fonts/BentonSans/bentonSans.css',
//     // '/fonts/BentonSans/BentonSansC-Medium.otf',
//     // '/fonts/Futura-Medium',
//     // '/fonts/Futura-Medium/futura-Medium.css',
//     // '/fonts/Futura-Medium/Futura-Medium.ttf',
//     // '/fonts/FuturaBookCTT',
//     // '/fonts/FuturaBookCTT/futuraBookCTT.css',
//     // '/fonts/FuturaBookCTT/FuturaBookCTT.ttf',
//     // '/fonts/FuturaDemiCTT',
//     // '/fonts/FuturaDemiCTT/futuraDemiCTT.css',
//     // '/fonts/FuturaDemiCTT/FuturaDemiCTT-Normal.ttf',
//     // '/fonts/Montserrat',
//     // '/fonts/Montserrat/montserrat.css',
//     // '/fonts/Montserrat/Montserrat-Light.ttf',
//     // '/fonts/Montserrat/Montserrat-Medium.ttf',
//     // '/fonts/Montserrat/Montserrat-Regular.ttf',
//     // '/fonts/fonts.css',
//     //
//     // '/images',
//     // '/images/card.svg',
//     // '/images/card-coupon.svg',
//     // '/images/cardlogo.png',
//     // '/images/icon1.svg',
//     // '/images/icon2.svg',
//     // '/images/icon3.svg',
//     // '/images/icon4.svg',
//     // '/images/icon5.svg',
//     // '/images/icon6.svg',
//     // '/images/logo.ico',
//     // '/images/phone.png',
//     // '/images/phones.svg',
//     // '/images/plus.png',
//     // '/images/plus.svg',
//     // '/images/strip.png',
//     // '/images/test.jpg',
//     // '/images/userpic.png',
// ];
//
//
// // self.addEventListener('install', (event) => {
// //     event.waitUntil(async ()=>{
// //         const cache = await caches.open(CACHE_NAME);
// //         await cache.addAll(cacheUrls);
// //     });
// // });
// //
// // self.addEventListener('fetch', (event) => {
// //     return;
// // });
//
// // self.addEventListener('activate', function(event) {
// //     event.waitUntil(self.clients.claim());
// // });
//
//
// // async function fromCache(request) {
// //     const cache = await caches.open(CACHE_NAME);
// //     const match = await cache.match(request);
// //     const ret = match || await update(request);
// //     console.log(request.url, ret);
// //     return (ret);
// // }
// //
// // async function update(request) {
// //     const cache = await caches.open(CACHE_NAME);
// //     const response = await fetch(request.clone());
// //     console.log(request.method);
// //     if(response && response.ok && request.method == 'GET'){
// //         await cache.put(request, response.clone());
// //     }
// //     return response;
// // }