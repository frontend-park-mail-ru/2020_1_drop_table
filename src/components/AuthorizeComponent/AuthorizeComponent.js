'use strict';

import './AuthorizeComponent.scss';
import AuthorizeTemplate from './AuthorizeComponent.hbs';
import Form from '../Form/Form.js';


export default class AuthorizeComponent {

    /**
     * Инициализация компоненты
     * @param {Element} parent элемент
     */
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
        this._form = new Form;
    }

    /**
     * Добавление листенеров на элементы
     * @param {obj} context
     * @private
     */
    _addListener(context) {

    }


    /**
     * Отрисовка шаблона
     * @param {obj} context
     */
    renderTemplate(context){
        this._parent.innerHTML = AuthorizeTemplate(context);
        let formCollection = document.getElementsByClassName('authorize__form-container__form').item(0);
        this._form = new Form(formCollection);
    }

    /**
     * Отрисовка формы
     * @param {obj} context некоторый контекст с информацией о кафе
     */
    renderForm(context){
        this._form.render(context);
    }

    /**
     * Отрисовка компоненты авторизации
     * @param {obj} context
     */
    render(context) {
        this.renderTemplate(context);
        this._addListener(context);
        console.log(context['form']);
        this.renderForm(context['form']);
    }
}
