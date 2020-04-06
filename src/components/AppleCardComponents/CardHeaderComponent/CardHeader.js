'use strict';
import CardHeader from './CardHeader.hbs';
import {HeaderFieldComponent} from "../HeaderFieldComponent/HeaderField";

/** Компонент хэдера карточки */
export class CardHeaderComponent {

    /**
     * Инициализация компонента хэдера карточки
     * @param {Element} parent элемент в кором будет размещаеться хэдер карточки
     */
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    /** Отрисовка хэдера карточки */
    render(context) {
        this._parent.innerHTML += CardHeader(context);

        let fieldsContainer = this._parent.getElementsByClassName('header-fields-container').item(0);
        fieldsContainer.innerHTML = '';
        for (let i = 1 ; i < context.headerFields.length; i++){
            (new HeaderFieldComponent(fieldsContainer)).render(context.headerFields[i]);
        }

    }
}
