'use strict';

import {handleImageUpload} from '../utils/imageUpload';

import {router} from '../main/main';

import FormValidation from '../utils/FormValidation';
import ServerExceptionHandler from '../utils/ServerExceptionHandler';
import NotificationComponent from "../components/Notification/Notification";

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
        try{
            await this._userModel.update();
            await this._cafeListModel.update();
        } catch (exceptions) {
            (new ServerExceptionHandler(document.body, this._makeExceptionContext())).handle(exceptions);
        }
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
        cafe.openTime = form.elements['openTime'].value.toString();
        //cafe.openTime = `0001-01-01T${openTimeH}:${openTimeM}:00Z`;
        cafe.closeTime = form.elements['closeTime'].value.toString();
        //cafe.closeTime = `0001-01-01T${closeTimeH}:${closeTimeM}:00Z`;
        cafe.photo = image; //? image : '/images/test.jpg';

        const validateContext = this._makeValidateContext(form);
        const serverExceptionContext = this._makeExceptionContext(form);

        if ((new FormValidation(form)).validate(validateContext)) {
            try {
                await this._cafeListModel.create(photoInput.files[0], cafe);
            } catch (exceptions) {
                (new ServerExceptionHandler(form, serverExceptionContext)).handle(exceptions);
            }
        }

    }

    /**
     * Создание контекста для CafePageView
     * @return {obj} созданный контекст
     */
    _makeViewContext(){
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
            {
                element: form.elements['openTime'],
                validate: () => {
                    const timeRegex = /^([0-1][0-9])|(2[0-3]):([0-5][0-9])$/;
                    if(!timeRegex.test(form.elements['openTime'].value.toString())){
                        return 'Время имеет некорректный формат';
                    }
                }
            },
            {
                element: form.elements['closeTime'],
                validate: () => {
                    const timeRegex = /^([0-1][0-9])|(2[0-3]):([0-5][0-9])$/;
                    if(!timeRegex.test(form.elements['closeTime'].value.toString())){
                        return 'Время имеет некорректный формат';
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
    _makeExceptionContext(form = document.body){
        return {
            'Key: \'Cafe.CafeName\' Error:Field validation for \'CafeName\' failed on the \'min\' tag': [
                'Название кафе слишком короткое',
                form['name']
            ],
            'offline': () => {
                (new NotificationComponent('Похоже, что вы оффлайн.')).render();
                return [null, null]
            }
        };
    }

    /** Запуск контроллера */
    async control(){
        try {
            await this.update();
            this._createCafeView.context = this._makeViewContext();
            this._createCafeView.render();
        } catch (error) {
            if(error.message !== 'unknown server error'){
                throw(new Error(error.message));
            }
        }
    }
}
