'use strict';

import './StatisticsComponent.scss';

import StatisticsTemplate from './StatisticsComponent.hbs';

/** Компонент графика */
export default class StatisticsComponent {

    /**
     * Инициализация компоненты статистики
     * @param {Element}
     */
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    /**
     * Добавление листенеров на элементы
     * @param {obj} context некоторый контекст с информацией о форме
     * @private
     */
    _addListener(){

    }

    _checkContext(){
    }

    _renderTemplate(){
        this._parent.innerHTML = StatisticsTemplate();
    }


    render(context) {
        console.log('2', context)
        this._renderTemplate();

    }
}
