'use strict';
import './Login.css';
import LoginTemplate from '../Register/RegisterTopBar.hbs';
import LoginFormTemplate from './Login.hbs';

/** Компонента логина */
export default class LoginComponent{

    /**
     * Инициализация компоненты логина
     * @param {Element} parent элемент в котором будет располагаться компонента лендинга
     */
    constructor(parent) {
        this._parent = parent;
        this._form = null;
    }

    /**
     * Добавление листенеров на элементы
     * @param {obj} context некоторый контекст с информацией о странице логина
     * @private
     */
    _addListeners(context){
        this._form.addEventListener(context['form']['event']['type'],
            context['form']['event']['listener']);

        let register = document.getElementById('application').getElementsByClassName('form-field__need-register__reg-span').item(0);
        register.addEventListener(context['register']['event']['type'],
            context['register']['event']['listener']);
    }

    /** Отрисока TopBar */
    _renderTopBar(){
        let topBar = document.createElement('div');
        topBar.className = 'decorateContainer';
        topBar.innerHTML = LoginTemplate({name: 'Логин'});
        this._parent.appendChild(topBar);
    }

    /** Отрисока формы */
    _renderForm(){
        let form = document.createElement('div');
        form.className = 'formContainer';
        form.innerHTML = LoginFormTemplate({email: 'Почта', password: 'Пароль'});
        this._parent.appendChild(form);
        this._form = form.firstElementChild;
    }

    /**
     * Отрисока компоненты логина
     * @param {obj} context некоторый контекст с информацией о странице логина
     */
    render(context){
        this._renderTopBar();
        this._renderForm();
        this._addListeners(context);
    }
}




