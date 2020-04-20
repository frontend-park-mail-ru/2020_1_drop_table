'use strict';

import {ajax} from '../utils/ajax';
import {constants} from '../utils/constants';
import CafeModel from './CafeModel';
import {ajaxForm} from '../utils/ajaxForm';
import {router} from '../main/main';

/** Класс модели списка кафе */
export default class CafeListModel{

    /** Инициализация модели */
    constructor() {
        this._cafeModelsList = [];
        this._cafeListJson = [];
    }

    async update(){
        await this.cafesList();
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

    /** Получение списка кафе */
    async cafesList() {
        await ajax(constants.PATH + '/api/v1/cafe',
            'GET',
            {},
            (response) => {
                if(response.errors === null && response.data){
                    this._cafeListJson = response.data;
                    this._constructCafe();
                }

                if(response.errors !== null){
                    throw response.errors;
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
                if(response.errors === null){
                    cafe.fillCafeData(response.data);
                }

                if(response.errors === null || response.errors.some((err) => {
                    return err.message === 'offline'
                })){
                    this._cafeModelsList.push(cafe);
                    this._cafeListJson.push(cafe.context);
                    router._goTo('/myCafes');
                }

                if(response.errors !== null){
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
                if(response.errors === null || response.errors.some((err) => {
                    return err.message === 'offline'
                })){
                    router._goTo(`/myCafes`);
                }

                if(response.errors !== null){
                    throw response.errors;
                }
            }
        );
    }
}
