'use strict';

import {ajax} from '../utils/ajax';
import {constants} from '../utils/constants';
import CafeModel from './CafeModel';
import {ajaxForm} from '../utils/ajaxForm';
import {router} from '../main/main';

/** Класс модели списка кафе */
export default class LandingCafeListModel{

    /** Инициализация модели */
    constructor() {
        this._cafeModelsList = [];
        this._cafeListJson = [];
        this._currentId = 0;
        this._step = 4;
        this._limit = 8;
        this._stopUpdates = false;
    }

    async update(searchBy = null){
        await this.getAllCafes(this._cafeListJson.length, this._limit, searchBy);
    }

    clear(){
        this._cafeListJson = [];
        this._currentId = -this._step;
    }

    /**
     * Возвращает сырое представление модели
     * @return {Promise} сырое представление модели
     */
    get context(){
        return this._cafeListJson;
    }

    /**
     * Возвращает пуст или не пуст cafeModelList
     * @return {bool} пуст или не пуст cafeModelList
     */
    get isEmpty(){
        return !this._cafeModelsList.length;
    }



    /**
     * Возвращает cafe из cafeModelList, с нужным id
     * @param {int} id кафе
     * @return {CafeModel} объект CafeModel с нужным id
     */
    getCafeById(id){
        return this._cafeModelsList.find((cafe) => {
            return cafe._id == id;
        });
    }

    /** Конструирует cafeModel из cafeListJson */
    _constructCafe(){
        this._cafeListJson.forEach((cafeContext) => {
            const cafe = new CafeModel(cafeContext);
            this._cafeModelsList.push(cafe);
        });
    }

    /** Создание кафе
     * @return {CafeModel}
     */
    createCafe(){
        return new CafeModel();
    }

    async getAllCafes(since, limit, searchBy=null) {
        let request = `/api/v1/cafe/get_all?since=${since}&limit=${limit}`;
        request += searchBy ? `&searchBy=${searchBy}` : '';

        console.log(request);

        await ajax(constants.PATH + request,
            'GET',
            {},
            (response) => {
                if(response.errors === null && response.data){
                    response.data.forEach((el)=>{
                        this._cafeListJson.push(el);
                    })
                }

                if(response.errors !== null){
                    throw response.errors;
                }
            }
        )
    }
}
