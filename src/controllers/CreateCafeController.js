'use strict';

import {handleImageUpload} from '../modules/imageUpload';

import {router} from '../main/main';

import FormValidation from '../modules/FormValidation';
import ServerExceptionHandler from '../modules/ServerExceptionHandler';

/** контроллер создания кафе */
export default class CreateCafeController{

    /**
     * Инициализация CafePageController
     * @param {CafeListModel} cafeListModel модель списка кафе
     * @param {UserModel} userModel модель пользователя
     * @param {CreateCafeView} createCafeView view для создания кафе
     */
    constructor(cafeListModel, userModel, createCafeView) {
        this._cafeListModel = cafeListModel;
        this._userModel = userModel;
        this._createCafeView = createCafeView;
    }

    /** Event добавление кафе */
    async _addCafe(e) {
        e.preventDefault();
        const form = document.getElementsByClassName('new-cafe-page__outer__sub__form-container__form-field').item(0);
        const photoInput = document.getElementById('upload');
        const image = document.getElementById('image').getAttribute('src');

        const cafe = this._cafeListModel.createCafe();

        console.log('created', cafe);
        cafe.name = form.elements['name'].value;
        cafe.address = form.elements['address'].value;
        cafe.description = form.elements['description'].value;
        cafe.photo = image;

        const validateContext = this._makeValidateContext(form);
        const serverExceptionContext = this._makeExceptionContext(form);

        if ((new FormValidation(form)).validate(validateContext)) {
            try {
                console.log('try create', photoInput.files[0], cafe, );
                await this._cafeListModel.create(photoInput.files[0], cafe);
            } catch (exception) {
                console.log('catch try create', photoInput.files[0], cafe );
                (new ServerExceptionHandler(form, serverExceptionContext)).handle(exception);
            }
        }

    }

    /**
     * Создание контекста для CafePageView
     * @return {obj} созданный контекст
     */
    async _makeViewContext(){
        return {
            header:{
                type: null,
                avatar: {
                    photo: this._userModel.photo,
                    event: {
                        type: 'click',
                        listener: () => {
                            router._goTo('/profile');
                        }
                    }
                }
            },
            cafe: {
                cafeName: 'Добавление кафе',
                imgSrc: '/images/test.jpg',
                event: {
                    type: 'change',
                    listener: handleImageUpload
                },
                form: {
                    formFields: [
                        {
                            type: 'text',
                            id: 'name',
                            data: ' ',
                            labelData: 'Название',
                            inputOption: 'required',
                        },
                        {
                            type: 'text',
                            id: 'address',
                            data: ' ',
                            labelData: 'Адрес',
                            inputOption: 'required',
                        },
                        {type: 'text',
                            id: 'description',
                            data: ' ',
                            labelData: 'Описание',
                            inputOption: 'required',
                        },
                    ],
                    submitValue: 'Готово',
                    event: {
                        type: 'submit',
                        listener: this._addCafe.bind(this)
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
                element: form.elements['name'],
                validate: () => {
                    if(form.elements['name'].value.toString().length < 2){
                        return 'Название кафе слишком короткое';
                    }
                }
            },
            {
                element: form.elements['address'],
                validate: () => {
                    if(form.elements['address'].value.toString().length < 6){
                        return 'Адрес кафе слишком короткий';
                    }
                }
            },
            {
                element: form.elements['description'],
                validate: () => {
                    if(form.elements['description'].value.toString().length < 6){
                        return 'Описание кафе слишком короткое';
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
            'Key: \'Cafe.CafeName\' Error:Field validation for \'CafeName\' failed on the \'min\' tag': [
                'Название кафе слишком короткое',
                form['name']
            ],
        };
    }

    /** Запуск контроллера */
    async control(){
        this._createCafeView.context = await this._makeViewContext();
        this._createCafeView.render();
    }
}
