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
        this.context = {
            dateStart: '01.05',
            dateEnd: '03.05',
            dateCells: {
                '01.05': [
                    {
                        action:'Начислил 10 бонусов',
                        time: '13:01'
                    },
                    {
                        action:'Начислил 11 бонусов',
                        time: '14:02'
                    },
                    {
                        action:'Начислил 12 бонусов',
                        time: '15:03'
                    }
                ],
                '02.05': [
                    {
                        action:'Начислил 13 бонусов',
                        time: '13:01'
                    },
                    {
                        action:'Начислил 14 бонусов',
                        time: '14:02'
                    },
                    {
                        action:'Начислил 15 бонусов',
                        time: '15:03'
                    }
                ],
                '03.05': [
                    {
                        action:'Начислил 13 бонусов',
                        time: '13:01'
                    },
                    {
                        action:'Начислил 14 бонусов',
                        time: '14:02'
                    },
                    {
                        action:'Начислил 15 бонусов',
                        time: '15:03'
                    }
                    ,
                    {
                        action:'Снял 15 бонусов',
                        time: '16:03'
                    }
                ],
            }
        }
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
        const entriesPolyFill = (context) => Object.keys(context).map(key => [key, context[key]]);
        let dayCells = entriesPolyFill(context.dateCells);
        for(let i = 0; i < dayCells.length;i++){
            let cell = document.createElement('div');
            let cellComponent = new StaffActionsDateCell(cell);
            container.appendChild(cell);
            cellComponent.render({date:dayCells[i][0], cells: dayCells[i][1]});
        }

    }


    render() {
        this._renderTemplate(this.context);
        this.renderDateCells(this.context)
    }
}
