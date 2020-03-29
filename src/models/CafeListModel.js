'use strict';

import {ajax} from "../utils/ajax";
import {constants} from "../utils/constants";
import CafeModel from "./CafeModel";
import {Router} from "../modules/Router";
import {ajaxForm} from "../utils/ajaxForm";
import {router} from "../main/main";

export default class CafeListModel{

    constructor() {
        this._cafeModelsList = [];
        const cafeListData = this._loadCafeList();
        this._constructCafe(cafeListData);
    }

    get context(){
        return new Promise(async (resolve) => {
            await this._checkCafeList();
            const cafeList = sessionStorage.getItem('CafeList');
            if(cafeList){
                resolve(JSON.parse(cafeList));
            }
            resolve(null);
        });
    }

    get isEmpty(){
        return new Promise(async (resolve) => {
            await this._checkCafeList();
            resolve(!this._cafeModelsList.length);
        });
    }

    getCafeById(id){
        return this._cafeModelsList.find((cafe) => {
            return cafe._id == id;
        });
    }

    async _checkCafeList(data){
        if(!data){
            await this.cafesList();
        }
    }

    _loadCafeList(){
        let cafeListData = sessionStorage.getItem('CafeList');
        if (cafeListData) {
            cafeListData = JSON.parse(cafeListData);
            return cafeListData;
        } else {
            this._saveCafeList([]);
            return [];
        }
    }

    _saveCafeList(data){
        sessionStorage.setItem('CafeList', JSON.stringify(data));
    }

    _constructCafe(cafeListData){
        cafeListData.forEach((_, id) => {
            const cafe = new CafeModel(id);
            this._cafeModelsList.push(cafe);
        });
    }

    createCafe(){
        return new CafeModel();
    }

    async cafesList() {
        await ajax(constants.PATH + '/api/v1/cafe',
            'GET',
            {},
            (response) => {
                if(response.data == null){
                    //router._goTo('/createCafe');
                } else {
                    if (response.errors === null) {
                        this._saveCafeList(response.data);
                        this._constructCafe(response.data);
                    } else {
                        throw response.errors;
                    }
                }
            }
        )
    }

    async create(photo, cafe) {
        await ajaxForm(constants.PATH + '/api/v1/cafe',
            'POST',
            await cafe.getFormData(photo),
            (response) => {
                if (response.errors === null) {
                    cafe.listId = this._cafeModelsList.length;
                    cafe.fillCafeData(response.data);
                    this._cafeModelsList.push(cafe);
                    router._goTo('/myCafes');
                } else {
                    throw response.errors;
                }
            }
        );
    }
}
