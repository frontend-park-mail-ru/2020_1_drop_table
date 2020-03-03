'use strict';

import './cafe.css';
import CafeTemplate from './cafe.hbs';
import Form from '../form/form.js';

export default class CafeComponent {

    constructor(parent = document.body) {
        this._parent = parent;
        this._form = new Form;
    }

    _addListener(context) {
        const element = document.getElementById('upload');
        element.addEventListener(
            context['event']['type'],
            context['event']['listener']
        );
    }

    renderProfile(context){
        this._parent.innerHTML = CafeTemplate(context);
        let formCollection = document.getElementsByClassName('new-cafe-page__outer__sub__form-container__form-field');
        this._form = new Form(formCollection.item(0));
    }

    renderForm(context){
        this._form.render(context);
    }

    render(context) {
        this.renderProfile(context);
        console.log('render profile');
        this._addListener(context);
        console.log('add l');
        this.renderForm(context['form']);
    }
}
