'use strict';

const cacheName = 'eloyalty-v1';

/** Urls поддерживающие кэширование */
const cacheUrls = [
    '/bundle.js',
    '/index.html',
    '/logo.png',
    '/style.css',
    '/style_color.css',
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

let complicatedRequestQueue = [];
let plainRequestQueue = [];

self.addEventListener('install', (event) => {
    event.waitUntil(async () => {
        const cache = await caches.open(cacheName);
        await cache.addAll(cacheUrls);
        return self.skipWaiting();
    });
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    if(event.request.method === 'GET'){
        if(navigator.onLine){
            event.respondWith(onlineHandler(event.request, event.clientId));
        } else {
            event.respondWith(offlineHandler(event.request));
        }
    }
});

async function onlineHandler(request, clientId) {
    handlePlainRequestQueue(plainRequestQueue, clientId);
    const match = await fromCache(request);
    if(match){
        if(!plainRequestQueue.some(obj => {
            return obj.url === request.url;
        })){
            plainRequestQueue.push(request);
        }
        return match;
    } else {
        return handleFetch(request, clientId);
    }
}

async function offlineHandler(request) {
    const match = await fromCache(request);
    if(match){
        console.log(plainRequestQueue);
        if(!plainRequestQueue.some(obj => {
            return obj.url === request.url;
        })){
            plainRequestQueue.push(request);
        }
        return match;
    } else {
        return null; // TODO OFFLINE WORKING
    }
}

async function fromCache(request){
    const cache = await caches.open(cacheName);
    return await cache.match(request);
}

async function handleFetch(request, clientId){
    const response = await fetch(request);
    const [responseNoCsrf, csrf] = await removeResponseCsrfHeader(response.clone());
    await setCsrf(csrf, clientId);
    if(responseNoCsrf && responseNoCsrf.ok){
        const cache = await caches.open(cacheName);
        await cache.put(request, responseNoCsrf.clone());
    }
    return response;
}

async function setCsrf(csrf, clientId){
    if (clientId) return;
    const client = await self.clients.get(clientId);
    if (!client) return;

    if(csrf) {
        client.postMessage({
            Csrf: csrf
        });
    }
}

async function handlePlainRequestQueue(requestQueue, clientId){
    while(requestQueue.length){
        const request = requestQueue.shift();
        handleFetch(request, clientId);
    }
}

async function removeResponseCsrfHeader(response){
    if(response && response.headers && response.headers.get('Csrf')){
        let headersCopy = constructHeaders(response);
        headersCopy.delete('Csrf');
        const responseCopy = await constructResponse(response, headersCopy);
        return [responseCopy, response.headers.get('Csrf')];
    }
    return [response, null];
}

async function constructResponse(response, headers){
    const blobResponse = await response.blob();
    return new Response(blobResponse, {
        status: response.status,
        statusText: response.statusText,
        headers: headers ? headers : response.headers
    });
}

function constructHeaders(response){
    let headers = new Headers();
    for (let keyValue of response.headers.entries()) {
        headers.append(...keyValue);
    }
    return headers;
}