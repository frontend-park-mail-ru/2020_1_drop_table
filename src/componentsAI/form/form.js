'use strict';

import './form.css';
import FormTemplate from './form.hbs';

export default class FormComponent {

    constructor(parent = document.body) {
        this._parent = parent;
    }

    _addListener(context){
        const element = document.getElementById('submit');
        element.addEventListener(
            context['event']['type'],
            context['event']['listener']
        );
    }

    render(context) {
        this._parent.innerHTML = FormTemplate(context);
        this._addListener(context);
    }
}
