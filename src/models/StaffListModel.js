'use strict';

import {ajax} from "../utils/ajax";
import {constants} from "../utils/constants";
import StaffModel from "./StaffModel";
import {Router} from "../modules/Router";
import {ajaxForm} from "../utils/ajaxForm";
import {router} from "../main/main";
import {AlertWindowComponent} from "../components/AlertWindow/AlertWindow";


export default class StaffListModel{

    constructor() {
        this._ownerId = null;
        this._staffModelsList = [];
        const staffListData = this._loadStaffList();
        this._constructStaff(staffListData);
        console.log('constructor')
    }

    get context(){
        console.log('context')
        return new Promise(async (resolve) => {
            await this._checkStaffList();
            const staffList = sessionStorage.getItem('StaffList');
            if(staffList){
                resolve(JSON.parse(staffList));
            }
            resolve(null);
        });
    }

    get isEmpty(){
        return new Promise(async (resolve) => {
            await this._checkStaffList();
            resolve(!this._staffModelsList.length);
        });
    }

    getStaffById(id){
        return this._staffModelsList.find((staff) => {
            return staff._id == id;
        });
    }

    async _checkStaffList(data){
        if(!data){
            console.log('checkStaffList')
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

    _constructStaff(staffListData){
        console.log('get staff ',staffListData)

        Object.entries(staffListData).map((key, value) => {
            console.log('cafe',key);

            console.log('staff',value);
        });
        // for (let [key, value] of staffListData) {
        //     console.log('cafe', key);
        //     if(value){
        //         console.log('staff', value);
        //     }
        //
        // }
        // staffListData.forEach((_, id) => {
        //     const staff = new StaffModel(id);
        //     this._staffModelsList.push(staff);
        // });
    }

    createStaff(){
        return new StaffModel();
    }

    async staffList() { //!!!
        console.log('in staff list')
        await ajax(constants.PATH + `/api/v1/staff/get_staff_list/5`,
            'GET',
            {},
            (response) => {

                console.log(response)
                if(response.data === null){
                    console.log('get staff error',response.data)
                    //router._goTo('/createCafe');
                } else {
                    if (response.errors === null) {
                        this._saveStaffList(response.data);
                        this._constructStaff(response.data);
                    } else {
                        console.log('throw error')
                        throw response.errors;
                    }
                }
            }
        )
    }

    async addStaffQR(cafeId) {
        await ajax(constants.PATH + `/api/v1/staff/generateQr/${7}`,
            'GET',
            {},
            (response) => {
                if(response.data == null){
                    //router._goTo('/createCafe');
                } else {
                    if (response.errors === null) {
                        (new AlertWindowComponent( '', response.data)).render();
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
