'use strict';

import FormValidation, {validateForm} from "../modules/formValidator";
import {showError} from "../modules/formValidator";
import {Router} from "../modules/Router";

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
        const validateContext = [ //По хорошему registerComponent нужно переписать на formComponent, тогда этот context перейдёт в _makeContext
                                // Ну или можно вынести в отдельный файл
            {
                id: 'email',
                validate: (inputElement) => {
                    const emailRegex = new RegExp('\\S+@\\S+\\.\\S+');
                    if(!emailRegex.test(inputElement.value.toString())){
                        return 'Некорректный email';
                    }
                }
            },
            {
                id: 'password',
                validate: (inputElement) => {
                    if(form.elements['password'].value.toString().length < 7){
                        return 'Пароль слишком короткий';
                    }
                }
            },
            {
                id: 're-password',
                validate: (inputElement) => {
                    if(inputElement.value.toString() !== form.elements['password'].value.toString()){
                        return 'Пароли не совпадают';
                    }
                }
            },
        ];

        const formValidator = new FormValidation(form);
        if(formValidator.validate(validateContext)){
            this._userModel.email = form.elements['email'].value.toString();
            this._userModel.password = form.elements['password'].value.toString();
            this._userModel.name = form.elements['full-name'].value.toString();

            try {
                await this._userModel.register();
            } catch (exception) {
                console.log(exception);
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
        Router.redirect('/login');
    }

    control(){
        sessionStorage.clear();
        this._registerView.context = this._makeContext();
        this._registerView.render();
    }
}