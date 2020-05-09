'use strict';

import './StatisticsComponent.scss';

import StatisticsTemplate from './StatisticsComponent.hbs';
import {MultiSelectComponent} from '../MultiSelect/MultiSelect';
import {DateInputComponent} from '../DateInput/DateInput'
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

    _renderTemplate(context){
        this._parent.innerHTML = StatisticsTemplate();
    }

    _renderDateInputs(){
        let startInputDate = this._parent.
            getElementsByClassName('statistics-component__head__interval-start').item(0);
        let endInputDate = this._parent.
            getElementsByClassName('statistics-component__head__interval-end').item(0);

        (new DateInputComponent(startInputDate)).render();
        (new DateInputComponent(endInputDate)).render();
    }
    _renderSelectors(context){
        let selectorCafes = this._parent.
            getElementsByClassName('statistics-component__head__selector-cafes').item(0);
        let selectorStaff = this._parent.
            getElementsByClassName('statistics-component__head__selector-staff').item(0);
        (new MultiSelectComponent(selectorCafes, context['cafes']).render());
        (new MultiSelectComponent(selectorStaff, context['staff']).render());
    }


    render(context) {
        this._renderTemplate();
        this._renderDateInputs();
        this._renderSelectors(context['multiselects']);

    }
}
