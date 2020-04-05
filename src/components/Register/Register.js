'use strict';

import RegisterTemplate from './RegisterTopBar.hbs';
import RegisterFormTemplate from './RegisterForm.hbs';
import './Styles.css';

/** Компонента регистрации */
export default class RegisterComponent{

    /**
     * Инициализация компоненты регистрации
     * @param {Element} parent элемент в котором будет располагаться компонента регистрации
     */
    constructor(parent) {
        this._parent = parent;
        this._form = null;
    }

    /**
     * Добавление листенеров на элементы
     * @param {obj} context некоторый контекст с информацией о регистрации
     * @private
     */
    _addListeners(context){
        this._form.addEventListener(context['form']['event']['type'],
            context['form']['event']['listener']);

        let login = document.getElementsByClassName('form-field__have-account__login-span').item(0);
        login.addEventListener(context['login']['event']['type'],
            context['login']['event']['listener']);
    }

    /**
     * Отрисовка topBar
     * @param {obj} context некоторый контекст с информацией о регистрации
     * @private
     */
    _renderTopBar(topBarText){
        let topBar = document.createElement('div');
        topBar.className = 'decorateContainer';
        topBar.innerHTML = RegisterTemplate({name: topBarText});
        this._parent.appendChild(topBar);
    }

    /**
     * Отрисовка формы
     * @param {obj} context некоторый контекст с информацией о регистрации
     * @private
     */
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

    /**
     * Отрисовка компоненты регистрации
     * @param {obj} context некоторый контекст с информацией о регистрации
     * @private
     */
    render(context,topBarText){
        this._renderTopBar(topBarText);
        this._renderForm();
        this._addListeners(context);
    }
}




