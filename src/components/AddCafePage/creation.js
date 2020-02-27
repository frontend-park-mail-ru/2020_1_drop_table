import {handleImageUpload} from '../../modules/imageUpload';
import CafeComponent from '../../componentsAI/cafe/cafe';

let app = document.body;

function ajaxAddCafe(route, formData, callback) {
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
            console.log(err);
        });
}

function addCafe(e) {
    e.preventDefault();
    const form = document.getElementsByClassName('cafeFormField').item(0);
    const photoInput = document.getElementById('upload');

    const name = form.elements['name'].value;
    const address = form.elements['address'].value;
    const description = form.elements['description'].value;

    const photo = photoInput.files[0];

    let formData = new FormData();
    formData.append('jsonData', JSON.stringify({
        'name': name.toString(),
        'address': address.toString(),
        'description': description.toString()
    }));

    if (photo) {
        formData.append('photo', photo);
    }

    ajaxAddCafe('http://80.93.177.185:8080/api/v1/cafe',
        formData
        , (response) => {
            if (response.errors === null) {
                window.location.href = '#myCafe';
            } else {
                alert(response.errors[0].message); //TODO showError
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