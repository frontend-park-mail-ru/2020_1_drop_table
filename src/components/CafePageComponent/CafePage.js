'use strict';
import './CafePage.scss';
import './CafePage.color.scss';
import CafePageTemplate from './CafePage.hbs';


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
     * Отрисовка компоненты страницы кафе
     * @param {obj} context некоторый контекст с информацией о странице кафе
     */
    render(context) {
        let openTime = context['openTime'];
        let closeTime = context['closeTime'];
        let data = {
            name: context['name'],
            address: context['address'],
            description: context['description'],
            openTime: openTime,
            closeTime: closeTime,
            photo: context['photo'],
        };
        this._parent.innerHTML = CafePageTemplate(data);

    }
}



