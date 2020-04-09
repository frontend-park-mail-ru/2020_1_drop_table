'use strict';

import RegisterComponent from '../components/Register/Register';
import Header from '../components/Header/Header';
import BaseView from './BaseView';

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
        console.log('test regview', topBarText )
    }

    /** Отрисовка регистрации */
    _renderRegister(){
        let registerContainer = document.createElement('div');
        registerContainer.className = 'registerContainer';
        this._app.appendChild(registerContainer);
        (new RegisterComponent(registerContainer)).render(this._context['register'], this._topBarText);
    }

    /** Отрисовка страницы регистрации */
    render(){
        this._app.innerHTML = '';
        (new Header(this._app)).render(this._context['header']);
        this._renderRegister();
    }
}
