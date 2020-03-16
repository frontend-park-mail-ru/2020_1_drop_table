'use strict';

import './cardFrom.css';
import CardFormTemplate from './cardFrom.hbs';
import InputComponent from '../input/input.js'

export default class CardFormComponent {

    constructor(parent = document.body) {
        this._parent = parent;
    }

    _renderInputs(context){
        const inputFields = this._parent.getElementsByClassName('InputField');
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


