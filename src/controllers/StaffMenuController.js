'use strict';


import {authAjax} from '../utils/authAjax';
import {constants} from '../utils/constants';

/** контроллер меню работников */
export default class StaffMenuController{

    /**
     * Инициализация StaffMenuController
     * @param {StaffMenuView} staffMenuView view меню работников
     */
    constructor(staffMenuView, uuid) {
        this._staffMenuView = staffMenuView;
        this._uuid = uuid;
        this._customerData = null;
    }

    /** Запуск контроллера */
    async control(){
        await this.getCustomerData();

        this._staffMenuView.render(this._customerData);
    }

    async getCustomerData(){
        await authAjax('GET', `${constants.PATH}/api/v1/customers/${this._uuid}/customer/`, null, (response) => {
            console.log('response data', response.data);
            if (response.errors === null) {
                console.log('get customer', response.data);
                this._customerData = response.data;
            } else {
                throw response.errors;
            }
        });
    }


}
