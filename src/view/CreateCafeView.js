'use strict';

import Header from "../components/MainHeader/Header";
import CafeComponent from "../components/Cafe/Cafe";
import BaseView from "./BaseView";

/** view создания кафе */
export default class CreateCafeView extends BaseView{

    /**
     * Инициализация CreateCafeView
     * @param {Element} app элемент в котором находится приложение
     */
    constructor(app = document.getElementById('application')) { // TODO Remove createNewCafePage
        super(app);
    }

    /** Отрисовка страницы создания кафе */
    render(){
        this._app.innerHTML = '';
        (new Header(this._app)).render(this._context['header']);

        const cafeElement = document.createElement('div');
        this._app.appendChild(cafeElement);
        (new CafeComponent(cafeElement)).render(this._context['cafe']);
    }
}
