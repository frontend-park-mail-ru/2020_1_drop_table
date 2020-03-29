'use strict';

import './Profile.css';
import ProfileTemplate from './Profile.hbs';
import Form from '../Form/Form.js';

export default class ProfileComponent {

    constructor(parent = document.body) {
        this._parent = parent;
        this._form = null;
    }

    _addListener(context) {
        const element = this._parent.getElementsByClassName('user-profile__header__logo-container_image-picker_input').item(0);
        element.addEventListener(
            context['event']['type'],
            context['event']['listener']
        );
    }

    _handlePromises(context){
        if ('imgSrcPromise' in context){
            context['imgSrcPromise'].then((imgSrc) => {
                let imageElement = this._parent.getElementsByClassName(
                    'user-profile__header__logo-container_image-picker_img').item(0);
                imageElement.src = imgSrc;
            }, (exception) => {
                alert(exception); //TODO Сделать обработку ошибки
            })
        }
    }

    renderProfile(context){
        this._parent.innerHTML += ProfileTemplate(context);
        let formCollection = this._parent.getElementsByClassName('user-profile__form-container__form-field').item(0);
        this._form = new Form(formCollection);
    }

    renderForm(context){
        this._form.render(context);
    }

    render(context) {
        this.renderProfile(context);
        this.renderForm(context['form']);
        this._addListener(context);
        this._handlePromises(context);
    }
}
