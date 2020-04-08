'use strict';
import HeaderField from './HeaderField.hbs';

/** Компонент поля хэдера карточки */
export class HeaderFieldComponent {

    /**
     * Инициализация компонента поля хэдера карточки
     * @param {Element} parent элемент в кором будет размещаеться хэдер карточки
     */
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    /** Отрисовка поля хэдера карточки */
    render(context) {
        this._parent.innerHTML += HeaderField(context);
    }
}
