'use strict';

import './Form.css';
import FormTemplate from './Form.hbs';

export default class FormComponent {

    constructor(parent = document.body) {
        this._parent = parent;
    }

    _handlePromises(context){
        const inputElementsCollection = this._parent.getElementsByClassName('input-field_input');
        context['formFields'].forEach((form, index) => {
            let inputElement = inputElementsCollection.item(index);
            if('inputPromise' in form){
                form['inputPromise'].then((value) => {
                    inputElement.value = value;
                });
            }
        }, (exception) => {
            alert(exception); //TODO Сделать обработку ошибки
        });
    }

    _addListener(context){
        this._parent.addEventListener(
            context['event']['type'],
            context['event']['listener']
        );
    }

    render(context) {
        this._parent.innerHTML = FormTemplate(context);
        this._addListener(context);
        this._handlePromises(context);
    }
}
