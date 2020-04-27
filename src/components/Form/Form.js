'use strict';

import './Form.scss';
import './Form.color.scss';
import FormTemplate from './Form.hbs';

/** Компонент формы */
export default class FormComponent {

    /**
     * Инициализация компонента формы
     * @param {Element} parent элемент в кором будет размещаеться форма
     */
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    /**
     * Добавление листенеров на элементы
     * @param {obj} context некоторый контекст с информацией о форме
     * @private
     */
    _addListener(context){
        this._parent.addEventListener(
            context['event']['type'],
            context['event']['listener']
        );
    }

    /**
     * Отрисовка формы
     * @param {obj} context некоторый контекст с информацией о форме
     */
    render(context) {
        this._parent.innerHTML = FormTemplate(context);
        this._addListener(context);
    }
}
