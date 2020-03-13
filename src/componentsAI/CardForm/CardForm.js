'use strict';

import './CardForm.css';
import CardFormTemplate from './CardForm.hbs';
import InputComponent from '../Input/Input'

export default class CardFormComponent {

    constructor(parent = document.body) {
        this._parent = parent;
    }

    _renderInputs(context){
        const inputFields = this._parent.getElementsByClassName('card-form__input-field');
        [...inputFields].forEach((inputField, id) => {
            const input = new InputComponent(inputField);
            input.render(context['cardFormFields'][id]);
        });
    }

    render(context) {
        this._parent.innerHTML = CardFormTemplate(context);
        this._renderInputs(context);
    }
}
