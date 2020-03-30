'use strict';

import {handleImageUpload} from "../modules/imageUpload";
import {validateForm} from "../modules/formValidator";
import {Router} from "../modules/Router";
import FormValidation from "../modules/FormValidation";
import ServerExceptionHandler from "../modules/ServerExceptionHandler";

export default class UserProfileController{

    constructor(userModel, userProfileView){
        this._userModel = userModel;
        this._userProfileView = userProfileView;
    }

    async _changeUserProfileListener(e) {
        e.preventDefault();
        const form = document.getElementsByClassName('user-profile__form-container__form-field').item(0);
        const photoInput = document.getElementById('upload');
        const photo = photoInput.files[0];

        const validateContext = this._makeValidateContext(form);
        const serverExceptionContext = this._makeExceptionContext(form);

        if ((new FormValidation(form)).validate(validateContext)) {
            this._userModel.name = form.elements['full-name'].value.toString();
            this._userModel.email = form.elements['email'].value.toString();
            this._userModel.password = form.elements['password'].value.toString();

            try {
                await this._userModel.editOwner(photo);
            } catch (exception) {
                (new ServerExceptionHandler(form, serverExceptionContext)).handle(exception);
            }
        }
    }

    async _makeContext() {
        return {
            header: {
                type: 'profile',
                avatar: {
                    photo: null,
                    event: {
                        type: 'click',
                        listener: () => {
                            Router.redirect('/Profile');
                        }
                    }
                },
                exit: {
                    event: {
                        type: 'click',
                        listener: () => {
                            alert('exit'); //TODO EXIT
                        }
                    }
                }
            },
            profile: {
                imgSrc: 'https://pngimage.net/wp-content/uploads/2018/06/user-logo-png-4.png',
                imgSrcPromise: this._userModel.photo,
                event: {
                    type: 'change',
                    listener: handleImageUpload
                },
                form: {
                    formFields: [
                        {
                            type: 'text',
                            id: 'full-name',
                            data: 'name',
                            labelData: 'Имя',
                            inputOption: 'required',
                            inputPromise: this._userModel.name,
                        },
                        {
                            type: 'email',
                            id: 'email',
                            data: 'email',
                            inputPromise: this._userModel.email,
                            labelData: 'Почта',
                            inputOption: 'required',
                        },
                        {
                            type: 'password',
                            id: 'password',
                            data: 'password',
                            inputPromise: this._userModel.password,
                            labelData: 'Пароль',
                            inputOption: 'required',
                        },
                        {
                            type: 'password',
                            id: 're-password',
                            data: 'password',
                            inputPromise: this._userModel.password,
                            labelData: 'Повторите пароль',
                            inputOption: 'required',
                        },
                    ],
                    submitValue: 'Готово',
                    event: {
                        type: 'submit',
                        listener: this._changeUserProfileListener.bind(this)
                    },
                },
            }
        };
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

    async control(){
        this._userProfileView.context = await this._makeContext();
        this._userProfileView.render();
    }

}