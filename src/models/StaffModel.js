'use strict';

import {ajax} from "../utils/ajax";
import {constants} from "../utils/constants";
import {authAjax} from "../utils/authAjax";


export default class StaffModel { // дописать потом

    constructor(listId) {
        this._listId = listId;
        this._staffid = null;
        this._name = null;
        this._email = null;
        this.password = null; //потом убрать стоит
        this._editdat = null;
        this._photo = null;
        this._isowner = null;
        this._cafeid = null;

       // this._loadStaff();
    }

    get address(){
        return new Promise(async (resolve) => {
            await this._checkStaff(this._address);
            resolve(this._address);
        });
    }

    get closeTime(){
        return new Promise(async (resolve) => {
            await this._checkStaff(this._closeTime);
            resolve(this._closeTime);
        });
    }

    get description(){
        return new Promise(async (resolve) => {
            await this._checkStaff(this._description);
            resolve(this._description);
        });
    }

    get id(){
        return new Promise(async (resolve) => {
            await this._checkStaff(this._id);
            resolve(this._id);
        });
    }

    get name(){
        return new Promise(async (resolve) => {
            await this._checkStaff(this._name);
            resolve(this._name);
        });
    }

    get openTime(){
        return new Promise(async (resolve) => {
            await this._checkStaff(this._openTime);
            resolve(this._openTime);
        });
    }

    get ownerID(){
        return new Promise(async (resolve) => {
            await this._checkStaff(this._ownerID);
            resolve(this._ownerID);
        });
    }

    get photo(){
        return new Promise(async (resolve) => {
            await this._checkStaff(this._photo);
            resolve(this._photo);
        });
    }

    get context(){
        console.log('in context');
        let staffListData = sessionStorage.getItem('StaffList');
        const staffData = JSON.parse(staffListData)[this._listId];
        return staffData;
    }

    set listId(listId){
        this._listId = listId;
    }

    set address(address){
        this._address = address.toString();
        this._saveStaff();
    }

    set closeTime(closeTime){
        this._closeTime = closeTime.toString();
        this._saveStaff();
    }

    set description(description){
        this._description = description.toString();
        this._saveStaff();
    }

    set name(name){
        this._name = name.toString();
        this._saveStaff();
    }

    set openTime(openTime){
        this._openTime = openTime.toString();
        this._saveStaff();
    }

    set photo(photo){
        this._photo = photo.toString();
        this._saveStaff();
    }

    async _checkStaff(data){
        if(!data){
            await this.getStaff();
        }
    }

    _loadStaff(){
        console.log('load staff');
        let staffListData = sessionStorage.getItem('StaffList');
        if (staffListData && this._listId != null) {
            const staffData = JSON.parse(staffListData)[this._listId];
            if(staffData){
                this.fillStaffData(staffData);
            }
        }
    }

    _saveStaff(){

        const data = {
            'address': this._address,
            'closeTime': this._closeTime,
            'description': this._description,
            'id': this._id,
            'name': this._name,
            'openTime': this._openTime,
            'ownerID': this._ownerID,
            'photo': this._photo
        };

        let staffList = JSON.parse(sessionStorage.getItem('StaffList'));
        staffList[this._listId] = data;
        sessionStorage.setItem('StaffList', JSON.stringify(staffList));
    }

    fillStaffData(context){
        console.log('fill staffData');
        this._address = context['address'];
        this._closeTime = context['closeTime'];
        this._description = context['description'];
        this._id = context['id'];
        this._name = context['name'];
        this._openTime = context['openTime'];
        this._ownerID = context['ownerID'];
        this._photo = context['photo'];
        this._saveStaff();
    }

    async getFormData(photo){
        console.log('get FormData');
        let formData = new FormData();

        let data = {
            'name': await this.name,
            'address': await this.address,
            'description': await this.description
        };

        if (photo) {
            formData.append('photo', photo);
        } else {
            data['photo'] = await this.photo;
        }

        formData.append('jsonData', JSON.stringify(data));
        return formData;
    }

    async getStaff(){
        await authAjax('GET', constants.PATH + `/api/v1/staff/${this._id}`,
            null,
            (response) => {
                if (response.errors === null) {
                    console.log('getStaff ', response.data);
                    this.fillStaffData(response.data);
                } else {
                    throw response.errors;
                }
            }
        );
    }
}
