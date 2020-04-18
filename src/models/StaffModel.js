'use strict';

import {constants} from '../utils/constants';
import {authAjax} from '../utils/authAjax';

/** Класс модели рабочего 3 рк*/
export default class StaffModel { // дописать потом

    constructor(staff) {

        this._StaffId = staff.StaffId;
        this._StaffName = staff.StaffName;
        this._Position = staff.Position;
        this._CafeId = staff.CafeId;
        this._Photo = staff.Photo? staff.Photo : '/images/userpic.png';
        //this._loadStaff();
    }

    get StaffId(){
        return new Promise((resolve) => {
            this._checkStaff(this._StaffId).then(()=>{
                resolve(this._StaffId);
            });
        });
    }

    get StaffName(){
        return new Promise((resolve) => {
            this._checkStaff(this._StaffName).then(()=>{
                resolve(this._StaffName);
            });
        });
    }

    get Position(){
        return new Promise((resolve) => {
            this._checkStaff(this._Position).then(()=>{
                resolve(this._Position);
            });
        });
    }

    get CafeId(){
        return new Promise((resolve) => {
            this._checkStaff(this._CafeId).then(()=>{
                resolve(this._CafeId);
            });
        });
    }

    get CafeName(){
        return new Promise((resolve) => {
            this._checkStaff(this._CafeName).then(()=>{
                resolve(this._CafeName);
            });
        });
    }

    get Photo(){
        return new Promise((resolve) => {
            this._checkStaff(this._Photo).then(()=>{
                resolve(this._Photo);
            });
        });
    }



    get context(){
        let staffListData = sessionStorage.getItem('StaffList');
        const staffData = JSON.parse(staffListData)[this._listId];
        return staffData;
    }

    set listId(listId){
        this._listId = listId;
    }

    set StaffId(StaffId){
        this._StaffId = StaffId.toString();
        this._saveStaff();
    }

    set StaffName(StaffName){
        this._StaffName = StaffName.toString();
        this._saveStaff();
    }

    set Position(Position){
        this._Position = Position.toString();
        this._saveStaff();
    }

    set CafeId(CafeId){
        this._CafeId = CafeId.toString();
        this._saveStaff();
    }

    set CafeName(CafeName){
        this._CafeName = CafeName.toString();
        this._saveStaff();
    }

    set Photo(Photo){
        this._Photo = Photo.toString();
        this._saveStaff();
    }


    async _checkStaff(data){
        if(!data){
            await this.getStaff();
        }
    }

    _loadStaff(){
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
            'StaffId': this._StaffId,
            'StaffName': this._StaffName,
            'Position': this._Position,
            'CafeId': this._CafeId,
            'CafeName': this._CafeName,
            'Photo': this._Photo,
        };

        let staffList = JSON.parse(sessionStorage.getItem('StaffList'));
        staffList[this._listId] = data;
        sessionStorage.setItem('StaffList', JSON.stringify(staffList));
    }

    fillStaffData(context){
        this._StaffId = context['StaffId'];
        this._StaffName = context['StaffName'];
        this._Position = context['Position'];
        this._CafeId = context['CafeId'];
        this._CafeName = context['CafeName'];
        this._Photo = context['Photo'];
        this._saveStaff();
    }



    /** Получение работника */
    async getStaff(){
        await authAjax('GET', constants.PATH + `/api/v1/staff/${this._StaffId}`,
            null,
            (response) => {
                if (response.errors === null) {

                    this.fillStaffData(response.data);
                } else {
                    throw response.errors;
                }
            }
        );
    }
}
