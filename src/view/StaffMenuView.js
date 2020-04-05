'use strict';

import BaseView from "./BaseView";
import {StaffMenuComponent} from "../components/StaffMenu/StaffMenu";

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
    render(){
        this._app.innerHTML = '';
        const staffMenuElement = document.createElement('div');
        (new StaffMenuComponent(staffMenuElement, this._uuid)).render();
        this._app.appendChild(staffMenuElement);
    }
}
