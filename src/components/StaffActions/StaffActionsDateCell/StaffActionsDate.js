'use strict';

import StaffActionsDateCellTemplate from './StaffActionsDateCell.hbs'
import StaffActionCell from '../StaffActionCell/StaffActionCell'


export default class StaffActionsDateCellComponent {

    /**
     * Инициализация компоненты статистики
     * @param {Element}
     */
    constructor(parent) {
        this._parent = parent;
    }

    _renderTemplate(context){
        this._parent.innerHTML = StaffActionsDateCellTemplate({date:context.date});
    }
    renderCells(context){
        for(let i = 0; i < context.cells.length;i++){
            let container = document.createElement('div');
            let cell = new StaffActionCell(container);
            this._parent.appendChild(container);
            cell.render({action:context.cells[i].action,time:context.cells[i].time });
        }

    }


    /**
     * Добавление листенеров на элементы
     * @param {date:'', cells:[{}...]}
     * @private
     */
    render(context) {
        this._renderTemplate(context);
        this.renderCells(context)

    }
}
