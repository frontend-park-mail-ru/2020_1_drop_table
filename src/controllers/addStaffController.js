'use strict';

import {validateForm} from "../modules/formValidator";
import {showError} from "../modules/formValidator";
import {Router} from "../modules/Router";
import {router} from "../main/main";
import ServerExceptionHandler from "../modules/ServerExceptionHandler";
import FormValidation from "../modules/FormValidation";

export default class AddStaffController{
    constructor(userModel, registerView,uuid) {
        this._userModel = userModel;
        this._registerView = registerView;
        this._uuid = uuid;
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

        // let form = document.getElementsByClassName('formContainer').item(0).firstElementChild;
        // const validateContext = this._makeValidateContext(form);
        // const serverExceptionContext = this._makeExceptionContext(form);

        // if((new FormValidation(form)).validate(validateContext)){
        //     this._userModel.email = form.elements['email'].value.toString();
        //     this._userModel.password = form.elements['password'].value.toString();
        //     this._userModel.name = form.elements['full-name'].value.toString();

            try {
                console.log('test add staff controller try block' );
                await this._userModel.addStaff(this._uuid);

            } catch (exception) {
                console.log(exception);

                //(new ServerExceptionHandler(form, serverExceptionContext)).handle(exception);
            }
       // }
    }

    _loginListener(){
        router._goTo('/login');
    }

    _makeValidateContext(form){
        return [
            {
                element: form.elements['full-name'],
                validate: () => {
                    if(form.elements['full-name'].value.toString().length < 4){
                        return 'Имя слишком короткое';
                    }
                }
            },
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
            'given item already existed': [
                'Пользователь с такой почтой уже существует',
                form['email']
            ],
            'Key: \'Staff.Password\' Error:Field validation for \'Password\' failed on the \'min\' tag': [
                'Минимальная длинна пароля 8 символов',
                form['password']
            ],
            'Key: \'Staff.Name\' Error:Field validation for \'Name\' failed on the \'min\' tag': [
                'Имя слишком короткое',
                form['full-name']
            ],
            'Key: \'Staff.Email\' Error:Field validation for \'Email\' failed on the \'email\' tag': [
                'Некоректная почта',
                form['email']
            ]
        };
    }

    control(){
        sessionStorage.clear();
        this._registerView.context = this._makeContext();
        this._registerView.render();
    }
}
