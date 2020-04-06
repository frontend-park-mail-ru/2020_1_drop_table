'use strict';

import {LandingComponent} from '../components/Landing/Landing';
import Header from '../components/MainHeader/Header';
import BaseView from './BaseView';

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
        this._app.appendChild(landingContainer);
        (new LandingComponent(landingContainer)).render();
    }

    /** Отрисовка страницы лэндинга */
    render(){
        this._app.innerHTML = '';
        (new Header(this._app)).render(this._context['header']);
        this._renderLanding();
    }
}
