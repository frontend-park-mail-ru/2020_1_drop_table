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
        this._Position = null;
        this._isOwner = null;
    }

    async update(){
        await this.getOwner();
    }

    get isOwner() {
        return this._isOwner;
    }

    get Position() {
        return this._Position;
    }

    /**
     * Возвращает время редактирования профиля
     * @return {string} время редактирования профиля.
     */
    get editedAt() {
        return this._editedAt;
    }

    /**
     * Возвращает email пользователя
     * @return {string} email пользователя.
     */
    get email() {
        return this._email;
    }

    /**
     * Возвращает id пользователя
     * @return {string} id пользователя.
     */
    get id() {
        return this._id;
    }

    /**
     * Возвращает имя пользователя
     * @return {string} имя пользователя.
     */
    get name() {
        return this._name;
    }

    /**
     * Возвращает пароль пользователя
     * @return {string} пароль пользователя.
     */
    get password() {
        return this._password;
    }

    /**
     * Возвращает фото пользователя
     * @return {obj} photo пользователя.
     */
    get photo() {
        return this._photo;
    }

    set isOwner(isOwner) {
        this._isOwner = isOwner;
    }

    set Position(Position) {
        this._Position = Position.toString();
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
     * Возвращает formData из полей userModel
     * @param {obj|null} photo
     * @return {FormData} formData
     */
    _makeFormData(photo) {
        let formData = new FormData();
        let data = {
            'name': this.name,
            'email': this.email,
            'Position': this.Position,
        };
        if (photo) {
            formData.append('photo', photo);
        } else {
            console.log('else in fd');
            data = {
                'name': this.name,
                'email': this.email,
                'photo': this.photo,
                'Position': this.Position,
            };
            console.log('else in fd', data);

        }
        console.log('append data',JSON.stringify(data));
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
        this._Position = data['Position'];
        this._isOwner = data['isOwner'];
        this._photo = data['photo']? data['photo']:'/images/userpic.png';

    }

    /** Получение информации о текущем пользователе. */
    async getOwner(){
        await ajax(constants.PATH_STAFF+'/api/v1/get_current_staff/',
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
        const formData = this._makeFormData(photo);

        await ajaxForm(constants.PATH_STAFF+'/api/v1/staff/' + this.id,
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
        await ajax(constants.PATH_STAFF + '/api/v1/staff',
            'POST',
            {'name': this.name,
                'email': this.email,
                'password': this.password,
                'isOwner': true,
                'Position': 'Владелец'
            },
            (response) => {

                if (response.errors === null){
                    this.password = '';
                    router._goTo('/myCafes');
                } else {
                    throw response.errors;
                }
            });
    }

    /** Деаунтификация пользователя. */
    async logout() {
        await authAjax('POST',
            constants.PATH_STAFF + '/api/v1/staff/logout',
            {},
            (response) => {
                if (response.errors === null){
                    router._goTo('/login');
                } else {
                    throw response.errors;
                }
            });
    }

    /** Аунтификация пользователя. */
    async login() {
        await authAjax('POST',
            constants.PATH_STAFF + '/api/v1/staff/login',
            {'email': this.email, 'password': this.password},
            (response) => {
                if (response.errors === null){
                    this.password = '';
                    router._goTo('/profile');
                } else {
                    throw response.errors;
                }
            });
    }

    /** Добавление работника */
    async addStaff(uuid,position) {
        const requestUrl = `/api/v1/add_staff?uuid=${uuid}&position=${position}` ;
        await ajax(constants.PATH_STAFF + requestUrl,
            'POST',
            {'name': this.name, 'email': this.email, 'password': this.password},
            (response) => {
                if (response.errors === null){
                    router._goTo('/profile');
                } else {
                    throw response.errors;
                }
            }
        );
    }
    /** Удаление работника */
    async fireStaff(id) {
        const requestUrl = `/api/v1/staff/delete_staff/${id}`;
        await ajax(constants.PATH_STAFF + requestUrl,
            'POST',
            null,
            (response) => {
                if (response.errors === null){
                    router._goTo('/staff');
                } else {
                    throw response.errors;
                }
            }
        );
    }

    /** Удаление работника */
    async changeStaffPosition(id, position) {

        const requestUrl = `/api/v1/staff/update_position/${id}`;
        await authAjax('POST',constants.PATH_STAFF + requestUrl,
            {'position':position},
            (response) => {
                if (response.errors === null){
                    router._goTo('/staff');
                } else {
                    throw response.errors;
                }
            }
        );
    }

    /** Добавление QR работника */
    async addStaffQR() {
        const positionInput = document.
            getElementsByClassName('input-alert-window-container__window__field_input').item(0);
        if(positionInput.value) {
            await ajax(constants.PATH_STAFF + `/api/v1/staff/generateQr/${this.cafeid}?position=${positionInput.value}`,
                'GET',
                {},
                (response) => {
                    if (response.data != null) {
                        if (response.errors === null) {
                            (new AlertWindowComponent('Покажите код сотруднику', null, response.data)).render();
                        } else {
                            throw response.errors;
                        }
                    }
                }
            )
        }
    }
}
