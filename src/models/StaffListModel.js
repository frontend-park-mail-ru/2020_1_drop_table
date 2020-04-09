'use strict';

import {ajax} from '../utils/ajax';
import {constants} from '../utils/constants';
import StaffModel from './StaffModel';
import {AlertWindowComponent} from '../components/AlertWindow/AlertWindow';

/** Модель staff 3 рк */
export default class StaffListModel{

    constructor(userModel) {
        this._userModel = userModel;
        this._staffModelsList = [];
        const staffListData = this._loadStaffList();
        this._constructStaff(staffListData);
        console.log('constructor')
    }

    get context(){
        return new Promise((resolve) => {
            this._checkStaffList().then(()=>{
                const staffList = sessionStorage.getItem('StaffList');
                if(staffList){
                    resolve(JSON.parse(staffList));
                }
                resolve(null);
            });
        });
    }

    get isEmpty(){
        return new Promise((resolve) => {
            this._checkStaffList().then(()=>{
                resolve(!this._staffModelsList.length);
            });
        });
    }

    getStaffById(id){
        return this._staffModelsList.find((staff) => {
            return staff._id == id;
        });
    }

    async _checkStaffList(data){
        if(!data){
            console.log('checkStaffList', data)

            await this.staffList();
        }
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
        // console.log('get staff ',staffListData)
        // let test = {};
        //     // Object.entries(staffListData).map((key, value) => {
        // //     if(value){
        // //         test[key] = value;
        // //     } else{
        // //         test[key] = [];
        // //     }
        // //
        // // });


    }

    createStaff(){
        return new StaffModel();
    }

    /** получение списка работников */
    async staffList() { //!!!
        console.log('in staff list')
        let id = await this._userModel.id;
        await ajax(constants.PATH + `/api/v1/staff/get_staff_list/${id}`,
            'GET',
            {},
            (response) => {

                console.log(response)
                if(response.data === null){
                    console.log('get staff error',response.data)

                } else {
                    if (response.errors === null) {
                        console.log('response cafes', response)
                        this._saveStaffList(response.data);
                        this._constructStaff(response.data);
                    } else {
                        console.log('throw error');
                        throw response.errors;
                    }
                }
            }
        )
    }

    /** создание qr работника */
    async addStaffQR() {
        let id = await this._userModel.id; // выдает null
        await ajax(constants.PATH + `/api/v1/staff/generateQr/${id}`,
            'GET',
            {},
            (response) => {
                if(response.data == null){
                    //router._goTo('/createCafe');
                } else {
                    if (response.errors === null) {
                        (new AlertWindowComponent( 'Покажите код сотруднику', response.data)).render();
                        // this._saveCafeList(response.data);
                        // this._constructCafe(response.data);
                    } else {
                        throw response.errors;
                    }
                }
            }
        )
    }
}
