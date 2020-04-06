'use strict';
import SecondaryField from './SecondaryField.hbs';

/** Компонент вторичного поля карточки */
export class SecondaryFieldComponent {

    /**
     * Инициализация компонента вторичного поля карточки
     * @param {Element} parent элемент в кором будет размещаеться хэдер карточки
     */
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    /** Отрисовка компонента вторичного поля карточки */
    render(context) {
        this._parent.innerHTML += SecondaryField(context);
    }
}
