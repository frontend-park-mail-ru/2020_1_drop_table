'use strict';

import RegisterTemplate from './RegisterTopBar.hbs';
import './Styles.css';
import RegisterFormTemplate from './RegisterForm.hbs';
import {showError, validateForm} from '../../modules/formValidator';
import {Router} from "../../modules/Router";
import UserModel from "../../models/UserModel";

// const app = document.body;
//
// /**
//  * Создает форма регистрации
//  * @returns {HTMLDivElement} Отредоренная форма регистрации
//  */
// export function renderRegister() {
//
//     let registerContainer = document.createElement('div');
//     registerContainer.className = 'registerContainer';
//     let topBar = document.createElement('div');
//     topBar.className = 'decorateContainer';
//     topBar.innerHTML = registerTemplate({name: 'Регистрация'});
//     registerContainer.appendChild(topBar);
//
//     let form = document.createElement('div');
//     form.className = 'formContainer';
//     form.innerHTML = registerFormTemplate({
//         name: 'Имя',
//         email: 'Почта',
//         password: 'Пароль',
//         repeatedPassword: 'Повторите пароль',
//     });
//     registerContainer.appendChild(form);
//     form = form.firstElementChild;
//     form.addEventListener('submit', function (e) {
//         e.preventDefault();
//         if (validateForm(form)) {
//             const email = form.elements['email'];
//             const password = form.elements['password'];
//             const name = form.elements['full-name'];
//
//             const user = new UserModel();
//             user.email = email.value.toString();
//             user.password = password.value.toString();
//             user.name = name.value.toString();
//             user.register().then(
//                 () => {},
//                 errorMessage => {
//                     if (errorMessage[0] === 'P') {
//                         showError(form, password, errorMessage);
//                     } else if (errorMessage[0] === 'N') {
//                         showError(form, name, errorMessage);
//                     } else {
//                         showError(form, email, errorMessage);
//                     }
//                 });
//
//         }
//     });
//     let login = form.getElementsByClassName('form-field__have-account__login-span').item(0); // window.location.hash = '#Profile';
//
//     login.addEventListener('click',function () {
//         Router.redirect('/login')
//     });
//
//     return registerContainer;
// }


export default class RegisterComponent{
    constructor(parent) {
        this._parent = parent;
        this._form = null;
    }

    _addListeners(context){
        this._form.addEventListener(context['form']['event']['type'],
            context['form']['event']['listener']);

        let login = document.getElementsByClassName('form-field__have-account__login-span').item(0);
        login.addEventListener(context['login']['event']['type'],
            context['login']['event']['listener']);
    }

    _renderTopBar(){
        let topBar = document.createElement('div');
        topBar.className = 'decorateContainer';
        topBar.innerHTML = RegisterTemplate({name: 'Регистрация'});
        this._parent.appendChild(topBar);
    }

    _renderForm(){
        let form = document.createElement('div');
        form.className = 'formContainer';
        form.innerHTML = RegisterFormTemplate({
            name: 'Имя',
            email: 'Почта',
            password: 'Пароль',
            repeatedPassword: 'Повторите пароль',
        });
        this._parent.appendChild(form);
        this._form = form.firstElementChild;
    }

    render(context){
        this._renderTopBar();
        this._renderForm();
        this._addListeners(context);
    }
}




