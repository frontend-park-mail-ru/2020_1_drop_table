'use strict';
import './CardApple.css';
import CardApple from './CardApple.hbs';
import {SecondaryFieldComponent} from "../AppleCardComponents/SecondaryFieldComponent/SecondaryField";
import {AuxiliaryFieldComponent} from "../AppleCardComponents/AuxiliaryFieldComponent/AuxiliaryField";
import {PrimaryFieldComponent} from "../AppleCardComponents/PrimaryFieldComponent/PrimaryField";
import {CardHeaderComponent} from "../AppleCardComponents/CardHeaderComponent/CardHeader";


export class CardAppleComponent {
    constructor(parent = document.body) {
        this._parent = parent;
    }

    _renderFields(secondaryFields, auxiliaryFields){
        let fieldsContainer = this._parent.getElementsByClassName('card__header__fields').item(0);
        fieldsContainer.innerHTML = '';
        for (let i = 0 ; i < secondaryFields.length; i++){
            (new SecondaryFieldComponent(fieldsContainer)).render(secondaryFields[i]);
        }
        for (let i = 0 ; i < auxiliaryFields.length; i++){
            (new AuxiliaryFieldComponent(fieldsContainer)).render(auxiliaryFields[i]);
        }
    }
    _renderPrimaryFields(primaryFields){
        let fieldsContainer = this._parent.getElementsByClassName('card__strip__fields').item(0);
        fieldsContainer.innerHTML = '';
        for (let i = 0 ; i < primaryFields.length; i++){
            (new PrimaryFieldComponent(fieldsContainer)).render(primaryFields[i]);
        }
    }
    _renderCardHeader(headerFields){
        let fieldsContainer = this._parent.getElementsByClassName('card__header').item(0);
        fieldsContainer.innerHTML = '';
        (new CardHeaderComponent(fieldsContainer)).render(headerFields);
    }



    render(context) {
        this._parent.innerHTML = CardApple(context);
        this._renderCardHeader(context['headerFields'][0]);
        this._renderPrimaryFields(context['primaryFields']);
        this._renderFields(context['secondaryFields'], context['auxiliaryFields']);
    }
}
