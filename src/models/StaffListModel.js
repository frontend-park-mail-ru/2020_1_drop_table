'use strict';

import {ajax} from '../utils/ajax';
import {constants} from '../utils/constants';
import StaffModel from './StaffModel';
import {AlertWindowComponent} from '../components/AlertWindow/AlertWindow';
import {router} from '../main/main';


/** Модель staff 3 рк */
export default class StaffListModel{

    constructor(userModel) {
        this._userModel = userModel;
        this._staffModelsList = [];
        const staffListData = this._loadStaffList();
        this._constructStaff(staffListData);
    }

    async update(){
        await this._userModel.update();
        await this.staffList();
    }

    get context(){
        const staffList = sessionStorage.getItem('StaffList');
        if(staffList){
            return(JSON.parse(staffList));
        }
        return null;
    }

    get isEmpty(){
        return !this._staffModelsList.length;
    }

    getStaffById(id){
        return this._staffModelsList.find((staff) => {
            return staff._StaffId == id;
        });
    }

    _loadStaffList(){
        let staffListData = sessionStorage.getItem('StaffList');
        if (staffListData) {
            staffListData = JSON.parse(staffListData);
            return staffListData;
        } else {
            this._saveStaffList([]);
            return [];
        }
    }

    _saveStaffList(data){
        sessionStorage.setItem('StaffList', JSON.stringify(data));
    }

    _constructStaff(staffListData){ //todo создавать сотрудников
        for (let [key, value] of Object.entries(staffListData)) {
            console.log('test1', value)
            if(value) {
                value.forEach((staffVal) => {
                    const staff = new StaffModel(staffVal);
                    this._staffModelsList.push(staff);
                });
            }
        }
    }

    createStaff(){
        return new StaffModel();
    }

    /** получение списка работников */
    async staffList() { //!!!
        await ajax(constants.PATH + `/api/v1/staff/get_staff_list/${this._userModel.id}`,
            'GET',
            {},
            (response) => {
                if (response.errors === null) {
                    this._saveStaffList(response.data);
                    this._constructStaff(response.data);
                } else {
                    throw response.errors;
                }
            }
        )
    }

    /** Добавление QR работника */
    async addStaffQR() {
        const positionInput = document.
            getElementsByClassName('input-alert-window-container__window__field_input').item(0);
        if(positionInput.value) {
            await ajax(constants.PATH + `/api/v1/staff/generateQr/${this.cafeid}?position=${positionInput.value}`,
                'GET',
                {},
                (response) => {
                    if (response.data != null) {
                        if (response.errors === null) {
                            (new AlertWindowComponent('Покажите код сотруднику', null, response.data)).render();
                        } else {
                            throw response.errors;
                        }
                    }
                }
            )
        }
    }



}
