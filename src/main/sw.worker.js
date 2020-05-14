'use strict';

const cacheName = 'eloyalty-v1';

/** Urls поддерживающие кэширование */
const cacheUrls = [
    '/reg',
    '/login',
    '/landing',
    '/myCafes',
    '/statistics',
    '/staff',
    '/profile',
    '/createCafe',
    '/cafe/',

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
    '/images/coupon.png',
    '/images/discount.png',
    '/images/icon1.svg',
    '/images/icon2.svg',
    '/images/icon3.svg',
    '/images/icon4.svg',
    '/images/icon5.svg',
    '/images/icon6.svg',
    '/images/logo.ico',
    '/images/phone.png',
    '/images/phones.svg',
    '/images/plus.svg',
    '/images/stamp.png',
    '/images/strip.png',
    '/images/test.jpg',
    '/images/userpic.png',
    '/images/wallet.png',
];

class FakeResponse {
    constructor(response) {
        this._response = response;
    }

    _copyHeaders(headers = {}) {
        let headersCopy = new Headers(this._response ? this._response.headers : []);
        if(headers instanceof Object){
            for (const [header, value] of Object.entries(headers)) {
                if(value){
                    headersCopy.set(header, value);
                } else {
                    headersCopy.delete(header);
                }
            }
        }
        return headersCopy;
    }

    async _copyBlob(body = {}){
        if(this._response &&
            this._response.headers &&
            this._response.headers.get('content-type') === 'text/plain; charset=utf-8'){
            const jsonBody = Object.assign({}, await this._response.clone().json(), body);
            return new Blob([JSON.stringify(jsonBody)],
                {type : 'text/plain; charset=utf-8'});
        }
        if(this._response){
            return (await this._response.blob());
        } else {
            return new Blob([JSON.stringify(body)],{type : 'text/plain; charset=utf-8'});
        }
    }

    async get(headers = {}, body){
        const blobResponse = await this._copyBlob(body);
        const headersResponse = await this._copyHeaders(headers);
        return new Response(blobResponse, {
            status: this._response ? this._response.status : 200,
            statusText: this._response ? this._response.statusText : 'ok',
            headers: headersResponse
        });
    }
}

class PlainRequestManager{
    constructor(){}

    async _handleRequest(request){
        const response = await fetch(request);
        if(response && response.ok){
            const fakeResponse = await (new FakeResponse(response.clone())).get({'Csrf':null});
            let cache = await caches.open(cacheName);
            await cache.put(request, fakeResponse);
        }
        return response;
    }

    async _offlineRequestHandler(request){
        let cache = await caches.open(cacheName);
        const match = await cache.match(request);
        return await (new FakeResponse(match)).get({},
            {'errors':[{'code':200,'message':'offline'}]});
    }

    async fetch(request){
        if(navigator.onLine){
            return await this._handleRequest(request);
        } else {
            return await this._offlineRequestHandler(request);
        }
    }
}

class ComplicatedRequestManager{
    constructor(){}

    async fetch(request){
        if(navigator.onLine){
            return await fetch(request);
        } else {
            return await (new FakeResponse(null)).get({},
                {'errors':[{'code':200,'message':'offline'}]});
        }
    }
}

const plainRequestManager = new PlainRequestManager();
const complicatedRequestManager = new ComplicatedRequestManager();

self.addEventListener('install', (event) => {
    event.waitUntil(new Promise(resolve => {
        caches.open(cacheName).then((cache)=>{
            resolve(cache.addAll(cacheUrls));
        });
    }));
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    console.log(event.request.url);
    if(event.request.method === 'GET') {
        event.respondWith(plainRequestManager.fetch(event.request));
    } else {
        event.respondWith(complicatedRequestManager.fetch(event.request));
    }
});
