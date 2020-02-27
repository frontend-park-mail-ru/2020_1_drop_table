'use strict';

import registerTemplate from './registerTopBar.hbs';
import './styles.css';
import registerFormTemplate from './registerForm.hbs';
import {showError, validateForm} from '../../modules/formValidator';

const app = document.body;

function ajaxForReg(route, body, callback) {
    let formData = new FormData();
    formData.append('jsonData', JSON.stringify(body));
    let req = new Request(route, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: formData
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
        });
}


export function renderRegister() {

    let registerContainer = document.createElement('div');
    registerContainer.className = 'registerContainer';
    let topBar = document.createElement('div');
    topBar.className = 'decorateContainer';
    topBar.innerHTML = registerTemplate({name: 'Регистрация'});
    registerContainer.appendChild(topBar);

    let form = document.createElement('div');
    form.className = 'formContainer';
    form.innerHTML = registerFormTemplate({
        name: 'Имя',
        email: 'Почта',
        password: 'Пароль',
        repeatedPassword: 'Повторите пароль',
    });
    registerContainer.appendChild(form);
    form = form.firstElementChild;
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateForm(form)) {
            const email = form.elements['email'];
            const password = form.elements['password'];
            const name = form.elements['full-name'];
            ajaxForReg('http://80.93.177.185:8080/api/v1/owner',
                {'name': name.value.toString(), 'email': email.value.toString(), 'password': password.value.toString()}
                , (response) => {
                    if (response.errors === null) {
                        window.location.hash = 'myCafe';
                    } else {
                        if (response.errors[0].message[0] === 'P') {
                            showError(form, password, response.errors[0].message);
                        } else if (response.errors[0].message[0] === 'N') {
                            showError(form, name, response.errors[0].message);
                        } else {
                            showError(form, email, response.errors[0].message);
                        }
                    }
                });

        }
    });
    return registerContainer;

}





