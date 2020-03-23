import {handleImageUpload} from '../../modules/imageUpload';

import CafeComponent from '../Cafe/Cafe';
import CafeListModel from "../../models/CafeListModel";


let app = document.body;

function addCafe(e) {
    console.log('calling addCafe in creation');
    e.preventDefault();
    console.log('calling addCafe in creation after preventdefalult');
    const form = document.getElementsByClassName('new-cafe-page__outer__sub__form-container__form-field').item(0);
    const photoInput = document.getElementById('upload');
    const image = document.getElementById('image').getAttribute('src');

    const cafeList = new CafeListModel();
    const cafe = cafeList.createCafe();
    console.log('new cafe', cafe);
    cafe.name = form.elements['name'].value;
    cafe.address = form.elements['address'].value;
    cafe.description = form.elements['description'].value;
    cafe.photo = image;

    cafe.create(photoInput.files[0]);
}

export function createNewCafePage(app) {
    let cafe = {
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
                listener: addCafe
            },
        },
    };


    const cafeElement = document.createElement('div');
    app.appendChild(cafeElement);
    console.log('cafecomm before');
    (new CafeComponent(cafeElement)).render(cafe);
    console.log('cafecomm after');

}
