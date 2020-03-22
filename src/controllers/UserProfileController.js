'use strict';

import {handleImageUpload} from "../modules/imageUpload";
import {validateForm} from "../modules/formValidator";

export default class UserProfileController{

    constructor(userModel, userProfileView){
        this._userModel = userModel;
        this._userProfileView = userProfileView;
    }

    _changeUserProfileListener(e) {
        e.preventDefault();
        const form = document.getElementsByClassName('user-profile__form-container__form-field').item(0);
        const photoInput = document.getElementById('upload');
        const photo = photoInput.files[0];

        if (validateForm(form)) {
            this._checkUserData().then(() => {
                this._userModel.name = form.elements['name'].value.toString();
                this._userModel.email = form.elements['email'].value.toString();
                this._userModel.password = form.elements['password'].value.toString();
                this._userModel.editOwner(photo);
            });
        }
    }

    _makeUserProfileViewContext() {
        return new Promise((resolve, reject) => {
            this._checkUserData().then(() => {
                resolve({
                    imgSrc: ( this._userModel.photo !== '')
                        ?  this._userModel.photo : 'https://pngimage.net/wp-content/uploads/2018/06/user-logo-png-4.png',
                    event: {
                        type: 'change',
                        listener: handleImageUpload
                    },
                    form: {
                        formFields: [
                            {
                                type: 'hidden',
                                id: 'userId',
                                data:  this._userModel.id,
                                labelData: '',
                                inputOption: 'readonly',
                            },
                            {
                                type: 'text',
                                id: 'name',
                                data:  this._userModel.name,
                                labelData: 'Имя',
                                inputOption: 'required',
                            },
                            {
                                type: 'email',
                                id: 'email',
                                data:  this._userModel.email,
                                labelData: 'Почта',
                                inputOption: 'required',
                            },
                            {
                                type: 'password',
                                id: 'password',
                                data:  this._userModel.password,
                                labelData: 'Пароль',
                                inputOption: 'required'
                            },
                            {
                                type: 'password',
                                id: 're-password',
                                data:  this._userModel.password,
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
                });
            });
        });
    }

    _checkUserData(){
        return new Promise((resolve, reject) => {
            if(this._userModel.id == null){
                this._userModel.getOwner().then(success => {resolve(success)}, error => {reject(error)});
            }
            else{
                resolve();
            }
        });
    }


    control(){
        this._makeUserProfileViewContext().then((context) =>{
            this._userProfileView.context = context;
            this._userProfileView.render();
        });
    }

}