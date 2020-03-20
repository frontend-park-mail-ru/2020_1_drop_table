'use strict';

import {ajax} from "../utils/ajax";
import {constants} from "../utils/constants";
import {authAjax} from "../utils/authAjax";
import {CafePageComponent} from "../components/CafePageComponent/CafePage";
import {ajaxForm} from "../utils/ajaxForm";
import {Router} from "../modules/Router";

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

    get listId(){return this._listId}
    get address(){return this._address}
    get closeTime(){return this._closeTime}
    get description(){return this._description}
    get id(){return this._id}
    get name(){return this._name}
    get openTime(){return this._openTime}
    get ownerID(){return this._ownerID}
    get photo(){return this._photo}

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

    _loadCafe(){
        let cafeListData = sessionStorage.getItem('CafeList');
        if (cafeListData) {
            const cafeData = JSON.parse(cafeListData)[this.listId];
            if(cafeData){
                this._fillCafeData(cafeData);
            }
        }
    }

    _saveCafe(){
        const data = {
            'address': this.address,
            'closeTime': this.closeTime,
            'description': this.description,
            'id': this.id,
            'name': this.name,
            'openTime': this.openTime,
            'ownerID': this.ownerID,
            'photo': this.photo
        };

        let cafeList = JSON.parse(sessionStorage.getItem('CafeList'));
        cafeList[this.listId] = data;
        sessionStorage.setItem('CafeList', JSON.stringify(cafeList));
    }

    _fillCafeData(context){
        this._address = context['address'];
        this._closeTime = context['closeTime'];
        this._description = context['description'];
        this._id = context['id'];
        this._name = context['name'];
        this._openTime = context['openTime'];
        this._ownerID = context['ownerID'];
        this._photo = context['photo'];
    }

    getFormData(photo){
        let formData = new FormData();

        let data = {
            'name': this.name,
            'address': this.address,
            'description': this.description
        };

        if (photo) {
            formData.append('photo', photo);
        } else {
            data['photo'] = this.photo;
        }

        formData.append('jsonData', JSON.stringify(data));
        return formData;
    }

    getCafe(){
        return new Promise((resolve) => {
            authAjax('GET', constants.PATH + `/api/v1/cafe/${this.id}`,
                null,
                (response) => {
                    if (response.errors === null) {
                        this._fillCafeData(response.data);
                        this._saveCafe();
                    } else {
                        alert(response.errors[0].message); //TODO showError
                    }
                });
        });
    }

    create(photo) {
        return new Promise((resolve, reject) => {
            ajaxForm(constants.PATH + '/api/v1/cafe',
                'POST',
                this.getFormData(),
                (response) => {
                    if (response.errors === null) {
                        this._fillCafeData(response.data);
                        this._saveCafe();
                        Router.redirect('/myCafe');
                        resolve();
                    } else {
                        reject(response.errors[0].message); //TODO showError
                    }
                }
            );
        });
    }
}