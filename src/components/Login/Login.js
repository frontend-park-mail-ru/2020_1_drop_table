'use strict';
import './Login.css';
import loginTemplate from '../Register/RegisterTopBar.hbs';
import loginForm from './Login.hbs';
import {Router} from "../../modules/Router";
import UserModel from "../../models/UserModel";

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

        const user = new UserModel();
        user.email = form.elements['email'].value;
        user.password = form.elements['password'].value;
        user.login().then((errorMessage) => alert(errorMessage)); //TODO
    });

    let reg = form.getElementsByClassName('form-field__need-register__reg-span').item(0); // window.location.hash = '#Profile';

    reg.addEventListener('click',function () {
        Router.redirect('/reg')
    });

    return loginContainer;

}




