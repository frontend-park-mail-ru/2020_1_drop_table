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

class FakeResponse {
    constructor(response) {
        this._response = response;
    }

    _copyHeaders(headers = {}) {
        let headersCopy = new Headers();
        if(this._response && this._response.headers){
            headersCopy = new Headers(Array.from(this._response.headers.entries()));
        }

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

    _checkBlobType(type){
        return !this._response ||
            this._response.headers &&
            this._response.headers.get('content-type') &&
            this._response.headers.get('content-type').includes(type)
    }

    async _copyBlob(body){
        if(body instanceof Object && this._checkBlobType('application/json')){
            const jsonBody = this._response ? Object.assign({}, await this._response.json(), body) : body;
            return new Blob([JSON.stringify(jsonBody)],
                {type : 'application/json'});

        } else if(typeof body === 'string' && this._checkBlobType('text/html')){
            const stringBody = this._response ? (await this._response.text()).concat(body) : body;
            return new Blob([JSON.stringify(stringBody)],
                {type : 'text/html'});
        }
        return this._response ? (await this._response.blob()) : new Blob();
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

class FakeRequest {
    constructor(request) {
        this._request = request;
    }

    _copyHeaders(headers = {}) {
        return headers;

        // let headersCopy = new Headers(); //TODO ON SERVER
        // if(this._request && this._request.headers){
        //     headersCopy = new Headers(Array.from(this._request.headers.entries()));
        // }
        //
        // if(headers instanceof Object){
        //     for (const [header, value] of Object.entries(headers)) {
        //         if(value){
        //             headersCopy.set(header, value);
        //         } else {
        //             headersCopy.delete(header);
        //         }
        //     }
        // }
        // return headersCopy;
    }

    async _copyBlob(){
        const blob = await this._request.blob();
        if(this._request && this._request.headers && this._request.headers.get('Content-Type')){
            const boundaryRegex = /boundary=----\w+/;
            const boundary = this._request.headers.get('Content-Type').match(boundaryRegex)[0].slice(9);
            const blobText = (await blob.text()).replace(new RegExp(boundary,'g'), boundary.toLowerCase());
            return new Blob([blobText], {type: blob.type});
        }
        return blob;
    }

    async get(headers = {}){
        const headersResponse = await this._copyHeaders(headers);
        return new Request(this._request.url, {
            method: this._request.method,
            headers: headersResponse,
            body: this._request && this._request.headers.get('Content-Type') ? await this._copyBlob() : undefined,
            referrer: this._request.referrer,
            referrerPolicy: this._request.referrerPolicy,
            mode: this._request.mode,
            credentials: this._request.credentials,
            cache: this._request.cache,
            redirect: this._request.redirect,
            integrity: this._request.integrity,
        })
    }
}


class CacheStorage {

    constructor(cacheName) {
        this._cacheName = cacheName;
        this._cache = null;
    }

    async set() {
        this._cache = await caches.open(this._cacheName);
        return this;
    }

    async match(request) {
        return await this._cache.match(request);
    }

    async put(request, response) {
        await this._cache.put(request, response.clone());
    }

    async addAll(cacheUrls){
        await this._cache.addAll(cacheUrls);
    }
}

class CsrfStorage{

    constructor() {
        this._csrfMap = new Map();
    }

    _createManager(clientId){
        const manager = new CsrfStorageManager();
        this._csrfMap.set(clientId, manager);
        return manager;
    }

    manager(clientId){
        if(!this._csrfMap.has(clientId)){
            return this._createManager(clientId);
        }
        return this._csrfMap.get(clientId);
    }
}

class CsrfStorageManager{

    constructor() {
        this._storage = null;
    }

    set csrf(csrf){
        if(csrf) {
            this._storage = csrf;
        }
    }

    get csrf(){
        return this._storage;
    }
}

class PlainRequestManager{

    constructor(csrfStorage, cacheStorage){
        this._csrfStorage = csrfStorage;
        this._cacheStorage = cacheStorage;
        this._plainRequestQueue = [];
    }

    async refresh(clientId){
        if(navigator.onLine){
            while(this._plainRequestQueue.length){
                const request = this._plainRequestQueue.shift();
                await this._handleRequest(request, clientId);
            }
        }
    }

    _hasPlainRequest(url){
        return this._plainRequestQueue.some(request => {
            return request.url === url;
        })
    }

    async _handleRequest(request, clientId){
        if(request && request.headers && request.headers.get('X-CSRF-TOKEN')){
            const csrf = (this._csrfStorage.manager(clientId)).csrf;
            request = await (new FakeRequest(request)).get({'X-CSRF-TOKEN':csrf});
        }

        const response = await fetch(request);
        const csrf = response.headers.get('Csrf');
        (this._csrfStorage.manager(clientId)).csrf = csrf;

        if(response && response.ok){
            this._cacheStorage.put(request, response);
        }
        return response;
    }

    async _onlineRequestHandler(request, clientId){
        const match = await this._cacheStorage.match(request);
        if(match && match.url){ //TODO REFRESH
            if(!this._hasPlainRequest(request.url)){
                this._plainRequestQueue.push(request);
            }
            const csrf = (this._csrfStorage.manager(clientId)).csrf;
            return (await (new FakeResponse(match)).get({'Csrf': csrf}));
        } else {
            return this._handleRequest(request, clientId);
        }
    }

    async _offlineRequestHandler(request, clientId){
        const match = await this._cacheStorage.match(request);
        const csrf = (this._csrfStorage.manager(clientId)).csrf;
        if(match){ //TODO REFRESH
            if(!this._hasPlainRequest(request.url)){
                this._plainRequestQueue.push(request);
            }
            return (await (new FakeResponse(match)).get({'Csrf': csrf},
                {'errors':[{'code':200,'message':'offline'}]}));
        } else {
            return (await (new FakeResponse(null)).get({'Csrf': csrf},
                {'errors':[{'code':200,'message':'offline'}]})); //TODO return page
        }
    }

    async fetch(request, clientId){
        if(navigator.onLine){
            return await this._onlineRequestHandler(request, clientId);
        } else {
            return await this._offlineRequestHandler(request, clientId);
        }
    }
}

class ComplicatedRequestManager{

    constructor(csrfStorage, cacheStorage){
        this._csrfStorage = csrfStorage;
        this._cacheStorage = cacheStorage;
        this._complicatedRequestQueue = [];
    }

    async refresh(clientId){
        if(navigator.onLine){
            while(this._complicatedRequestQueue.length){
                const request = this._complicatedRequestQueue.shift();
                await this._handleRequest(request, clientId);
            }
        }
    }

    async _handleRequest(request, clientId){
        if(request && request.headers && request.headers.get('X-CSRF-TOKEN')){
            const csrf = (this._csrfStorage.manager(clientId)).csrf;
            console.log('X-CSRF-TOKEN', csrf, (this._csrfStorage.manager(clientId)));
            request = await (new FakeRequest(request)).get({'X-CSRF-TOKEN':csrf});
        }

        const response = await fetch(request);
        const csrf = response.headers.get('Csrf');
        (this._csrfStorage.manager(clientId)).csrf = csrf;
        return response;
    }

    async _onlineRequestHandler(request, clientId){
        return await this._handleRequest(request, clientId);
    }

    async _offlineRequestHandler(request, clientId){
        this._complicatedRequestQueue.push(request);
        const csrf = (this._csrfStorage.manager(clientId)).csrf;
        return (await (new FakeResponse(null)).get({'Csrf': csrf},
            {'errors':[{'code':200,'message':'offline'}]}));
    }

    async fetch(request, clientId){
        if(navigator.onLine){
            return await this._onlineRequestHandler(request, clientId);
        } else {
            return await this._offlineRequestHandler(request, clientId);
        }
    }
}



const cacheStorage = new CacheStorage(cacheName);
const csrfStorage = new CsrfStorage();
const plainRequestManager = new PlainRequestManager(csrfStorage, cacheStorage);
const complicatedRequestManager = new ComplicatedRequestManager(csrfStorage, cacheStorage);

self.addEventListener('install', (event) => {
    event.waitUntil(new Promise((resolve) => {
        cacheStorage.set().then(() => {
            resolve(cacheStorage.addAll(cacheUrls));
        })
    }));
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {

    event.waitUntil(new Promise(()=>{ //TODO REFRESH
        plainRequestManager.refresh(event.clientId).then(()=>{
            complicatedRequestManager.refresh(event.clientId);
        });
    }));

    if(event.request.method === 'GET') {
        event.respondWith(plainRequestManager.fetch(event.request, event.clientId));
    } else {
        event.respondWith(complicatedRequestManager.fetch(event.request, event.clientId));
    }
});
