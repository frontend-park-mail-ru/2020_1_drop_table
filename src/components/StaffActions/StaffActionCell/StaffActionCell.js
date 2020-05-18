'use strict';

import StaffActionCellTemplate from './StaffActionCell.hbs'


export default class StaffActionCellComponent {

    constructor(parent) {
        this._parent = parent;
    }


    _renderTemplate(context){
        this._parent.innerHTML = StaffActionCellTemplate({action:context.action, time:context.time});
    }


    render(context) {
        this._renderTemplate(context);

    }
}
