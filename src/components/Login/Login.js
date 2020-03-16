'use strict';
import './login.css';
import loginTemplate from '../Register/registerTopBar.hbs';
import loginForm from './loginBottomBar.hbs';
import {ajax} from '../../modules/ajax';
import {constants} from "../../utils/constants";
import {showError} from "../../modules/formValidator";
import {Router} from "../../modules/Router";

/**
 * Логинит пользователя по логину и паролю
 * @param email Значение почты
 * @param password Значение пароль
 * @param form передаю форму для обработки ошибки
 */
export function doLogin(email, password, form) {
    ajax('POST', constants.PATH + '/api/v1/owner/Login',
        {'email': email.toString(), 'password': password.toString()}
        , (response) => {
            if (response.errors === null) {
                Router.redirect('/myCafe')
            } else {
                showError(form, form.elements['email'], response.errors[0].message) // TODO проверить работу вызова ошибки при некорректном пользователе
            }
        });

}


/**
 * Функция рендерит форму логина
 * @returns {HTMLDivElement} Отредеренную форму для логина
 */
export function renderLogin() {

    let loginContainer = document.createElement('div');
    loginContainer.className = 'loginContainer';
    let topBar = document.createElement('div');
    topBar.className = 'decorateContainer';
    topBar.innerHTML = loginTemplate({name: 'Логин'});
    loginContainer.appendChild(topBar);

    let form = document.createElement('div');
    form.className = 'formContainer';
    form.innerHTML = loginForm({email: 'Почта', password: 'Пароль'});
    loginContainer.appendChild(form);
    form = form.firstElementChild;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        //validateForm()
        const email = form.elements['email'].value;
        const password = form.elements['password'].value;
        doLogin(email, password, form);

    });
    let reg = form.getElementsByClassName('form-field__need-register__reg-span').item(0); // window.location.hash = '#profile';
    reg.addEventListener('click',function () {
        Router.redirect('/reg')
    });

    return loginContainer;

}




