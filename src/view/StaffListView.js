'use strict'

import BaseView from './BaseView';
import Header from '../components/Header/Header';
import {StaffPageComponent} from '../components/Staff/StaffPageComponent/StaffPageComponent';

/** view страницы с работниками */
export default class StaffListView extends BaseView{

    /**
     * Инициализация StaffListView
     * @param {Element} app элемент в котором находится приложение
     */
    constructor(app = document.getElementById('application')) {
        super(app);
    }

    /** Отрисовка работников */
    _renderStaff(){
        const staffContainer = document.createElement('div');
        (new StaffPageComponent(staffContainer)).render(this._context['staffList']);
        this._app.appendChild(staffContainer);
    }

    /** Отрисовка страницы с работниками */
    render() {
        this._app.innerHTML = '';
        (new Header(this._app)).render(this._context['header']);
        this._renderStaff();
    }
}
