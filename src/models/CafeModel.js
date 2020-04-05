'use strict';

import {ajax} from "../utils/ajax";
import {constants} from "../utils/constants";
import {authAjax} from "../utils/authAjax";
import {CafePageComponent} from "../components/CafePageComponent/CafePage";
import {ajaxForm} from "../utils/ajaxForm";
import {AlertWindowComponent} from "../components/AlertWindow/AlertWindow";
// import {Router} from "../modules/Router";

export default class CafeModel {

    constructor(listId) {
        this._listId = listId;
        this._id = null;
        this._address = null;
        this._closeTime = null;
        this._description = null;
        this._name = null;
        this._openTime = null;
        this._ownerID = null;
        this._photo = null;

        this._loadCafe();
    }

    get address(){
        return new Promise(async (resolve) => {
            await this._checkCafe(this._address);
            resolve(this._address);
        });
    }

    get closeTime(){
        return new Promise(async (resolve) => {
            await this._checkCafe(this._closeTime);
            resolve(this._closeTime);
        });
    }

    get description(){
        return new Promise(async (resolve) => {
            await this._checkCafe(this._description);
            resolve(this._description);
        });
    }

    get id(){
        return new Promise(async (resolve) => {
            await this._checkCafe(this._id);
            resolve(this._id);
        });
    }

    get name(){
        return new Promise(async (resolve) => {
            await this._checkCafe(this._name);
            resolve(this._name);
        });
    }

    get openTime(){
        return new Promise(async (resolve) => {
            await this._checkCafe(this._openTime);
            resolve(this._openTime);
        });
    }

    get ownerID(){
        return new Promise(async (resolve) => {
            await this._checkCafe(this._ownerID);
            resolve(this._ownerID);
        });
    }

    get photo(){
        return new Promise(async (resolve) => {
            await this._checkCafe(this._photo);
            resolve(this._photo);
        });
    }

    get context(){
        let cafeListData = sessionStorage.getItem('CafeList');
        const cafeData = JSON.parse(cafeListData)[this._listId];
        return cafeData;
    }

    set listId(listId){
        this._listId = listId;
    }

    set address(address){
        this._address = address.toString();
        this._saveCafe();
    }

    set closeTime(closeTime){
        this._closeTime = closeTime.toString();
        this._saveCafe();
    }

    set description(description){
        this._description = description.toString();
        this._saveCafe();
    }

    set name(name){
        this._name = name.toString();
        this._saveCafe();
    }

    set openTime(openTime){
        this._openTime = openTime.toString();
        this._saveCafe();
    }

    set photo(photo){
        this._photo = photo.toString();
        this._saveCafe();
    }

    async _checkCafe(data){
        if(!data){
            await this.getCafe();
        }
    }

    _loadCafe(){
        let cafeListData = sessionStorage.getItem('CafeList');
        if (cafeListData && this._listId != null) {
            const cafeData = JSON.parse(cafeListData)[this._listId];
            if(cafeData){
                this.fillCafeData(cafeData);
            }
        }
    }

    _saveCafe(){
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

        let cafeList = JSON.parse(sessionStorage.getItem('CafeList'));
        cafeList[this._listId] = data;
        sessionStorage.setItem('CafeList', JSON.stringify(cafeList));
    }

    fillCafeData(context){
        this._address = context['address'];
        this._closeTime = context['closeTime'];
        this._description = context['description'];
        this._id = context['id'];
        this._name = context['name'];
        this._openTime = context['openTime'];
        this._ownerID = context['ownerID'];
        this._photo = context['photo'];
        this._saveCafe();
    }

    async getFormData(photo){
        let formData = new FormData();
        let data = {
            'name': await this.name,
            'CafeName': await this.name,
            'address': await this.address,
            'description': await this.description,
        };

        if (photo) {
            formData.append('photo', photo);
        } else {
            data['photo'] = await this.photo;
            console.log(data['photo']);
        }

        formData.append('jsonData', JSON.stringify(data));
        return formData;
    }





    async getCafe(){
        await authAjax('GET', constants.PATH + `/api/v1/cafe/${this._id}`,
            null,
            (response) => {
                if (response.errors === null) {
                    this.fillCafeData(response.data);
                } else {
                    throw response.errors;
                }
            }
        );
    }


}
