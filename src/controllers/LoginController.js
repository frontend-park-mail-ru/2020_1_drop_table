'use strict';

import {Router} from "../modules/Router";

import {router} from "../main/main";

export default class LoginController {

    constructor(userModel, loginView) {
        this._userModel = userModel;
        this._loginView = loginView;
    }

    async _submitListener(e){
        e.preventDefault();
        const form = document.getElementsByClassName('formContainer').item(0).firstElementChild;
        this._userModel.email = form.elements['email'].value;
        this._userModel.password = form.elements['password'].value;

        try{
            await this._userModel.login();
        } catch (exception) {
           // alert(exception[0].message); //TODO Обработка ошибок при логине
        }
    }

    _registerListener(){
        router._goTo('/reg');
    }

    _makeContext(){
        return {
            header: {
                type: 'auth',
                avatar: {
                    photo: null
                },
            },
            login: {
                form: {
                    event: {
                        type: 'submit',
                        listener: this._submitListener.bind(this)
                    }
                },
                register: {
                    event: {
                        type: 'click',
                        listener: this._registerListener
                    }
                }
            }
        }
    }

    control(){
        sessionStorage.clear();
        this._loginView.context = this._makeContext();
        this._loginView.render();
    }
}
