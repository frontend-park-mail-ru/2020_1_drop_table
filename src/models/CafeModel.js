'use strict';

import {ajax} from '../utils/ajax';
import {constants} from '../utils/constants';
import {authAjax} from '../utils/authAjax';
import {CafePageComponent} from '../components/CafePageComponent/CafePage';
import {ajaxForm} from '../utils/ajaxForm';
import {AlertWindowComponent} from '../components/AlertWindow/AlertWindow';
// import {Router} from "../modules/Router";

/** Класс модели кафе */
export default class CafeModel {

    /** Инициализация модели */
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

    /**
     * Возвращает промис, который возвращает адресс кафе
     * @return {Promise} промис, который возвращает адресс кафе
     */
    get address(){
        return new Promise(async (resolve) => {
            await this._checkCafe(this._address);
            resolve(this._address);
        });
    }

    /**
     * Возвращает промис, который возвращает время закрытия кафе
     * @return {Promise} промис, который возвращает время закрытия кафе
     */
    get closeTime(){
        return new Promise(async (resolve) => {
            await this._checkCafe(this._closeTime);
            resolve(this._closeTime);
        });
    }

    /**
     * Возвращает промис, который возвращает описание кафе
     * @return {Promise} промис, который возвращает описание кафе
     */
    get description(){
        return new Promise(async (resolve) => {
            await this._checkCafe(this._description);
            resolve(this._description);
        });
    }

    /**
     * Возвращает промис, который возвращает id кафе
     * @return {Promise} промис, который возвращает id кафе
     */
    get id(){
        return new Promise(async (resolve) => {
            await this._checkCafe(this._id);
            resolve(this._id);
        });
    }

    /**
     * Возвращает промис, который возвращает название кафе
     * @return {Promise} промис, который возвращает название кафе
     */
    get name(){
        return new Promise(async (resolve) => {
            await this._checkCafe(this._name);
            resolve(this._name);
        });
    }

    /**
     * Возвращает промис, который возвращает время открытия кафе
     * @return {Promise} промис, который возвращает время открытия кафе
     */
    get openTime(){
        return new Promise(async (resolve) => {
            await this._checkCafe(this._openTime);
            resolve(this._openTime);
        });
    }

    /**
     * Возвращает промис, который возвращает id владельца кафе
     * @return {Promise} промис, который возвращает id владельца кафе
     */
    get ownerID(){
        return new Promise(async (resolve) => {
            await this._checkCafe(this._ownerID);
            resolve(this._ownerID);
        });
    }

    /**
     * Возвращает промис, который возвращает фото кафе
     * @return {Promise} промис, который возвращает фото кафе
     */
    get photo(){
        return new Promise(async (resolve) => {
            await this._checkCafe(this._photo);
            resolve(this._photo);
        });
    }

    /**
     * Возвращает сырое представление кафе
     * @return {obj} объект с полями cafeModel
     */
    get context(){
        let cafeListData = sessionStorage.getItem('CafeList');
        const cafeData = JSON.parse(cafeListData)[this._listId];
        return cafeData;
    }

    /**
     * Устанавливает значение listId
     * @param {int} listId
     */
    set listId(listId){
        this._listId = listId;
    }

    /**
     * Устанавливает значение address
     * @param {string} address
     */
    set address(address){
        this._address = address.toString();
        this._saveCafe();
    }

    /**
     * Устанавливает значение closeTime
     * @param {string} closeTime
     */
    set closeTime(closeTime){
        this._closeTime = closeTime.toString();
        this._saveCafe();
    }

    /**
     * Устанавливает значение description
     * @param {string} description
     */
    set description(description){
        this._description = description.toString();
        this._saveCafe();
    }

    /**
     * Устанавливает значение name
     * @param {string} name
     */
    set name(name){
        this._name = name.toString();
        this._saveCafe();
    }

    /**
     * Устанавливает значение openTime
     * @param {string} openTime
     */
    set openTime(openTime){
        this._openTime = openTime.toString();
        this._saveCafe();
    }

    /**
     * Устанавливает значение photo
     * @param {string} photo
     */
    set photo(photo){
        this._photo = photo.toString();
        this._saveCafe();
    }

    /**
     * Проверяет существование поля data
     * @param {string|null} data
     */
    async _checkCafe(data){
        if(!data){
            await this.getCafe();
        }
    }

    /** Заполняет поля cafeModel из sessionStorage */
    _loadCafe(){
        let cafeListData = sessionStorage.getItem('CafeList');
        if (cafeListData && this._listId != null) {
            const cafeData = JSON.parse(cafeListData)[this._listId];
            if(cafeData){
                this.fillCafeData(cafeData);
            }
        }
    }

    /** Сохраняет поля cafeModel в sessionStorage */
    _saveCafe(){
        const data = {
            'address': this._address,
            'closeTime': this._closeTime,
            'description': this._description,
            'id': this._id,
            'name': this._name,
            'openTime': this._openTime,
            'ownerID': this._ownerID,
            'photo': this._photo
        };

        let cafeList = JSON.parse(sessionStorage.getItem('CafeList'));
        cafeList[this._listId] = data;
        sessionStorage.setItem('CafeList', JSON.stringify(cafeList));
    }

    /**
     * Заполняет поля userModel из объекта context
     * @param {obj} context
     */
    fillCafeData(context){
        this._address = context['address'];
        this._closeTime = context['closeTime'];
        this._description = context['description'];
        this._id = context['id'];
        this._name = context['name'];
        this._openTime = context['openTime'];
        this._ownerID = context['ownerID'];
        this._photo = context['photo'];
        this._saveCafe();
    }

    /**
     * Возвращает formData из полей cafeModel
     * @param {obj|null} photo
     * @return {FormData} formData
     */
    async getFormData(photo){
        let formData = new FormData();
        let data = {
            'name': await this.name,
            'CafeName': await this.name,
            'address': await this.address,
            'description': await this.description,
        };

        if (photo) {
            formData.append('photo', photo);
        } else {
            data['photo'] = await this.photo;
            console.log(data['photo']);
        }

        formData.append('jsonData', JSON.stringify(data));
        return formData;
    }

    /** Получение информации о кафе по его id */
    async getCafe(){
        await authAjax('GET', constants.PATH + `/api/v1/cafe/${this._id}`,
            null,
            (response) => {
                if (response.errors === null) {
                    this.fillCafeData(response.data);
                } else {
                    throw response.errors;
                }
            }
        );
    }
}
