'use strict';

import {ajax} from '../utils/ajax';
import {constants} from '../utils/constants';
import CafeModel from './CafeModel';
import {ajaxForm} from '../utils/ajaxForm';
import {router} from '../main/main';
import {authAjax} from '../utils/authAjax';

/** Класс модели списка кафе */
export default class CafeListModel{

    /** Инициализация модели */
    constructor() {
        this._cafeModelsList = [];
        const cafeListData = this._loadCafeList();
        this._constructCafe(cafeListData);
    }

    /**
     * Возвращает промис, который возвращает сырое представление модели
     * @return {Promise} промис, который возвращает сырое представление модели
     */
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

    /**
     * Возвращает промис, который возвращает пуст или не пуст cafeModelList
     * @return {Promise} промис, который возвращает пуст или не пуст cafeModelList
     */
    get isEmpty(){
        return new Promise(async (resolve) => {
            await this._checkCafeList();
            resolve(!this._cafeModelsList.length);
        });
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

    /**
     * Проверяет существование поля data
     * @param {string|null} data
     */
    async _checkCafeList(data){
        if(!data){
            await this.cafesList();
        }
    }

    /** Заполняет поля cafeModelList из sessionStorage
     * @return {Array} Возвращает список кафе из CafelListModel
     */
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

    /**
     * Сохраняет поля cafeListModel в sessionStorage
     * @param {obj} data объект для сохранения
     */
    _saveCafeList(data){
        sessionStorage.setItem('CafeList', JSON.stringify(data));
    }

    /** Конструирует cafeModel из  cafeListData
     * @param {Array} cafeListData сырое представление списка кафе
     */
    _constructCafe(cafeListData){
        cafeListData.forEach((_, id) => {
            const cafe = new CafeModel(id);
            this._cafeModelsList.push(cafe);
        });
    }

    /** Создание кафе
     * @return {CafeModel}
     */
    createCafe(){
        return new CafeModel();
    }

    /** Получение списка кафе */
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

    /** Создание кафе */
    async create(photo, cafe) {
        await ajaxForm(constants.PATH + '/api/v1/cafe',
            'POST',
            await cafe.getFormData(photo),
            (response) => {
                if (response.errors === null) {
                    console.log('test error', cafe.getFormData(photo))
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

    /** Изменение кафе */
    async editCafe(photo, cafe, id){
        await ajaxForm(constants.PATH + `/api/v1/cafe/${id}`,
            'PUT',
            await cafe.getFormData(photo),
            (response) => {
                if (response.errors === null) {
                    router._goTo(`/myCafes`);
                } else {
                    throw response.errors;
                }
            }
        );
    }
}
