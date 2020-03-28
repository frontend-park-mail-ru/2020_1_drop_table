'use strict';

import {ajax} from "../utils/ajax";
import {constants} from "../utils/constants";
import StaffModel from "./StaffModel";
import {Router} from "../modules/Router";
import {ajaxForm} from "../utils/ajaxForm";


export default class StaffListModel{

    constructor() {
        this._staffModelsList = [];
        const staffListData = this._loadStaffList();
        this._constructStaff(staffListData);
    }

    get context(){
        return new Promise(async (resolve) => {
            await this._checkStaffList();
            const cafeList = sessionStorage.getItem('CafeList');
            if(cafeList){
                resolve(JSON.parse(cafeList));
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
        staffListData.forEach((_, id) => {
            const staff = new StaffModel(id);
            this._staffModelsList.push(staff);
        });
    }

    createStaff(){
        return new StaffModel();
    }

    async StaffList() { //!!!
        await ajax(constants.PATH + '/api/v1/staff',
            'GET',
            {},
            (response) => {
                if(response.data == null){
                    window.location.replace('/createCafe')
                    // Router.redirect('/createCafe');
                } else {
                    if (response.errors === null) {
                        this._saveStaffList(response.data);
                        this._constructStaff(response.data);
                    } else {
                        throw response.errors;
                    }
                }
            }
        )
    }

    async create(photo, staff) { //!!!!!!!!!!
        await ajaxForm(constants.PATH + '/api/v1/staff',
            'POST',
            await staff.getFormData(photo),
            (response) => {
                if (response.errors === null) {
                    staff.listId = this._staffModelsList.length;
                    staff.fillStaffData(response.data);
                    this._staffModelsList.push(staff);
                    // Router.redirect('/myCafes');
                    window.location.replace('/myCafes')
                } else {
                    throw response.errors;
                }
            }
        );
    }
}
