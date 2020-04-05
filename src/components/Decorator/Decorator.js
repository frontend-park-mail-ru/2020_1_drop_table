'use strict';

import './Decorator.css';
import DecoratorTemplate from './Decorator.hbs';

/** Компонент декоратора страницы*/
export default class DecoratorComponent {

    /**
     * Инициализация декоратора страницы
     * @param {Element} parent элемент в котором будет распологаться декоратор
     */
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    /**
     * Отрисовка декоратора
     * @param {obj} context некоторый контекст с информацией о форме
     */
    render(context) {
        this._parent.innerHTML = DecoratorTemplate(context);
    }
}
