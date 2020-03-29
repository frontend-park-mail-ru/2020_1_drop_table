'use strict';

import './Cafe.css';
import CafeTemplate from './Cafe.hbs';
import Form from '../Form/Form.js';

export default class CafeComponent {

    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
        this._form = new Form;
    }

    _addListener(context) {
        const element =
            document.getElementsByClassName(
                'new-cafe-page__outer__sub__image-container__photo-container__image-picker_input').item(0);
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
        console.log('render Profile');
        this._addListener(context);
        console.log('add l');
        this.renderForm(context['form']);
    }
}
