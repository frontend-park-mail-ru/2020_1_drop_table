'use strict';

import BaseView from './BaseView';
import {StaffMenuComponent} from '../components/StaffMenu/StaffMenu';
import {StaffMenuCashbackComponent} from '../components/StaffMenuCashback/StaffMenuCashback';
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
    render(customerData){
        this._app.innerHTML = '';
        if(customerData.type === 'coffee_cup' ) {
            const staffMenuElement = document.createElement('div');
            (new StaffMenuComponent(staffMenuElement, this._uuid)).render();
            this._app.appendChild(staffMenuElement);
        } else if(customerData.type === 'cashback'){
            const staffMenuCashbackElement = document.createElement('div');
            (new StaffMenuCashbackComponent(staffMenuCashbackElement, this._uuid)).render();
            this._app.appendChild(staffMenuCashbackElement);
        } else if(customerData.type === 'percents'){
            console.log('percents', customerData);
            const staffMenuDiscountsElement = document.createElement('div');
            (new StaffMenuCashbackComponent(staffMenuDiscountsElement, this._uuid)).render();
            this._app.appendChild(staffMenuDiscountsElement);
        }
    }
}
