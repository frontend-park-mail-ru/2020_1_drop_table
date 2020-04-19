'use strict';

import {handleImageUpload} from '../utils/imageUpload';

import {router} from '../main/main';

import FormValidation from '../utils/FormValidation';
import ServerExceptionHandler from '../utils/ServerExceptionHandler';

/** контроллер профиля */
export default class UserProfileController{

    /**
     * Инициализация UserProfileController
     * @param {UserModel} userModel модель пользователя
     * @param {UserProfileView} userProfileView view профиля
     */
    constructor(userModel, userProfileView){
        this._userModel = userModel;
        this._userProfileView = userProfileView;
    }

    async update(){
        await this._userModel.update();
    }

    /** Event изменения профиля */
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
            this._userModel.Position = form.elements['Position'].value.toString();

            // this._userModel.password = form.elements['password'].value.toString();

            try {
                await this._userModel.editOwner(photo);
            } catch (exception) {
                (new ServerExceptionHandler(form, serverExceptionContext)).handle(exception);
            }
        }
    }

    /**
     * Создание контекста для UserProfileView
     * @return {obj} созданный контекст
     */
    _makeViewContext() {
        return {
            header: {
                type: 'profile',
                avatar: {
                    photo: null,
                    event: {
                        type: 'click',
                        listener: () => {
                            router._goTo('/profile');
                        }
                    }
                },
                exit: {
                    event: {
                        type: 'click',
                        listener: () => {
                            router._goTo('/login');

                        }
                    }
                }
            },
            profile: {
                imgSrc: this._userModel.photo ? this._userModel.photo : '/images/userpic.png',
                event: {
                    type: 'change',
                    listener: handleImageUpload
                },
                form: {
                    formFields: [
                        {
                            type: 'text',
                            id: 'full-name',
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
                            type: 'text',
                            id: 'Position',
                            data: this._userModel.Position,
                            labelData: 'Должность',
                            inputOption: 'required',
                            readOnly: this._userModel.isOwner ? '' : 'readOnly'
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

    /**
     * Создание контекста для FormValidation
     * @param {Element} form элемент валидируеммой формы
     * @return {Array} созданный контекст
     */
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
                element: form.elements['Position'],
                validate: () => {
                    if(form.elements['Position'].value.toString().length < 4){
                        return 'Должность слишком короткая';
                    }
                }
            },

        ];
    }

    /**
     * Создание контекста для ServerExceptionHandler
     * @param {Element} form вылидируемый элемент
     * @return {obj} созданный контекст
     */
    _makeExceptionContext(form){
        return {
            'pq: duplicate key value violates unique constraint "staff_email_key"': [
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
            'Key: \'Staff.Position\' Error:Field validation for \'Position\' failed on the \'min\' tag': [
                'Должность слишком короткая',
                form['Position']
            ],
            'Key: \'Staff.Email\' Error:Field validation for \'Email\' failed on the \'email\' tag': [
                'Некоректная почта',
                form['email']
            ]
        };
    }

    /** Запуск контроллера */
    async control(){
        await this.update();
        this._userProfileView.context = this._makeViewContext();
        this._userProfileView.render();
    }

}
