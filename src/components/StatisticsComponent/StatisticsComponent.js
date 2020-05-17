'use strict';

import './StatisticsComponent.scss';

import StatisticsTemplate from './StatisticsComponent.hbs';
import {MultiSelectComponent} from '../MultiSelect/MultiSelect';
import {DateInputComponent} from '../DateInput/DateInput'
import LinePlot from '../LinePlot/LinePlot';
/** Компонент графика */
export default class StatisticsComponent {

    /**
     * Инициализация компоненты статистики
     * @param {Element}
     */
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }


    _renderTemplate(){
        console.log('render stat template')
        this._parent.innerHTML = StatisticsTemplate();
    }

    _renderDateInputs(){
        let startInputDate = this._parent.
            getElementsByClassName('statistics-component__head__interval-start').item(0);
        let endInputDate = this._parent.
            getElementsByClassName('statistics-component__head__interval-end').item(0);

        (new DateInputComponent(startInputDate)).render({text: ''});
        (new DateInputComponent(endInputDate)).render({text: ''});
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
