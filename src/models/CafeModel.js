'use strict';

import {ajax} from "../utils/ajax";
import {constants} from "../utils/constants";
import {authAjax} from "../utils/authAjax";
import {CafePageComponent} from "../components/CafePageComponent/CafePage";

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

    get listId(){
        if (this._listId == null) {
            throw new Error('Invalid cafe listId');
        }
        return this._listId;
    }

    get address(){
        this._checkCafeData(this._address);
        return this._address;
    }

    get closeTime(){
        this._checkCafeData(this._closeTime);
        return this._closeTime;
    }

    get description(){
        this._checkCafeData(this._description);
        return this._description;
    }

    get id(){
        this._checkCafeData(this._id);
        return this._id;
    }

    get name(){
        this._checkCafeData(this._name);
        return this._name;
    }

    get openTime(){
        this._checkCafeData(this._openTime);
        return this._openTime;
    }

    get ownerID(){
        this._checkCafeData(this._ownerID);
        return this._ownerID;
    }

    get photo(){
        this._checkCafeData(this._photo);
        return this._photo;
    }

    set address(address){
        this._address = address;
    }

    set closeTime(closeTime){
        this._closeTime = closeTime;
    }

    set description(description){
        this._description = description;
    }

    set name(name){
        this._name = name;
    }

    set openTime(openTime){
        this._openTime = openTime;
    }

    set photo(photo){
        this._photo = photo;
    }

    _loadCafe(){
        let cafeData = sessionStorage.getItem('CafeList');
        if (cafeData) {
            cafeData = JSON.parse(cafeData)[this.listId];
            this._fillCafeData(cafeData);
        } else {
            this.getCafe();
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

    _checkCafeData(data){
        if (!data){
            this.getCafe();
        }
    }

    getCafe(){
        authAjax('GET',constants.PATH+`/api/v1/cafe/${this.id}`,
            null
            , (response) => {
                if (response.errors === null) {
                    console.log('cafe response', response); //REMOVE
                    this._fillCafeData(response);
                    this._saveCafe();
                } else {
                    alert(response.errors[0].message); //TODO showError
                }
            });
    }
}