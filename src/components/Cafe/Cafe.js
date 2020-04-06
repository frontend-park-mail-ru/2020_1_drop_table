'use strict';

import './Cafe.scss';
import CafeTemplate from './Cafe.hbs';
import Form from '../Form/Form.js';

/** Компонента страницы кафе */
export default class CafeComponent {

    /**
     * Инициализация компоненты страницы кафе
     * @param {Element} parent элемент в котором будет располагаться компонента страницы кафе
     */
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
        this._form = new Form;
    }

    /**
     * Добавление листенеров на элементы
     * @param {obj} context некоторый контекст с информацией о кафе
     * @private
     */
    _addListener(context) {
        const element =
            document.getElementsByClassName(
                'new-cafe-page__outer__sub__image-container__photo-container__image-picker_input').item(0);
        element.addEventListener(
            context['event']['type'],
            context['event']['listener']
        );
    }

    async _handlePromises(context){
        const photo = await context.imgSrcPromise;
        let img = this._parent.getElementsByClassName('new-cafe-page__outer__sub__image-container__photo-container__image-picker_img').item(0);
        img.src = photo;
    }

    /**
     * Отрисовка кафе
     * @param {obj} context некоторый контекст с информацией о кафе
     */
    renderProfile(context){
        this._parent.innerHTML = CafeTemplate(context);
        let formCollection = document.getElementsByClassName('new-cafe-page__outer__sub__form-container__form-field');
        this._form = new Form(formCollection.item(0));
    }

    /**
     * Отрисовка формы
     * @param {obj} context некоторый контекст с информацией о кафе
     */
    renderForm(context){
        this._form.render(context);
    }

    /**
     * Отрисовка компоненты страницы кафе
     * @param {obj} context некоторый контекст с информацией о кафе
     */
    render(context) {
        this.renderProfile(context);
        this._addListener(context);
        this.renderForm(context['form']);
        this._handlePromises(context);
    }
}
