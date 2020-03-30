'use strict';

import FormValidation from "../modules/FormValidation";
import {Router} from "../modules/Router";
import ServerErrorHandler from "../modules/ServerExceptionHandler";

export default class RegisterController{
    constructor(userModel, registerView) {
        this._userModel = userModel;
        this._registerView = registerView;
    }

    _makeViewContext(){
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
                        listener: () => {
                            Router.redirect('/login');
                        }
                    }
                }
            }
        }
    }

    _makeValidateContext(form){
        return [
            {
                element: form.elements['full-name'],
                validate: () => {
                    if(form.elements['full-name'].value.toString().length < 4){
                        return 'Слишком короткое имя';
                    }
                }
            },
            {
                element: form.elements['email'],
                validate: (inputElement) => {
                    const emailRegex = new RegExp('\\S+@\\S+\\.\\S+');
                    if(!emailRegex.test(form.elements['email'].value.toString())){
                        return 'Некорректный email';
                    }
                }
            },
            {
                element: form.elements['password'],
                validate: (inputElement) => {
                    if(form.elements['password'].value.toString().length < 8){
                        return 'Пароль слишком короткий';
                    }
                }
            },
            {
                element: form.elements['re-password'],
                validate: (inputElement) => {
                    if(form.elements['re-password'].value.toString() !== form.elements['password'].value.toString()){
                        return 'Пароли не совпадают';
                    }
                }
            },
        ];
    }

    _makeHandleErrorsContext(form){
        return {
            'User with this email already existed': form['email'],
            'Password must be at least 8 characters in length': form['password'],
            'Name must be at least 4 characters in length': form['full-name'],
            'Email must be a valid email': form['email']
        };
    }

    async _formListener(e) {
        e.preventDefault();

        let form = document.getElementsByClassName('formContainer').item(0).firstElementChild;
        const validateContext = this._makeValidateContext(form);
        const serverErrorsContext = this._makeHandleErrorsContext(form);

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

    control(){
        sessionStorage.clear();
        this._registerView.context = this._makeViewContext();
        this._registerView.render();
    }
}