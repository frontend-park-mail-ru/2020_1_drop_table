'use strict';

import './CardForm.css';
// import  './imagePicker.css'
import CardFormTemplate from './CardForm.hbs';
import InputComponent from '../Input/Input'



export default class CardFormComponent {

    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    _renderHeaderInputs(context) {
        const inputHeaderFields = this._parent.getElementsByClassName('card-form__input-header-field');
        [...inputHeaderFields].forEach((inputField, id) => {
            const input = new InputComponent(inputField);
            input.render(context['headerFields'][id]);
        });
    }

    _renderPrimaryInputs(context) {
        const inputPrimaryFields = this._parent.getElementsByClassName('card-form__input-primary-field');
        [...inputPrimaryFields].forEach((inputField, id) => {
            const input = new InputComponent(inputField);
            input.render(context['primaryFields'][id]);
        });
    }
    _renderSecondaryInputs(context){
        const inputSecondaryFields = this._parent.getElementsByClassName('card-form__input-secondary-field');
        [...inputSecondaryFields].forEach((inputField, id) => {
            const input = new InputComponent(inputField);
            input.render(context['secondaryFields'][id]);

        });
    }
    _renderAuxiliaryFields(context){
        const inputAuxiliaryFields = this._parent.getElementsByClassName('card-form__input-auxiliary-field');
        [...inputAuxiliaryFields].forEach((inputField, id) => {
            const input = new InputComponent(inputField);
            input.render(context['auxiliaryFields'][id]);
        });
    }

    _renderInputs(context) {
        this._renderHeaderInputs(context);
        this._renderPrimaryInputs(context);
        this._renderSecondaryInputs(context);
        this._renderAuxiliaryFields(context);

    }



    render(context) {
        this._parent.innerHTML = CardFormTemplate(context);
        this._renderInputs(context);


    }
}




