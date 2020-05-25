'use strict';

import {constants} from '../utils/constants';
import {authAjax} from '../utils/authAjax';
import {ajax} from '../utils/ajax';

/** Класс модели кафе */
export default class CafePreviewModel {

    /** Инициализация модели */
    constructor(context) {
        this._id = null;
        this._address = null;
        this._description = null;
        this._name = null;
        this._openTime = null;
        this._closeTime = null;
        this._ownerID = null;
        this._photo = null;
        this._location = null;
        this.fillCafeData(context);
    }

    async update(id){
        await this.getCafePreview(id);
    }

    /**
     * Возвращает адресс кафе
     * @return {string} адресс кафе
     */
    get address(){
        return this._address;
    }

    /**
     * Возвращает время закрытия кафе
     * @return {string} время закрытия кафе
     */
    get closeTime(){
        return this._closeTime;
    }

    /**
     * Возвращает описание кафе
     * @return {string} описание кафе
     */
    get description(){
        return this._description;
    }

    /**
     * Возвращает id кафе
     * @return {string} id кафе
     */
    get id(){
        return this._id;
    }

    /**
     * Возвращает название кафе
     * @return {Promise} промис, который возвращает название кафе
     */
    get name(){
        return this._name;
    }

    /**
     * Возвращает время открытия кафе
     * @return {string} время открытия кафе
     */
    get openTime(){
        return this._openTime;
    }

    /**
     * Возвращает id владельца кафе
     * @return {string} id владельца кафе
     */
    get ownerID(){
        return this._ownerID;
    }

    /**
     * Возвращает фото кафе
     * @return {string} фото кафе
     */
    get photo(){
        return this._photo;
    }

    /**
     * Возвращает сырое представление кафе
     * @return {obj} объект с полями cafeModel
     */
    get context(){
        return {
            address: this._address,
            description: this._description,
            id: this._id,
            name: this._name,
            openTime: this._openTime,
            closeTime: this._closeTime,
            ownerID: this._ownerID,
            photo: this._photo,
            location: this._location,
            passInfo: this._passInfo,
        }
    }

    /**
     * Устанавливает значение address
     * @param {string} address
     */
    set address(address){
        this._address = address.toString();
    }

    /**
     * Устанавливает значение closeTime
     * @param {string} closeTime
     */
    set closeTime(closeTime){
        this._closeTime = closeTime.toString();
    }

    /**
     * Устанавливает значение description
     * @param {string} description
     */
    set description(description){
        this._description = description.toString();
    }

    /**
     * Устанавливает значение name
     * @param {string} name
     */
    set name(name){
        this._name = name.toString();
    }

    /**
     * Устанавливает значение openTime
     * @param {string} openTime
     */
    set openTime(openTime){
        this._openTime = openTime.toString();
    }

    /**
     * Устанавливает значение photo
     * @param {string} photo
     */
    set photo(photo){
        this._photo = photo.toString();
    }

    /**
     * Заполняет поля userModel из объекта context
     * @param {obj} context
     */
    fillCafeData(context){
        console.log('fill cafe preview')
        if(context) {
            this._address = context['address'];
            this._description = context['description'];
            this._id = context['id'];
            this._name = context['name'];
            const openTime = new Date(context['openTime']);
            this._openTime =
                `${('0' + openTime.getUTCHours()).slice(-2)}:${('0' + openTime.getUTCMinutes()).slice(-2)}`;
            const closeTime = new Date(context['closeTime']);
            this._closeTime =
                `${('0' + closeTime.getUTCHours()).slice(-2)}:${('0' + closeTime.getUTCMinutes()).slice(-2)}`;
            this._photo = context['photo'];
            this._location = context['location'];
            this._passInfo = context['passInfo']
        }
    }


    async getCafePreview(id){
        console.log('get cafe preview')
        await ajax(constants.PATH + `/api/v1/cafe/with_pass/${id}`,
            'GET',
            {},
            (response) => {
                if(response.errors === null && response.data){
                    this.fillCafeData(response.data);
                }
                if(response.errors !== null){
                    throw response.errors;
                }
            }
        )
    }
}
