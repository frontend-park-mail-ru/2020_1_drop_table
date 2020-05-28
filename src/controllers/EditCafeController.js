'use strict';

import {handleImageUpload} from '../utils/imageUpload';

import {router} from '../main/main';

import FormValidation from '../utils/FormValidation';
import ServerExceptionHandler from '../utils/ServerExceptionHandler';
import NotificationComponent from '../components/Notification/Notification';

/** контроллер редактирования кафе */
export default class EditCafeController{

    /**
     * Инициализация EditCafeController
     * @param {CafeListModel} cafeList модель списка кафе
     * @param {UserModel} userModel модель пользователя
     * @param {CreateCafeView} createCafeView view создания кафе
     */
    constructor(cafeList, userModel, createCafeView) {
        this._cafeListModel = cafeList;
        this._userModel = userModel;
        this._createCafeView = createCafeView;
    }

    async update(){
        try {
            await this._userModel.update();
            await this._cafeListModel.update();
        } catch (exception) {
            (new ServerExceptionHandler(document.body, this._makeExceptionContext())).handle(exception);
        }

    }

    /** Event измененич кафе */
    async _editCafe(e) {
        e.preventDefault();
        const form = document.getElementsByClassName('new-cafe-page__outer__sub__form-container__form-field').item(0);
        const photoInput = document.getElementById('upload');

        const cafe = this._cafeListModel.getCafeById(this._id);
        console.log('get by id ', cafe);

        cafe._id = this._id;
        cafe.name = form.elements['name'].value;
        cafe.address = form.elements['address'].value;
        cafe.description = form.elements['description'].value;
        cafe.openTime = form.elements['openTime'].value.toString();
        //cafe.openTime = `0001-01-01T${openTimeH}:${openTimeM}:00Z`;
        cafe.closeTime = form.elements['closeTime'].value.toString();
        //cafe.closeTime = `0001-01-01T${closeTimeH}:${closeTimeM}:00Z`;

        const validateContext = this._makeValidateContext(form);
        const serverExceptionContext = this._makeExceptionContext(form);

        if ((new FormValidation(form)).validate(validateContext)) {
            try {
                await this._cafeListModel.editCafe(photoInput.files[0], cafe, this._id);
            } catch (exception) {
                (new ServerExceptionHandler(form, serverExceptionContext)).handle(exception);
            }
        }
    }

    /**
     * Создание контекста для CreateCafeView
     * @param {int} id идентификатор кафе
     * @return {obj} созданный контекст
     */
    _makeViewContext(id){

        const cafe = this._cafeListModel.getCafeById(id);

        return {
            header:{
                type: null,
                isOwner: this._userModel._isOwner,
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
                cafeName: 'Редактор',
                imgSrc: cafe.photo,
                event: {
                    type: 'change',
                    listener: handleImageUpload
                },
                form: {
                    formFields: [
                        {
                            type: 'text',
                            id: 'name',
                            data: cafe.name,
                            labelData: 'Название',
                            inputOption: 'required',
                        },
                        {
                            type: 'text',
                            id: 'address',
                            data: cafe.address,
                            labelData: 'Адрес',
                            inputOption: 'required',
                        },
                        {
                            type: 'time',
                            id: 'openTime',
                            data: cafe.openTime,
                            labelData: 'Время открытия',
                            inputOption: 'required',
                        },
                        {
                            type: 'time',
                            id: 'closeTime',
                            data: cafe.closeTime,
                            labelData: 'Время закрытия',
                            inputOption: 'required',

                        },
                        {
                            type: 'text',
                            id: 'description',
                            data: cafe.description,
                            areaData:cafe.description,
                            labelData: 'Описание',
                            inputOption: 'required',
                            areaType: 'textarea'
                        },
                    ],
                    submitValue: 'Готово',
                    event: {
                        type: 'submit',
                        listener: this._editCafe.bind(this)
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
                    if(form.elements['name'].value.toString().length < 1){
                        return 'Название кафе слишком короткое';
                    }
                }
            },

            {
                element: form.elements['address'],
                validate: () => {
                    if(form.elements['address'].value.toString().length < 1){
                        return 'Адрес кафе слишком короткий ';
                    }
                }
            },
            {
                element: form.elements['description'],
                validate: () => {
                    if(form.elements['description'].value.toString().length < 3){
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
    _makeExceptionContext(form= document.body){
        return {
            'Key: \'Cafe.CafeName\' Error:Field validation for \'CafeName\' failed on the \'min\' tag': [
                'Название кафе слишком короткое',
                form['name']
            ],
            'offline': () => {
                (new NotificationComponent('Похоже, что вы оффлайн.')).render();
                return [null, null]
            },
            'no permission': () => {
                router._goTo('/login');
                throw new Error('no permission');
            },
        };
    }

    /**
     * Запуск контроллера
     * @param {int} id идентификатор кафе
     */
    async control(id){
        try {
            await this.update();
            this._id = id;
            this._createCafeView.context = this._makeViewContext(id);
            this._createCafeView.render();
        } catch (error) {
            console.log(error.message);
        }
    }
}
