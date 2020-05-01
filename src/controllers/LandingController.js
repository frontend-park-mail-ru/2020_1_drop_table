'use strict';


import {LandingCafesContainerComponent} from '../components/LandingCafesContainer/LandingCafesContainer';
import ServerExceptionHandler from "../utils/ServerExceptionHandler";
import NotificationComponent from "../components/Notification/Notification";

/** контроллер лэндинга */
export default class LandingController {

    /**
     * Инициализация LandingController
     * @param {LandingModel} landingModel модель лэндинга
     * @param {LandingView} landingView view лэндинга
     */
    constructor(landingModel, landingView, landingCafeListModel) {
        this._landingModel = landingModel;
        this._landingView = landingView;
        this._landingCafeListModel = landingCafeListModel
    }

    /**
     * Создание контекста для LandingView
     * @return {obj} созданный контекст
     */
    _makeViewContext(){
        return {
            header: {
                type: 'landing',
                avatar: {
                    photo: null
                }
            },
            landingCafeListModel: this._landingCafeListModel,
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
            this._landingView.context = this._makeViewContext();
            this._landingView.render();
            this.addListeners();
        } catch (error) {
            if(error.message !== 'unknown server error'){
                throw(new Error(error.message));
            }
        }
    }
}
