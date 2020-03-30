'use strict';

import {validateForm} from "../modules/formValidator";
import {showError} from "../modules/formValidator";
import {router} from "../main/main";

import FormValidation from "../modules/FormValidation";
import ServerExceptionHandler from "../modules/ServerExceptionHandler";


export default class RegisterController{
    constructor(userModel, registerView) {
        this._userModel = userModel;
        this._registerView = registerView;
    }

    async _formListener(e) {
        e.preventDefault();

        let form = document.getElementsByClassName('formContainer').item(0).firstElementChild;
        const validateContext = this._makeValidateContext(form);
        const serverExceptionContext = this._makeExceptionContext(form);

        if((new FormValidation(form)).validate(validateContext)){
            this._userModel.email = form.elements['email'].value.toString();
            this._userModel.password = form.elements['password'].value.toString();
            this._userModel.name = form.elements['full-name'].value.toString();

            try {
                await this._userModel.register();
            } catch (exception) {
                (new ServerExceptionHandler(form, serverExceptionContext)).handle(exception);
            }
        }
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
                            router._goTo('/login');
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
                validate: () => {
                    const emailRegex = new RegExp('\\S+@\\S+\\.\\S+');
                    if(!emailRegex.test(form.elements['email'].value.toString())){
                        return 'Некорректный email';
                    }
                }
            },
            {
                element: form.elements['password'],
                validate: () => {
                    if(form.elements['password'].value.toString().length < 8){
                        return 'Пароль слишком короткий';
                    }
                }
            },
            {
                element: form.elements['re-password'],
                validate: () => {
                    if(form.elements['re-password'].value.toString() !== form.elements['password'].value.toString()){
                        return 'Пароли не совпадают';
                    }
                }
            },
        ];
    }

    _makeExceptionContext(form){
        return {
            'User with this email already existed': form['email'],
            'Password must be at least 8 characters in length': form['password'],
            'Name must be at least 4 characters in length': form['full-name'],
            'Email must be a valid email': form['email']
        };
    }

    control(){
        sessionStorage.clear();
        this._registerView.context = this._makeViewContext();
        this._registerView.render();
    }
}
