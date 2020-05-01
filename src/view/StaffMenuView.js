'use strict';

import BaseView from './BaseView';
/** view страницы с меню работника */
export default class StaffMenuView extends BaseView {

    /**
     * Инициализация StaffMenuView
     * @param {Element} app элемент в котором находится приложение
     * @param {string} uuid идетификатор работника
     */
    constructor(app = document.getElementById('application'), uuid) {
        super(app);
        this._uuid = uuid;
    }

    /** Отрисовка страницы с меню работника */
    render(context){
        this._app.innerHTML = '';
        const staffMenuElement = document.createElement('div');
        (new context.Component(staffMenuElement, this._uuid, context)).render();
        this._app.appendChild(staffMenuElement);
    }
}
