'use strict';

import {ajax} from "../utils/ajax";
import {constants} from "../utils/constants";
import CafeModel from "./CafeModel";
import {ajaxForm} from "../utils/ajaxForm";

export default class CafeListModel{
    constructor() {
        this._cafeModelsList = [];
        this._loadCafeList();
    }

    _loadCafeList(){
        let cafeListData = sessionStorage.getItem('CafeList');
        if (cafeListData) {
            cafeListData = JSON.parse(cafeListData);
            this._constructCafe(cafeListData);
        }
    }

    _saveCafeList(data){
        console.log('save context');
        sessionStorage.setItem('CafeList', JSON.stringify(data));
    }

    _constructCafe(cafeListData){
        cafeListData.forEach((_, id) => {
            const cafe = new CafeModel(id);
            this._cafeModelsList.push(cafe);
        });
        console.log(this._cafeModelsList);
    }

    get context(){
        console.log('return context', JSON.parse(sessionStorage.getItem('CafeList')));
        return(JSON.parse(sessionStorage.getItem('CafeList')));
    }

    cafesList() {
        console.log('cafesList');
        return new Promise((resolve) => {
            ajax(constants.PATH + '/api/v1/cafe',
                'GET',
                {},
                (response) => {
                    if (response.errors === null) {
                        this._saveCafeList(response.data);
                        this._constructCafe(response.data);
                    } else {
                        alert(response.errors[0].message); //TODO showError
                    }
                }
            )
        });
    }
}