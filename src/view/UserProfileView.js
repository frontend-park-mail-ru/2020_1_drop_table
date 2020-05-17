'use strict';

import Header from '../components/Header/Header';
import ProfileComponent from '../components/Profile/Profile';
import BaseView from './BaseView';

/** view страницы профиля */
export default class UserProfileView extends BaseView {

    /**
     * Инициализация UserProfileView
     * @param {Element} app элемент в котором находится приложение
     */
    constructor(app = document.getElementById('application')) {
        super(app);
    }

    /** Отрисовка страницы профиля */
    render(){
        this._app.innerHTML = '';
        (new Header(this._app)).render(this._context['header']);
        const profileElement = document.createElement('div');
        (new ProfileComponent(profileElement)).render(this._context['profile']);
        this._app.appendChild(profileElement);
    }
}
