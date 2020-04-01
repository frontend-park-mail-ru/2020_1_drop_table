'use strict';

import {Router} from "../modules/Router";
import FormValidation from "../modules/FormValidation";
import ServerExceptionHandler from "../modules/ServerExceptionHandler";

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



        const validateContext = this._makeValidateContext(form);
        const serverExceptionContext = this._makeExceptionContext(form);

        if ((new FormValidation(form)).validate(validateContext)) {
            try{
                await this._userModel.login();
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
                }
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
                        listener: ()=>{router._goTo('/reg');}
                    }
                }
            }
        }
    }

    _makeValidateContext(form){
        return [
            {
                element: form.elements['email'],
                validate: () => {
                    const emailRegex = new RegExp('\\S+@\\S+\\.\\S+');
                    if(!emailRegex.test(form.elements['email'].value.toString())){
                        return 'Некорректная почта';
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
            }
        ];
    }

    _makeExceptionContext(form){
        return {
            'resource you request not found': [
                'Некорректный логин или пароль',
                form['password']
            ],
        };
    }

    control(){
        sessionStorage.clear();
        this._loginView.context = this._makeViewContext();
        this._loginView.render();
    }
}
