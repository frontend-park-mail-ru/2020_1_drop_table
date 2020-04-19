'use strict';

import {handleImageUpload} from '../utils/imageUpload';

import {router} from '../main/main';

import FormValidation from '../utils/FormValidation';
import ServerExceptionHandler from '../utils/ServerExceptionHandler';

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

    async update(){
        await this._userModel.update();
        await this._cafeListModel.update();
    }

    /** Event добавление кафе */
    async _addCafe(e) {
        e.preventDefault();
        const form = document.getElementsByClassName('new-cafe-page__outer__sub__form-container__form-field').item(0);
        const photoInput = document.getElementById('upload');
        const image = document.getElementById('image').getAttribute('src');

        const cafe = this._cafeListModel.createCafe();

        cafe.name = form.elements['name'].value;
        cafe.address = form.elements['address'].value;
        cafe.description = form.elements['description'].value;

        const openTime = form.elements['openTime'].value.toString().split(':');
        const openTimeH = (openTime[0] >= 0 && openTime[0] <= 24)?openTime[0]:0;
        const openTimeM = (openTime[1] >= 0 && openTime[1] <= 60)?openTime[1]:0;
        cafe.openTime = `0001-01-01T${openTimeH}:${openTimeM}:00Z`;

        const closeTime = form.elements['closeTime'].value.toString().split(':');
        const closeTimeH = (closeTime[0] >= 0 && closeTime[0] <= 24)?closeTime[0]:0;
        const closeTimeM = (closeTime[1] >= 0 && closeTime[1] <= 60)?closeTime[1]:0;
        cafe.closeTime = `0001-01-01T${closeTimeH}:${closeTimeM}:00Z`;

        console.log('tetetetetst', cafe.closeTime)

        cafe.photo = image;

        const validateContext = this._makeValidateContext(form);
        const serverExceptionContext = this._makeExceptionContext(form);

        if ((new FormValidation(form)).validate(validateContext)) {
            try {
                await this._cafeListModel.create(photoInput.files[0], cafe);
            } catch (exception) {
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
                cafeName: 'Добавление заведения',
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
                        {
                            type: 'time',
                            id: 'openTime',
                            data: '00:00',
                            labelData: 'Время открытия',
                            inputOption: 'required',
                        },
                        {
                            type: 'time',
                            id: 'closeTime',
                            data: '00:00',
                            labelData: 'Время закрытия',
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
        await this.update();
        this._createCafeView.context = await this._makeViewContext();
        this._createCafeView.render();
    }
}
