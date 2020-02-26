import HeaderComponent from "../../componentsAI/header/header";
import {handleImageUpload} from "../../modules/imageUpload";
import CafeComponent from '../../componentsAI/cafe/cafe';

let app = document.body

function ajaxAddCafe(route, body, callback) {
    let formData = new FormData();
    formData.append('jsonData', JSON.stringify(body));
    let req = new Request(route, {
        method: 'POST',
        mode: 'cors',
        body: formData,
        credentials: 'include',
    });
    fetch(req)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('BAD HTTP stuff');
            }
        })
        .then((formData) => {
            callback(formData);
        })
        .catch((err) => {
            console.log('ERROR:', err.message);
        });
}

function addCafe(e) {
    e.preventDefault();
    const form = document.getElementsByClassName('cafeFormField').item(0);
    const name = form.elements['name'].value;
    const address = form.elements['address'].value;
    const description = form.elements['description'].value;
    ajaxAddCafe('http://80.93.177.185:8080/api/v1/cafe',
        {'name': name.toString(), 'address': address.toString(), 'description': description.toString()}
        , (response) => {
            console.log('RESPONSE add cafe', response);
            if (response.errors === null) {
                alert('Кафе добавлено');
            } else {
                alert(response.errors[0].message);
            }
        });
}

export function createNewCafePage() {
    let cafe = {
        cafeName: 'Новое кафе',
        imgSrc: 'https://justwoman.club/wp-content/uploads/2017/12/photo.jpg',
        event: {
            type: 'change',
            listener: handleImageUpload
        },
        form: {
            formFields: [
                {
                    type: 'text',
                    id: 'name',
                    data: 'Название',
                },
                {
                    type: 'text',
                    id: 'address',
                    data: 'Адрес',
                },
                {
                    type: 'text',
                    id: 'description',
                    data: 'Описание',
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
    (new CafeComponent(cafeElement)).render(cafe);

}