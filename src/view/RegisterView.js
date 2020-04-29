'use strict';

import Header from '../components/Header/Header';
import BaseView from './BaseView';
import AuthorizeComponent from '../components/AuthorizeComponent/AuthorizeComponent';

/** view регистрации */
export default class RegisterView extends BaseView {

    /**
     * Инициализация RegisterView
     * @param {Element} app элемент в котором находится приложение
     * @param {Element} topBarText элемент в котором находится текст topBar
     */
    constructor(app, topBarText) {
        super(app);
        this._topBarText = topBarText;
    }

    /** Отрисовка регистрации */
    _renderRegister(){
        let registerContainer = document.createElement('div');
        registerContainer.className = 'registerContainer';
        this._app.appendChild(registerContainer);
        if(this._topBarText){
            this._context['register'].topText = this._topBarText;
        }
        (new AuthorizeComponent(registerContainer)).render(this._context['register']);
    }

    /** Отрисовка страницы регистрации */
    render(){
        this._app.innerHTML = '';
        (new Header(this._app)).render(this._context['header']);
        this._renderRegister();
    }
}
