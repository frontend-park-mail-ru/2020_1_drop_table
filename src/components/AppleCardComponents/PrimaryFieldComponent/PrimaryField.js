'use strict';
import PrimaryField from './PrimaryField.hbs';

/** Компонет первичного поля карточки */
export class PrimaryFieldComponent {

    /**
     * Инициализация компонента первичного поля карточки
     * @param {Element} parent элемент в кором будет размещаеться хэдер карточки
     */
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    /** Отрисовка компонента первичного поля карточки */
    render(context) {
        this._parent.innerHTML += PrimaryField(context);
    }
}
