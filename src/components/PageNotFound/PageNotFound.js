'use strict';
import './PageNotFound.scss';
import PageNotFoundTemplate from './PageNotFound.hbs';

/** Компонента страницы лендинга */
export class PageNotFound {

    /**
     * Инициализация компоненты страницы лендинга
     * @param {Element} parent элемент в котором будет располагаться компонента лендинга
     */
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    /** Отрисовка страницы лендинга */
    render(context) {
        this._parent.innerHTML = PageNotFoundTemplate(context);

    }
}
