'use strict';
import './Login.css';
import LoginTemplate from '../Register/RegisterTopBar.hbs';
import LoginFormTemplate from './Login.hbs';

export default class LoginComponent{
    constructor(parent) {
        this._parent = parent;
        this._form = null;
    }

    _addListeners(context){
        this._form.addEventListener(context['form']['event']['type'],
            context['form']['event']['listener']);

        let register = document.getElementById('application').getElementsByClassName('form-field__need-register__reg-span').item(0);
        register.addEventListener(context['register']['event']['type'],
            context['register']['event']['listener']);
    }

    _renderTopBar(){
        let topBar = document.createElement('div');
        topBar.className = 'decorateContainer';
        topBar.innerHTML = LoginTemplate({name: 'Логин'});
        this._parent.appendChild(topBar);
    }

    _renderForm(){
        let form = document.createElement('div');
        form.className = 'formContainer';
        form.innerHTML = LoginFormTemplate({email: 'Почта', password: 'Пароль'});
        this._parent.appendChild(form);
        this._form = form.firstElementChild;
    }

    render(context){
        this._renderTopBar();
        this._renderForm();
        this._addListeners(context);
    }
}




