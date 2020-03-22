'use strict';

import {handleImageUpload} from "../modules/imageUpload";
import CafeListModel from "../models/CafeListModel";
import CafeComponent from "../components/Cafe/Cafe";

export default class CreateCafeController{
    constructor(cafeList, createCafeView) {
        this._cafeList = cafeList;
        this._createCafeView = createCafeView;
    }

    _addCafe(e) {
        e.preventDefault();
        const form = document.getElementsByClassName('new-cafe-page__outer__sub__form-container__form-field').item(0);
        const photoInput = document.getElementById('upload');
        const image = document.getElementById('image').getAttribute('src');

        const cafe = this._cafeList.createCafe();
        cafe.name = form.elements['name'].value;
        cafe.address = form.elements['address'].value;
        cafe.description = form.elements['description'].value;
        cafe.photo = image;

        cafe.create(photoInput.files[0]);
    }

    _makeCreateCafeViewContext(){
        return {
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
                        inputOption:'required',
                    },
                    {
                        type: 'text',
                        id: 'address',
                        data: ' ',
                        labelData: 'Адрес',
                        inputOption:'required',
                    },
                    {
                        type: 'text',
                        id: 'description',
                        data: ' ',
                        labelData: 'Описание',
                        inputOption:'required',
                    },
                ],
                submitValue: 'Готово',
                event: {
                    type: 'submit',
                    listener: this._addCafe.bind(this)
                },
            },
        };
    }

    control(){
        this._createCafeView.context = this._makeCreateCafeViewContext();
        this._createCafeView.render();
    }
}