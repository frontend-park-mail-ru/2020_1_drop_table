'use strict';

import {handleImageUpload} from "../modules/imageUpload";
import {validateForm} from "../modules/formValidator";
import {Router} from "../modules/Router";

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

        if (validateForm(form)) {
            await this._checkUserData();
            this._userModel.name = form.elements['name'].value.toString();
            this._userModel.email = form.elements['email'].value.toString();
            this._userModel.password = form.elements['password'].value.toString();

            try {
                await this._userModel.editOwner(photo);
            } catch (exception) {
                alert(exception[0].message); //TODO Сделать обработку исключения
            }
        }
    }

    _headerAvatarListener(){
        Router.redirect('/Profile');
    }

    _headerExitListener(){
        alert('exit'); //TODO EXIT
    }

    async _makeContext() {
        await this._checkUserData();
        return {
            header: {
                type: 'profile',
                avatar: {
                    photo: '',
                    event: {
                        type: 'click',
                        listener: this._headerAvatarListener.bind(this)
                    }
                },
                exit: {
                    event: {
                        type: 'click',
                        listener: this._headerExitListener.bind(this)
                    }
                }
            },
            profile: {
                imgSrc: (this._userModel.photo !== '')
                    ? this._userModel.photo : 'https://pngimage.net/wp-content/uploads/2018/06/user-logo-png-4.png',
                event: {
                    type: 'change',
                    listener: handleImageUpload
                },
                form: {
                    formFields: [
                        {
                            type: 'text',
                            id: 'name',
                            data: this._userModel.name,
                            labelData: 'Имя',
                            inputOption: 'required',
                        },
                        {
                            type: 'email',
                            id: 'email',
                            data: this._userModel.email,
                            labelData: 'Почта',
                            inputOption: 'required',
                        },
                        {
                            type: 'password',
                            id: 'password',
                            data: this._userModel.password,
                            labelData: 'Пароль',
                            inputOption: 'required'
                        },
                        {
                            type: 'password',
                            id: 're-password',
                            data: this._userModel.password,
                            labelData: 'Повторите пароль',
                            inputOption: 'required'
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

    async _checkUserData(){
        if(this._userModel.id == null){
            try {
                await this._userModel.getOwner();
            } catch (exception) {
                alert(exception[0].message); //TODO Сделать обработку исключения
            }
        }
    }

    async control(){
        this._userProfileView.context = await this._makeContext();
        this._userProfileView.render();
    }

}