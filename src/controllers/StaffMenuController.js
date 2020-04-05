'use strict';



export default class StaffMenuController{

    constructor(staffMenuView) {
    this._staffMenuView = staffMenuView;
    }


    async control(){

        this._staffMenuView.render();
    }
}
