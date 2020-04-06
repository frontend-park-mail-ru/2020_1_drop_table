'use strict';
import AuxiliaryField from './AuxiliaryField.hbs';

/** Компонент вспомогательного поля карточки */
export class AuxiliaryFieldComponent {

    /**
     * Инициализация компонента вспомогательного поля карточки
     * @param {Element} parent элемент в кором будет размещаеться вспомогательное поле карточки
     */
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    /** Отрисовка вспомогательного поля карточки */
    render(context) {
        this._parent.innerHTML += AuxiliaryField(context);
    }
}
