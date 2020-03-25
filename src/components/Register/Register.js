'use strict';

import RegisterTemplate from './RegisterTopBar.hbs';
import RegisterFormTemplate from './RegisterForm.hbs';
import './Styles.css';

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

    _renderTopBar(topBarText){
        let topBar = document.createElement('div');
        topBar.className = 'decorateContainer';
        topBar.innerHTML = RegisterTemplate({name: topBarText});
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

    render(context,topBarText){
        this._renderTopBar(topBarText);
        this._renderForm();
        this._addListeners(context);
    }
}




