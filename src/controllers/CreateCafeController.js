'use strict';

import {handleImageUpload} from "../modules/imageUpload";

import {router} from "../main/main";

import FormValidation from "../modules/FormValidation";
import ServerExceptionHandler from "../modules/ServerExceptionHandler";


export default class CreateCafeController{
    constructor(cafeList, userModel, createCafeView) {
        this._cafeListModel = cafeList;
        this._userModel = userModel;
        this._createCafeView = createCafeView;
    }

    async _addCafe(e) {
        e.preventDefault();
        const form = document.getElementsByClassName('new-cafe-page__outer__sub__form-container__form-field').item(0);
        const photoInput = document.getElementById('upload');
        const image = document.getElementById('image').getAttribute('src');

        const cafe = this._cafeListModel.createCafe();
        cafe.name = form.elements['name'].value;
        cafe.address = form.elements['address'].value;
        cafe.description = form.elements['description'].value;
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
                cafeName: 'Новое кафе',
                imgSrc: 'https://www.restorating.ru/upload/images/2015/04/08/restorating-pmibar-01.jpg',
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

    _makeValidateContext(form){
        return []; // TODO
    }

    _makeExceptionContext(form){
        return {}; //TODO
    }

    async control(){
        this._createCafeView.context = await this._makeViewContext();
        this._createCafeView.render();
    }
}
