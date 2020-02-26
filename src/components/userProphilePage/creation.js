import {ajaxCreateCafe} from "../myCafePage/creation";
import ProfileComponent from "../../componentsAI/profile/profile";
import {handleImageUpload} from "../../modules/imageUpload";
import {validateForm} from "../../modules/formValidator";


function ajaxChangeUserData(route, formData, callback) {
    let h = new Headers();
    h.append('Accept', '*/*');
    h.append('Content-type', 'multipart/form-data');
    h.append('Access-Control-Allow-Origin', '*');
    let req = new Request(route, {
        method: 'PUT',
        mode: 'cors',
        body: formData,
// headers: h,
        credentials: 'include',
    });
    fetch(req)
        .then((response) => {
            console.log('response ' + response);
            if (response.ok) {
                return null;
            } else {
                throw new Error('BAD HTTP stuff');
            }
        })
        .then((formData) => {
            callback(formData);
        })
        .catch((err) => {
            console.log('no response ');
            console.log('ERROR:', err.message);
        });

}

function changeUserProfile(e) {
    e.preventDefault();
    console.log('Cookie in changeUserProfile' + document.cookie);
    const form = document.getElementsByClassName('formField').item(0);
    const photoInput = document.getElementById('upload');
    const id = form.elements['userId'].value;
    const name = form.elements['name'].value;
    const email = form.elements['email'].value;
    const password1 = form.elements['password'].value;
    const photo = photoInput.files[0];
    if (validateForm(form)) {
        let formData = new FormData();
        formData.append('jsonData', JSON.stringify({
            'name': name.toString(),
            'email': email.toString(),
            'password': password1.toString()
        }));
        if (photo) {
            formData.append('photo', photo);
        }
        ajaxChangeUserData('http://80.93.177.185:8080/api/v1/owner/' + id,
            formData
            , (response) => {
                console.log('RESPONSE change user', response);
                if (response === null) {
                    alert('Данные изменены');
                } else {
                    alert(response.errors[0].message);
                }
            });
    }


}


export function createUserProfilePage(app) {

    ajaxCreateCafe('http://80.93.177.185:8080/api/v1/getCurrentOwner/',
        {}, (response) => {
            console.log('RESPONSE1', response);
            if (response.errors === null) {

                let profile = {
                    imgSrc: response.data['photo'],
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
                                id: 'password',
                                data: response.data['password'],
                            },
                            {
                                type: 'password',
                                id: 're-password',
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