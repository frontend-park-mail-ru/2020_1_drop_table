'use strict';
import './Login.css';
import LoginTemplate from '../Register/RegisterTopBar.hbs';
import LoginFormTemplate from './Login.hbs';

/**
 * Функция рендерит форму логина
 * @returns {HTMLDivElement} Отредеренную форму для логина
 */
// export function renderLogin() {
//
//     let loginContainer = document.createElement('div');
//     loginContainer.className = 'loginContainer';
//     let topBar = document.createElement('div');
//     topBar.className = 'decorateContainer';
//     topBar.innerHTML = loginTemplate({name: 'Логин'});
//     loginContainer.appendChild(topBar);
//
//     let form = document.createElement('div');
//     form.className = 'formContainer';
//     form.innerHTML = loginForm({email: 'Почта', password: 'Пароль'});
//     loginContainer.appendChild(form);
//     form = form.firstElementChild;
//
//     form.addEventListener('submit', function (e) {
//         e.preventDefault();
//
//         const user = new UserModel();
//         user.email = form.elements['email'].value;
//         user.password = form.elements['password'].value;
//         user.login().then(()=>{}, (errorMessage) => alert(errorMessage)); //TODO
//
//     });
//
//     let reg = form.getElementsByClassName('form-field__need-register__reg-span').item(0); // window.location.hash = '#Profile';
//
//     reg.addEventListener('click',function () {
//         Router.redirect('/reg')
//     });
//
//     return loginContainer;
//
// }

export default class LoginComponent{
    constructor(parent) {
        this._parent = parent;
        this._form = null;
    }

    _addListeners(context){
        this._form.addEventListener(context['form']['event']['type'],
            context['form']['event']['listener']);

        let register = document.body.getElementsByClassName('form-field__need-register__reg-span').item(0);
        register.addEventListener(context['register']['event']['type'],
            context['register']['event']['listener']);
    }

    _renderLogin(){
        let topBar = document.createElement('div');
        topBar.className = 'decorateContainer';
        topBar.innerHTML = LoginTemplate({name: 'Логин'});
        this._parent.appendChild(topBar);

        let form = document.createElement('div');
        form.className = 'formContainer';
        form.innerHTML = LoginFormTemplate({email: 'Почта', password: 'Пароль'});
        this._parent.appendChild(form);
        this._form = form.firstElementChild;
    }

    render(context){
        this._renderLogin();
        this._addListeners(context);
    }
}




