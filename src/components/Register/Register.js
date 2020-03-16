'use strict';

import registerTemplate from './RegisterTopBar.hbs';
import './Styles.css';
import registerFormTemplate from './RegisterForm.hbs';
import {showError, validateForm} from '../../modules/formValidator';
import {constants} from '../../utils/constants';
import {ajax} from '../../utils/ajax.js';
import {Router} from "../../modules/Router";

const app = document.body;

/**
 * Создает форма регистрации
 * @returns {HTMLDivElement} Отредоренная форма регистрации
 */
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
            ajax(constants.PATH + '/api/v1/owner',
                'POST',
                {'name': name.value.toString(), 'email': email.value.toString(), 'password': password.value.toString()},
                (response) => {
                    if (response.errors === null) {
                        Router.redirect('/myCafe')
                    } else {
                        if (response.errors[0].message[0] === 'P') {
                            showError(form, password, response.errors[0].message);
                        } else if (response.errors[0].message[0] === 'N') {
                            showError(form, name, response.errors[0].message);
                        } else {
                            showError(form, email, response.errors[0].message);
                        }
                    }
                }
            );
        }
    });
    let login = form.getElementsByClassName('form-field__have-account__login-span').item(0); // window.location.hash = '#profile';
    login.addEventListener('click',function () {
        Router.redirect('/Login')
    });

    return registerContainer;

}





