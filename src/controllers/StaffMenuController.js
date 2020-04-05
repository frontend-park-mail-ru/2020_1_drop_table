'use strict';


/** контроллер меню работников */
export default class StaffMenuController{

    /**
     * Инициализация StaffMenuController
     * @param {StaffMenuView} staffMenuView view меню работников
     */
    constructor(staffMenuView) {
        this._staffMenuView = staffMenuView;
    }

    /** Запуск контроллера */
    async control(){
        this._staffMenuView.render();
    }
}
