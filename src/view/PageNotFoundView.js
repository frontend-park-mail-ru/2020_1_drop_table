'use strict';


import Header from '../components/Header/Header';
import BaseView from './BaseView';
import {PageNotFound} from '../components/PageNotFound/PageNotFound';

/** view лэндинга */
export default class PageNotFoundView extends BaseView {

    /**
     * Инициализация LandingView
     * @param {Element} app элемент в котором находится приложение
     */
    constructor(app = document.getElementById('application')) {
        super(app);
    }



    /** Отрисовка страницы лэндинга */
    async render(context){
        console.log('render');
        this._app.innerHTML = '';
        console.log(this._app.innerHTML);
        (new Header(this._app)).render(context['header']);
        let container = document.createElement('div');
        container.className = 'container-not-found';
        (new PageNotFound(container)).render(context['error']);
        console.log('render', container);
        this._app.appendChild(container);

    }
}
