import {ajax} from '../utils/ajax';
import {authAjax} from '../utils/authAjax'
import {constants} from '../utils/constants';
import {ajaxForm} from '../utils/ajaxForm';

import {router} from '../main/main';
import {AlertWindowComponent} from '../components/AlertWindow/AlertWindow';

/** Класс модели юзера */
export default class UserModel {

    /** Инициализация модели */
    constructor() {
        this._editedAt = null;
        this._email = null;
        this._id = null;
        this._name = null;
        this._password = null;
        this._photo = null;
    }

    /**
     * Возвращает промис, который возвращает время редактирования
     * @return {Promise} промис, который возвращает время редактирования.
     */
    get editedAt() {
        return new Promise((resolve) => {
            this._checkUser(this._editedAt).then(()=>{
                resolve(this._editedAt);
            });
        });
    }

    /**
     * Возвращает промис, который возвращает email
     * @return {Promise} промис, который возвращает email.
     */
    get email() {
        return new Promise((resolve) => {
            this._checkUser(this._email).then(()=>{
                resolve(this._email);
            });
        });
    }

    /**
     * Возвращает промис, который возвращает id
     * @return {Promise} промис, который возвращает id.
     */
    get id() {
        return new Promise((resolve) => {
            this._checkUser(this._id).then(()=>{
                resolve(this._id);
            });
        });
    }

    /**
     * Возвращает промис, который возвращает name
     * @return {Promise} промис, который возвращает name.
     */
    get name() {
        return new Promise((resolve) => {
            this._checkUser(this._name).then(()=>{
                resolve(this._name);
            });
        });
    }

    /**
     * Возвращает промис, который возвращает password
     * @return {Promise} промис, который возвращает password.
     */
    get password() {
        return new Promise((resolve) => {
            this._checkUser(this._password).then(()=>{
                resolve(this._password);
            });
        });
    }

    /**
     * Возвращает промис, который возвращает photo
     * @return {Promise} промис, который возвращает photo.
     */
    get photo() {
        return new Promise((resolve) => {
            this._checkUser(this._photo).then(()=>{
                resolve(this._photo);
            });
        });
    }

    /**
     * Устанавливает значение email
     * @param {string} email
     */
    set email(email) {
        this._email = email.toString();
    }

    /**
     * Устанавливает значение name
     * @param {string} name
     */
    set name(name) {
        this._name = name.toString();
    }

    /**
     * Устанавливает значение password
     * @param {string} password
     */
    set password(password) {
        this._password = password.toString();
    }

    /**
     * Проверяет существование поля data
     * @param {string|null} data
     */
    async _checkUser(data){
        if(!data){
            await this.getOwner();
        }
    }

    /**
     * Возвращает formData из полей userModel
     * @param {obj|null} photo
     * @return {FormData} formData
     */
    async _makeFormData(photo) {
        let formData = new FormData();
        let data = {
            'name': await this.name,
            'email': await this.email,
            'password': await this.password,
        };

        if (photo) {
            formData.append('photo', photo);
        } else {
            data = {
                'name': await this.name,
                'email': await this.email,
                'password': await this.password,
                'photo': await this.photo
            }
        }

        formData.append('jsonData', JSON.stringify(data));
        return formData;
    }

    /**
     * Заполняет поля userModel
     * @param {obj} data
     */
    _filUserData(data) {
        this._editedAt = data['editedAt'];
        this._email = data['email'];
        this._id = data['id'];
        this._name = data['name'];
        this._password = data['password'];
        this._photo = data['photo']? data['photo']:'/images/userpic.png';
    }

    /** Получение информации о текущем пользователе. */
    async getOwner(){
        await ajax(constants.PATH+'/api/v1/get_current_staff/',
            'GET',
            {},
            (response) => {
                if (response.errors === null) {
                    this._filUserData(response.data);
                } else {
                    throw response.errors;
                }
            }
        );
    }

    /** Изменение информации о текущем пользователе. */
    async editOwner(photo = null){
        const formData = await this._makeFormData(photo);
        await ajaxForm(constants.PATH+'/api/v1/staff/' + await this.id,
            'PUT',
            formData,
            (response) => {
                if (response.errors === null) {
                    this._filUserData(response.data);
                } else {
                    throw response.errors;
                }
            }
        );

    }

    /** Регистрация пользователя. */
    async register() {
        sessionStorage.clear();
        await ajax(constants.PATH + '/api/v1/staff',
            'POST',
            {'name': await this.name, 'email': await this.email, 'password': await this.password, 'isOwner':true},
            (response) => {
                if (response.errors === null) {
                    router._goTo('/myCafes');
                } else {
                    throw response.errors;
                }
            });
    }

    /** Аунтификация пользователя. */
    async login() {
        sessionStorage.clear();
        await authAjax('POST',
            constants.PATH + '/api/v1/staff/login',
            {'email': await this.email, 'password': await this.password},
            (response) => {
                if (response.errors === null) {
                    console.log('replace to mycafe');
                    router._goTo('/profile')
                } else {
                    alert();
                    throw response.errors;
                }
            });
    }

    /** Добавление работника */
    async addStaff(uuid) {
        const requestUrl = '/api/v1/add_staff?uuid=' + uuid;
        await ajax(constants.PATH + requestUrl,
            'POST',
            {'name': await this.name, 'email': await this.email, 'password': await this.password},
            (response) => {
                if (response.errors === null) {
                    router._goTo('/profile');

                } else {
                    throw response.errors[0].message;
                }
            }
        );
    }

    /** Добавление QR работника */
    async addStaffQR(cafeId) {
        await ajax(constants.PATH + `/api/v1/staff/generateQr/${cafeId}`,
            'GET',
            {},
            (response) => {
                if(response.data != null){
                    if (response.errors === null) {
                        (new AlertWindowComponent( 'Покажите код сотруднику',null, response.data)).render();
                    } else {
                        throw response.errors;
                    }
                }
            }
        )
    }
}
