'use strict';

import {ajax} from "../utils/ajax";
import {constants} from "../utils/constants";
import CafeModel from "./CafeModel";

export default class CafeListModel{

    constructor() {
        this._cafeModelsList = [];
        const cafeListData = this._loadCafeList();
        this._constructCafe(cafeListData);
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

    get context(){
        const cafeList = sessionStorage.getItem('CafeList');
        if(cafeList){
            return(JSON.parse(cafeList));
        }
        return [];
    }

    get isEmpty(){
        return !this._cafeModelsList.length
    }

    createCafe(){
        let cafeListData = this._loadCafeList();
        cafeListData.push({});
        const cafe = new CafeModel(this._cafeModelsList.length);
        this._cafeModelsList.push(cafe);
        return cafe;
    }

    cafesList() {
        return new Promise((resolve, reject) => {
            ajax(constants.PATH + '/api/v1/cafe',
                'GET',
                {},
                (response) => {
                    if(response.data == null){ //TODO fix in back
                        response.data = [];
                    }

                    if (response.errors === null) {
                        this._saveCafeList(response.data);
                        this._constructCafe(response.data);
                        resolve();
                    } else {
                        reject(response.errors[0].message); //TODO showError
                    }
                }
            )
        });
    }
}