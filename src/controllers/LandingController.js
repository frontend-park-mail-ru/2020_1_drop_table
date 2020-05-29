'use strict';

import {LandingCafesContainerComponent} from '../components/LandingCafesContainer/LandingCafesContainer';
import ServerExceptionHandler from '../utils/ServerExceptionHandler';
import NotificationComponent from '../components/Notification/Notification';
import {router} from '../main/main';

/** контроллер лэндинга */
export default class LandingController {

    /**
     * Инициализация LandingController
     * @param {LandingModel} landingModel модель лэндинга
     * @param {UserModel} userModel модель ользователя
     * @param {LandingView} landingView view лэндинга
     */
    constructor(landingModel, userModel, landingView, landingCafeListModel) {
        this._landingModel = landingModel;
        this._userModel = userModel;
        this._landingView = landingView;
        this._landingCafeListModel = landingCafeListModel
        this._map = null;
        this._headerType = '';
    }

    /**
     * Создание контекста для LandingView
     * @return {obj} созданный контекст
     */
    async _makeViewContext(){
        let context = {
            header: {
                type: this._headerType,
                isOwner: this._userModel.isOwner,
                avatar: {
                    photo: null
                }
            },
            landingCafeListModel: this._landingCafeListModel,
        };
        return context;
    }

    async update(){
        try {
            await this._landingCafeListModel.update();
            await this._userModel.getOwner();
        } catch (exception) {
            (new ServerExceptionHandler(document.body, this._makeExceptionContext())).handle(exception);
        }
    }

    addListeners(){
        const buttonLeft = document.getElementsByClassName('landing-page__cafes__circle-left__circle').item(0);
        const buttonRight = document.getElementsByClassName('landing-page__cafes__circle-right__circle').item(0);
        const searchButton = document.getElementById('searchButton');

        buttonLeft.addEventListener('click',this.cafesBack.bind(this));
        buttonRight.addEventListener('click',this.cafesForward.bind(this));
        searchButton.addEventListener('click', this._resetCafes.bind(this));
    }

    async _resetCafes(){
        this._landingCafeListModel.clearMe();
        await this.cafesForward();
    }

    cafesBack(){
        let container = document.getElementsByClassName('landing-page__cafes__container').item(0);
        if(this._landingCafeListModel._currentId > 0) {
            this._landingCafeListModel._currentId -= this._landingCafeListModel._step;

            let cafes = this._landingCafeListModel._cafeListJson;
            (new LandingCafesContainerComponent(container)).render(
                cafes.slice(this._landingCafeListModel._currentId,
                    this._landingCafeListModel._currentId + this._landingCafeListModel._step));
        }
    }

    async cafesForward(){
        let container = document.getElementsByClassName('landing-page__cafes__container').item(0);
        let cafes = this._landingCafeListModel._cafeListJson;

        if(this._landingCafeListModel._currentId + this._landingCafeListModel._step >= cafes.length ){
            const searchBy = document.getElementById('search').value;
            await this._landingCafeListModel.update(searchBy);
            cafes = this._landingCafeListModel._cafeListJson;
        }

        if(this._landingCafeListModel._currentId + this._landingCafeListModel._step < cafes.length){
            this._landingCafeListModel._currentId += this._landingCafeListModel._step
        }

        (new LandingCafesContainerComponent(container)).render(cafes.slice(
            this._landingCafeListModel._currentId,
            this._landingCafeListModel._currentId + this._landingCafeListModel._step));
    }

    _loadScript(url, callback){
        let script = document.createElement('script')
        script.type = 'text/javascript';

        if (script.readyState){
            script.onreadystatechange = function(){
                if (script.readyState === 'loaded' ||
                    script.readyState === 'complete'){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    async _loadCafesToMap(){
        let center = this._map.getCenter();
        let bounds = this._map.getBounds();
        let radius = 6378137 * Math.acos(Math.sin(bounds[0][0] * Math.PI / 180) *
            Math.sin(bounds[1][0] * Math.PI / 180) + Math.cos(bounds[0][0] * Math.PI / 180) *
            Math.cos(bounds[1][0] * Math.PI / 180) * Math.cos((bounds[0][1] - bounds[1][1]) * Math.PI / 180));

        await this._landingModel.getNearestCafes(center[0], center[1], radius);

        let myGeoObjects = [];
        for (let i = 0; i < this._landingModel.cafes.length; i++) {
            myGeoObjects[i] = new ymaps.GeoObject({
                geometry: {
                    type: 'Point',
                    coordinates: this._landingModel.cafes[i].location.split(' '),
                },
                properties: {
                    hintContent: this._landingModel.cafes[i].name,
                    balloonContentHeader: this._landingModel.cafes[i].name,
                    balloonContentBody: this._landingModel.cafes[i].description
                }
            });
        }

        let myClusterer = new ymaps.Clusterer();
        myClusterer.add(myGeoObjects);
        this._map.geoObjects.add(myClusterer);
    }

    _mapInit(){
        this._map = new ymaps.Map('map', {
            center: [55.76, 37.64],
            zoom: 7
        });
        this._loadCafesToMap();
        this._map.events.add('boundschange', this._loadCafesToMap, this);
    }


    _makeExceptionContext(){
        return {
            'no permission': ()=>{
                this._headerType = 'landing'
                return [null, null]
            },
            'offline': () => {
                (new NotificationComponent('Похоже, что вы оффлайн.')).render();
                return [null, null]
            },
        }
    }

    /** Запуск контроллера */
    async control(){
        try {
            this._loadScript('https://api-maps.yandex.ru/2.1/?apikey=42822888-b48e-4a87-81c8-cbd67770b60b&lang=ru_RU',
                ()=>{ymaps.ready(this._mapInit, this)});

            await this.update();
            this._landingView.context = await this._makeViewContext();
            await this._landingView.render();
            this.addListeners();

        } catch (error) {
            console.log(error.message);
        }
    }
}
