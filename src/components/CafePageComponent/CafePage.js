'use strict';
import './CafePage.scss';
import CafePageTemplate from './CafePage.hbs';
import {CreateCardRedactor} from '../CardCreator/CardCreator'

/** Компонент страницы кафе */
export class CafePageComponent {

    /**
     * Инициализация компоненты страницы кафе
     * @param {Element} parent элемент в котором будет располагаться компонента страницы кафе
     */
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    /**
     * Функция обрезки слишком длинного имени
     * @param {string} name название кафе
     */
    _cropName(name){
        if(name.length>20){
            return name.slice(0,18).concat('...')
        }
        return name;
    }

    /**
     * Отрисовка компоненты страницы кафе
     * @param {obj} context некоторый контекст с информацией о странице кафе
     */
    render(context) {
        let openTime = new Date(context['openTime']);
        let closeTime = new Date(context['closeTime']);

        let data = {
            name: this._cropName(context['name']),
            address: context['address'],
            description: context['description'],
            openTime: openTime.getHours()+':'+openTime.getMinutes(),
            closeTime: closeTime.getHours()+':'+closeTime.getMinutes(),
            photo: context['photo'],
        };
        this._parent.innerHTML = CafePageTemplate(data);

    }
}



