'use strict';

import './StaffActions.scss';

import StaffActionsTemplate from './StaffActions.hbs';
import StaffActionsDateCell from './StaffActionsDateCell/StaffActionsDate'



export default class StaffActionsComponent {

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

    _renderTemplate(context){
        this._parent.innerHTML = StaffActionsTemplate({
            d1:context.dateStart.split('.')[0],
            m1:context.dateStart.split('.')[1],
            d2:context.dateEnd.split('.')[0],
            m2:context.dateEnd.split('.')[1],
        });
    }
    renderDateCells(context){
        let container = this._parent.getElementsByClassName('staff-actions-container__actions').item(0);
        container.innerHTML ='';
        const entriesPolyFill = (context) => Object.keys(context).map(key => [key, context[key]]);
        let dayCells = entriesPolyFill(context.dateCells);
        for(let i = 0; i < dayCells.length;i++){
            let cell = document.createElement('div');
            let cellComponent = new StaffActionsDateCell(cell);
            container.appendChild(cell);
            cellComponent.render({date:dayCells[i][0], cells: dayCells[i][1]});
        }

    }


    render(context) {
        this._renderTemplate(context);
        this.renderDateCells(context)
    }
}
