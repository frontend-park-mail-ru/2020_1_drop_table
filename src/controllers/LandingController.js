'use strict';


import {LandingCafesContainerComponent} from '../components/LandingCafesContainer/LandingCafesContainer';
import ServerExceptionHandler from "../utils/ServerExceptionHandler";
import NotificationComponent from "../components/Notification/Notification";

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
    }

    /**
     * Создание контекста для LandingView
     * @return {obj} созданный контекст
     */
    async _makeViewContext(){
        let context = {
            header: {
                type: '',
                isOwner: this._userModel._isOwner,
                avatar: {
                    photo: null
                }
            },
            landingCafeListModel: this._landingCafeListModel,
        };

        try{
            await this._userModel.getOwner();
            return context;
        } catch (error) {
            context.header.type = 'landing';
            return context;
        }
    }

    async update(){
        try {
            await this._landingCafeListModel.update();
        } catch (exception) {
            (new ServerExceptionHandler(document.body, this._makeExceptionContext())).handle(exception);
        }
    }

    addListeners(){
        const buttonLeft = document.getElementsByClassName('landing-page__cafes__circle-left__circle').item(0);
        const buttonRight = document.getElementsByClassName('landing-page__cafes__circle-right__circle').item(0);

        buttonLeft.addEventListener('click',this.cafesBack.bind(this));
        buttonRight.addEventListener('click',this.cafesForward.bind(this));
    }

    cafesBack(){
        let container = document.getElementsByClassName('landing-page__cafes__container').item(0);
        console.log('back1')
        if(this._landingCafeListModel._currentId > this._landingCafeListModel._step) {
            console.log('back2')
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
            try {
                await this._landingCafeListModel.update();
            } catch (exception) {
                (new ServerExceptionHandler(document.body, this._makeExceptionContext())).handle(exception);
            }
        }

        (new LandingCafesContainerComponent(container)).render(cafes.slice(
            this._landingCafeListModel._currentId,
            this._landingCafeListModel._currentId + this._landingCafeListModel._step));

        if(this._landingCafeListModel._currentId + this._landingCafeListModel._step < cafes.length){
            this._landingCafeListModel._currentId += this._landingCafeListModel._step
        }
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
            'offline': () => {
                (new NotificationComponent('Похоже, что вы оффлайн.')).render();
                return [null, null]
            }
        }
    }

    /** Запуск контроллера */
    async control(){
        try {
            await this.update();
            this._landingView.context = await this._makeViewContext();
            await this._landingView.render();
            this.addListeners();
            ymaps.ready(this._mapInit, this);
        } catch (error) {
            if(error.message !== 'unknown server error'){
                throw(new Error(error.message));
            }
        }
    }
}
