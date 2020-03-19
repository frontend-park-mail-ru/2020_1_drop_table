'use strict';

import {ajax} from "../utils/ajax";
import {constants} from "../utils/constants";
import CafeModel from "./CafeModel";

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
        } else {
            this.cafesList();
        }
    }

    _constructCafe(cafeListData){
        cafeListData.forEach((_, id) => {
            const cafe = new CafeModel(id);
            this._cafeModelsList.push(cafe);
        });
    }

    _saveCafeList(data){
        sessionStorage.setItem('CafeList', JSON.stringify(data));
    }

    cafesList() {
        ajax(constants.PATH + '/api/v1/cafe',
            'GET',
            {},
            (response) => {
                if (response.errors === null) {
                    console.log('KO');
                    this._saveCafeList(response.data);
                    this._constructCafe(response.data);
                } else {
                    alert(response.errors[0].message); //TODO showError
                }
            }
        )
    }
}