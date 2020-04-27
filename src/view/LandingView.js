'use strict';

import {LandingComponent} from '../components/Landing/Landing';
import Header from '../components/Header/Header';
import BaseView from './BaseView';
import {LandingCafesContainerComponent} from '../components/LandingCafesContainer/LandingCafesContainer';
import CafeCard from '../components/CafeCard/CafeCard.hbs';
import CafeContainer from '../components/CafesContainer/CafesContainer.hbs';

/** view лэндинга */
export default class LandingView extends BaseView {

    /**
     * Инициализация LandingView
     * @param {Element} app элемент в котором находится приложение
     */
    constructor(app = document.getElementById('application')) {
        super(app);
    }

    /** Отрисовка лэндинга */
    _renderLanding(){
        let landingContainer = document.createElement('div');
        landingContainer.className = 'landingContainer';
        landingContainer.style.overflow = 'hidden'
        this._app.appendChild(landingContainer);
        (new LandingComponent(landingContainer)).render();
    }
    _renderCafes(){
        let container = document.getElementsByClassName('landing-page__cafes__container').item(0);
        console.log(this._context.landingCafeListModel._cafeListJson);
        let cafes = this._context.landingCafeListModel._cafeListJson;
        (new LandingCafesContainerComponent(container)).render(
            cafes.slice(
                this._context.landingCafeListModel._currentId
                ,this._context.landingCafeListModel._currentId += this._context.landingCafeListModel._step));



        // let container = document.getElementsByClassName('landing-page__cafes').item(0);
        // (new CafesContainerComponent(container)).render(this._context.cafeListModel._cafeModelsList);

    }

    /** Отрисовка страницы лэндинга */
    async render(){
        this._app.innerHTML = '';
        (new Header(this._app)).render(this._context['header']);
        this._renderLanding();
        this._renderCafes();
    }
}
