import {ajax} from '../utils/ajax';
import {authAjax} from '../utils/authAjax'
import {constants} from "../utils/constants";
import {Router} from "../modules/Router";
import {ajaxForm} from "../utils/ajaxForm";

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

    get editedAt(){return this._editedAt;}
    get email(){return this._email;}
    get id(){return this._id;}
    get name(){return this._name;}
    get password(){return this._password;}
    get photo(){return this._photo;}

    set email(email){
        this._email = email;
        this._saveUser();
    }

    set name(name){
        this._name = name;
        this._saveUser();
    }

    set password(password){
        this._password = password;
        this._saveUser();
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

    _makeFormData(photo){
        let formData = new FormData();
        let data = {
            'name': this.name,
            'email': this.email,
            'password': this.password,
        };

        if (photo) {
            formData.append('photo', photo);
        }
        else {
            data = {
                'name': this.name,
                'email': this.email,
                'password': this.password,
                'photo': this.photo
            }
        }

        formData.append('jsonData', JSON.stringify(data));
        return formData;
    }

    _filUserData(data){
        this._editedAt = data['editedAt'];
        this._email = data['email'];
        this._id = data['id'];
        this._name = data['name'];
        this._password = data['password'];
        this._photo = data['photo'];
    }

    getOwner(){
        return new Promise((resolve, reject) => {
            ajax(constants.PATH+'/api/v1/getCurrentOwner/',
                'GET',
                {},
                (response) => {
                    console.log(response);
                    if (response.errors === null) {
                        this._filUserData(response.data);
                        this._saveUser();
                        resolve();
                    } else {
                        reject(response.errors); //TODO showError
                    }
                }
            );
        });
    }

    editOwner(photo = null){
        const formData = this._makeFormData(photo);

        return new Promise((resolve, reject) => {
            ajaxForm(constants.PATH+'/api/v1/owner/' + this.id,
                'PUT',
                formData,
                (response) => {
                    console.log(response);
                    if (response.errors === null) {
                        this._filUserData(response.data);
                        this._saveUser();
                        resolve();
                    }
                    reject(response.errors);
                }
            );
        });
    }

    register() {
        return new Promise((resolve, reject) => {
            ajax(constants.PATH + "/api/v1/owner",
                "POST",
                {"name": this.name, "email": this.email, "password": this.password},
                (response) => {
                    if (response.errors === null) {
                        Router.redirect("/myCafe");
                        resolve();
                    }
                    reject(response.errors[0].message);
                });
        });
    }

    login() {
        return new Promise((resolve, reject) => {
            authAjax("POST",
                constants.PATH + "/api/v1/owner/login",
                {"email": this.email, "password": this.password},
                (response) => {
                    if (response.errors === null) {
                        Router.redirect("/myCafe");
                        resolve();
                    }
                    reject(response.errors[0].message); // TODO проверить работу вызова ошибки при некорректном пользователе
                });
        });
    }
}