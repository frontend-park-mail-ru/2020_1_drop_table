'use strict';

import FormValidation from "../modules/FormValidation";
import {showError} from "../modules/formValidator";
import {Router} from "../modules/Router";
import ServerErrorHandler from "../modules/ServerErrorHandler";

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
        const validateContext = [
            {
                id: 'full-name',
                validate: (inputElement) => {
                    if(inputElement.value.toString().length < 4){
                        return 'Слишком короткое имя';
                    }
                }
            },
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
                    if(inputElement.value.toString().length < 8){
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

        const serverErrorsContext = {
            'User with this email already existed': form['email'],
            'Password must be at least 8 characters in length': form['password'],
            'Name must be at least 4 characters in length': form['full-name'],
            'Email must be a valid email': form['email']
        };

        if((new FormValidation(form)).validate(validateContext)){
            this._userModel.email = form.elements['email'].value.toString();
            this._userModel.password = form.elements['password'].value.toString();
            this._userModel.name = form.elements['full-name'].value.toString();

            try {
                await this._userModel.register();
            } catch (exception) {
                (new ServerErrorHandler(form, serverErrorsContext)).handle(exception);
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