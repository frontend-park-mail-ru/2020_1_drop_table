'use strict';
import './land.scss';
import LandingTemplate from './Landing.hbs';

/** Компонента страницы лендинга */
export class LandingComponent {

    /**
     * Инициализация компоненты страницы лендинга
     * @param {Element} parent элемент в котором будет располагаться компонента лендинга
     */
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    /** Отрисовка страницы лендинга */
    render() {
        this._parent.innerHTML = LandingTemplate();

    }
}
