'use strict';

import './Input.scss';
import './Input.color.scss';
import InputTemplate from './Input.hbs';

/** Компонент формы карточки */
export default class CardFormComponent {

    /**
     * Инициализация компоненты формы карточки
     * @param {Element} parent элемент в котором будет распологаться форма
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
        if('button' in context && 'event' in context){
            const button = this._parent.getElementsByClassName('button').item(0);
            button.addEventListener(
                context['event']['type'],
                (e) => context['event']['listener'](e,context)
            );
        }
    }

    /**
     * Отрисовка формы
     * @param {obj} context некоторый контекст с информацией о форме
     */
    render(context) {
        this._parent.innerHTML = InputTemplate(context);
        this._addListener(context);
    }
}

