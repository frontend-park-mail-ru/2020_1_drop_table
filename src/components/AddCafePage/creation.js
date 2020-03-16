import {handleImageUpload} from '../../modules/imageUpload';
import CafeComponent from '../../componentsAI/cafe/cafe';
<<<<<<< HEAD
import {constants} from "../../utils/constants";
import {Router} from "../../modules/Router";

=======
import {constants} from '../../utils/constants';
import {ajaxForm} from '../../utils/ajaxForm';
import {Router} from "../../modules/Router";
>>>>>>> origin/AI_dev


let app = document.body;

function addCafe(e) {
    console.log('calling addCafe in creation');
    e.preventDefault();
    console.log('calling addCafe in creation after preventdefalult');
    const form = document.getElementsByClassName('new-cafe-page__outer__sub__form-container__form-field').item(0);
    const photoInput = document.getElementById('upload');
    const image = document.getElementById('image').getAttribute('src');
    const name = form.elements['name'].value;
    const address = form.elements['address'].value;
    const description = form.elements['description'].value;
    const photo = photoInput.files[0];

    let formData = new FormData();

    let data = {
        'name': name.toString(),
        'address': address.toString(),
        'description': description.toString()
    };
    if (photo) {
        formData.append('photo', photo);
    } else {
        data = {
            'name': name.toString(),
            'address': address.toString(),
            'description': description.toString(),
            'photo':image
        };
    }

    formData.append('jsonData', JSON.stringify(data));

    ajaxForm(constants.PATH+'/api/v1/cafe',
        'POST',
        formData,
        (response) => {
            if (response.errors === null) {
<<<<<<< HEAD
                Router.redirect('/myCafe');
=======
                Router.redirect('/myCafe')
>>>>>>> origin/AI_dev
            } else {
                alert(response.errors[0].message); //TODO showError
            }
        }
    );
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
