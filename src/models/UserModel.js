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

    get editedAt(){
        this._checkUserData(this._editedAt);
        return this._editedAt;
    }

    get email(){
        this._checkUserData(this._email);
        return this._email;
    }

    get id(){
        this._checkUserData(this._id);
        return this._id;
    }

    get name(){
        this._checkUserData(this._name);
        return this._name;
    }

    get password(){
        this._checkUserData(this._password);
        return this._password;
    }

    get photo(){
        this._checkUserData(this._photo);
        return this._photo;
    }

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
        const userData = JSON.parse(sessionStorage.getItem("user"));
        if (userData) {
            this._editedAt = userData['editedAt'];
            this._email = userData['email'];
            this._id = userData['id'];
            this._name = userData['name'];
            this._password = userData['password'];
            this._photo = userData['photo'];
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

    _checkUserData(data){
        if (!data){
            this.getOwner();
        }
    }

    getOwner(){
        return new Promise((resolve) => {
            ajax(constants.PATH+'/api/v1/getCurrentOwner/',
                'GET',
                {},
                (response) => {
                    if (response.errors === null) {
                        this._editedAt = response.data['editedAt'];
                        this._email = response.data['email'];
                        this._id = response.data['id'];
                        this._name = response.data['name'];
                        this._password = response.data['password'];
                        this._photo = response.data['photo'];

                        this._saveUser();
                    } else {
                        alert(response.errors[0].message); //TODO showError
                    }
                }
            )
        });
    }

    editOwner(photo = null){
        const formData = this._makeFormData(photo);

        return new Promise((resolve) => {
            ajaxForm(constants.PATH+'/api/v1/owner/' + this.id,
                'PUT',
                formData,
                (response) => {
                    if (response.errors !== null) {
                       alert(response.errors[0].message); //TODO showError
                    }
                }
            );
        });
    }

    register() {
        return new Promise((resolve) => {
            ajax(constants.PATH + "/api/v1/owner",
                "POST",
                    {"name": this.name.toString(), "email": this.email.toString(), "password": this.password.toString()},
                    (response) => {
                        if (response.errors === null) {
                            Router.redirect("/myCafe");
                        } else {
                            resolve(response.errors[0].message);
                        }
                    }
                );
            }
        );
    }

    login() {
        return new Promise((resolve) => {
            authAjax("POST",
                constants.PATH + "/api/v1/owner/login",
                {"email": this._email.toString(), "password": this.password.toString()},
                (response) => {
                    if (response.errors === null) {
                        Router.redirect("/myCafe");
                    } else {
                        resolve(response.errors[0].message); // TODO проверить работу вызова ошибки при некорректном пользователе
                    }
                });
        });
    }
}