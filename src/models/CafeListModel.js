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
        this._pp = {
            firstId: 0,
            lastId: 24,
            paginationStack: 24,
            bufferSize: 6
        }
    }

    async update(type){
        if(type === 'owner'){
            await this.cafesList();
        } else {
            this._cafeListJson = await this.getAllCafes(0,24);
            this._constructCafe();
        }

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

    get ForwardPaginator(){
        async function* paginator() {
            while(true){
                while ((this._pp.lastId - this._pp.firstId)/2 >= this._pp.bufferSize){
                    yield this._cafeListJson.slice(this._pp.firstId,
                        this._pp.firstId + this._pp.paginationStack);
                    this._pp.firstId += this._pp.paginationStack;
                }

                const cafes = await this.getAllCafes(this._pp.lastId, this._pp.lastId + this._pp.bufferSize);
                this._cafeListJson.concat(cafes);
                this._constructCafe();
            }
        }

        return paginator.bind(this);
    }

    get backPaginator(){
        async function* paginator() {

            while(true){
                if(this._pp.firstId > 0){
                    yield this._cafeListJson[this.this._pp.firstId]
                    this.this._pp.firstId -= 1;
                } else {
                    return null;
                }
            }
        }

        return paginator.bind(this);
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
                    this._cafeModelsList.push(cafe);
                    this._cafeListJson.push(cafe.context);
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
                if(response.errors === null){
                    router._goTo(`/myCafes`);
                } else {
                    throw response.errors;
                }
            }
        );
    }

    async getAllCafes(since, limit) {
        await ajax(constants.PATH + `/api/v1/cafe/get_all?since=${since}&limit=${limit}`,
            'GET',
            {},
            (response) => {
                if(response.errors === null && response.data){
                    return  response.data;
                }

                if(response.errors !== null){
                    throw response.errors;
                }
            }
        )
    }
}
