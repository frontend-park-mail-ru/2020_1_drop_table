'use strict';

import {validateForm} from "../modules/formValidator";
import {showError} from "../modules/formValidator";
 import Router from "../modules/Router";



export default class RegisterController{
    constructor(userModel, registerView) {
        this._userModel = userModel;
        this._registerView = registerView;
    }

    _makeContext(){
        return {
            header: {
                type: 'auth',
                avatar: {
                    photo: null
                },
            },
            register: {
                form: {
                    event: {
                        type: 'submit',
                        listener: this._formListener.bind(this)
                    }
                },
                login: {
                    event: {
                        type: 'click',
                        listener: this._loginListener
                    }
                }
            }
        }
    }

    async _formListener(e) {
        e.preventDefault();

        let form = document.getElementsByClassName('formContainer').item(0).firstElementChild;
        if (validateForm(form)) {
            const email = form.elements['email'];
            const password = form.elements['password'];
            const name = form.elements['full-name'];

            this._userModel.email = email.value.toString();
            this._userModel.password = password.value.toString();
            this._userModel.name = name.value.toString();

            try {
                await this._userModel.register();
            } catch (exception) {
                if (exception[0].message === 'P') { //TODO доделать обработку ошибок при регистрации
                    showError(form, password, exception);
                } else if (exception[0].message === 'N') {
                    showError(form, name, exception[0].message);
                } else {
                    showError(form, email, exception[0].message);
                }
            }
        }

    }

    _loginListener(){
        window.location.replace('/login')
    }

    control(){
        sessionStorage.clear();
        this._registerView.context = this._makeContext();
        this._registerView.render();
    }
}
