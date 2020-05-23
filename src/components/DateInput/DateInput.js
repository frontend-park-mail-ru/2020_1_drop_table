'use strict';
import './DateInput.scss';
import DateInputTemplate from './DateInput.hbs';

/** Компонента страницы лендинга */
export class DateInputComponent {

    /**
     * Инициализация компоненты страницы лендинга
     * @param {Element} parent элемент в котором будет располагаться компонента лендинга
     */
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    /** Отрисовка страницы лендинга */
    render() {
        this._parent.innerHTML = DateInputTemplate();
    }
}