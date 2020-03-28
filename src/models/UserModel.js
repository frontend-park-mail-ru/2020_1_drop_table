import {ajax} from '../utils/ajax';
import {authAjax} from '../utils/authAjax'
import {constants} from "../utils/constants";
import Router from "../modules/Router";
import {ajaxForm} from "../utils/ajaxForm";


import {router} from "../main/main";

export default class UserModel {


    constructor() {

        this._editedAt = null;
        this._email = null;
        this._id = null;
        this._name = null;
        this._password = null;
        this._photo = null;

        this._getUser();
    }

    get editedAt() {
        return new Promise(async (resolve) => {
            await this._checkUser(this._editedAt);
            resolve(this._editedAt);
        });
    }

    get email() {
        return new Promise(async (resolve) => {
            await this._checkUser(this._email);
            resolve(this._email);
        });
    }

    get id() {
        return new Promise(async (resolve) => {
            await this._checkUser(this._id);
            resolve(this._id);
        });
    }

    get name() {
        return new Promise(async (resolve) => {
            await this._checkUser(this._name);
            resolve(this._name);
        });
    }

    get password() {
        return new Promise(async (resolve) => {
            await this._checkUser(this._password);
            resolve(this._password);
        });
    }

    get photo() {
        return new Promise(async (resolve) => {
            await this._checkUser(this._photo);
            resolve(this._photo);
        });
    }

    set email(email) {
        this._email = email.toString();
        this._saveUser();
    }

    set name(name) {
        this._name = name.toString();
        this._saveUser();
    }

    set password(password) {
        this._password = password.toString();
        this._saveUser();
    }

    async _checkUser(data){
        if(!data){
            await this.getOwner();
        }
    }

    _getUser() {
        let userData = sessionStorage.getItem("user");
        if (userData) {
            userData = JSON.parse(userData);
            this._filUserData(userData);
        }
    }

    _saveUser() {
        const obj = {
            "editedAt": this._editedAt,
            "email": this._email,
            "id": this._id,
            "name": this._name,
            "password": this._password,
            "photo": this._photo
        };

        sessionStorage.setItem("user", JSON.stringify(obj));
    }

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

    _filUserData(data) {
        this._editedAt = data['editedAt'];
        this._email = data['email'];
        this._id = data['id'];
        this._name = data['name'];
        this._password = data['password'];
        this._photo = data['photo'];
    }

    async getOwner(){
        await ajax(constants.PATH+'/api/v1/get_current_staff/',
            'GET',
            {},
            (response) => {
                if (response.errors === null) {
                    this._filUserData(response.data);
                    this._saveUser();
                } else {
                    throw response.errors;
                }
            }
        );
    }

    async editOwner(photo = null){
        const formData = await this._makeFormData(photo);
        await ajaxForm(constants.PATH+'/api/v1/staff/' + await this.id,
            'PUT',
            formData,
            (response) => {
                if (response.errors === null) {
                    this._filUserData(response.data);
                    this._saveUser();
                } else {
                    throw response.errors;
                }
            }
        );

    }

    async register() {
        sessionStorage.clear();
        await ajax(constants.PATH + "/api/v1/staff",
            "POST",
            {"name": await this.name, "email": await this.email, "password": await this.password, "isOwner":true},
            (response) => {
            if (response.errors === null) {
                window.location.replace('/myCafes')
                // Router.redirect("/myCafes");
            } else {
                throw response.errors;
            }
        });
    }

    async login() {

        console.log('login');
        sessionStorage.clear();
        await authAjax("POST",
            constants.PATH + "/api/v1/staff/login",
            {"email": await this.email, "password": await this.password},
            (response) => {
            if (response.errors === null) {
                console.log('replace to mycafe')
                // Router.goTo('/reg');
                //router._goTo('/Profile')
                //console.log(router.routes)
                window.location.replace('/Profile')
                //Router.redirect("/myCafes");
            } else {
                throw response.errors;
            }
        });
    }

    async addStaff(uuid) {
        const requestUrl = "/api/v1/add_staff?uuid=" + uuid;
        await ajax(constants.PATH + requestUrl,
            "POST",
            {"name": await this.name, "email": await this.email, "password": await this.password},
            (response) => {
                if (response.errors === null) {
                    window.location.replace('/')
                    // Router.redirect("/"); //TODO редирект на кнопку с добавление кофе
                } else {
                    throw response.errors[0].message;
                }
            }
        );
    }

}
