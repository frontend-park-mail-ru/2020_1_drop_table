import {ajaxCreateCafe} from "../myCafePage/creation";
import ProfileComponent from "../../componentsAI/profile/profile";
import {handleImageUpload} from "../../modules/imageUpload";





function ajaxChangeUserData(route, body, callback) {
    let h = new Headers();
    h.append('Accept', '*/*');
    h.append('Content-type', 'multipart/form-data');
    let formData = new FormData();
    formData.append('jsonData', JSON.stringify(body));
    let req = new Request(route, {
        method: 'PUT',
        mode: 'cors',
        body: formData,
        headers: h,
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

function changeUserProfile(e) {
    e.preventDefault();
    const form = document.getElementsByClassName('formField').item(0);
    const id = form.elements['userId'].value;
    const name = form.elements['name'].value;
    const email = form.elements['email'].value;
    const password1 = form.elements['password1'].value;
    const password2 = form.elements['password2'].value;
    if (password1 === password2) {
        let route = `http://80.93.177.185:8080/api/v1/owner/${id}`;
        alert(route + '\n' + document.cookie);
        ajaxChangeUserData(route,
            {'name': name.toString(), 'email': email.toString(), 'password': password1.toString()}
            , (response) => {
                console.log('RESPONSE change user', response);
                if (response.errors === null) {
                    alert('Данные изменены');
                } else {
                    alert(response.errors[0].message);
                }
            });
    } else {
        alert('Пароли не совпадают');
    }


}


export function createUserProfilePage(app) {

    ajaxCreateCafe('http://80.93.177.185:8080/api/v1/getCurrentOwner/',
        {}, (response) => {
            console.log('RESPONSE1', response);
            if (response.errors === null) {

                let profile = {
                    imgSrc: 'https://justwoman.club/wp-content/uploads/2017/12/photo.jpg',
                    event: {
                        type: 'change',
                        listener: handleImageUpload
                    },
                    form: {
                        formFields: [
                            {
                                type: 'text',
                                id: 'userId',
                                data: response.data['id'],
                            },
                            {
                                type: 'text',
                                id: 'name',
                                data: response.data['name'],
                            },
                            {
                                type: 'email',
                                id: 'email',
                                data: response.data['email'],
                            },
                            {
                                type: 'password',
                                id: 'password1',
                                data: response.data['password'],
                            },
                            {
                                type: 'password',
                                id: 'password2',
                                data: response.data['password'],
                            },
                        ],
                        submitValue: 'Готово',
                        event: {
                            type: 'submit',
                            listener: changeUserProfile
                        },
                    },
                };
                (new ProfileComponent(app)).render(profile);
            } else {
                alert(response.errors[0].message);
            }
        });


}