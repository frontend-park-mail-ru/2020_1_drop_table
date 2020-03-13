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

    _renderFields(storeCard){
        let fieldsContainer = this._parent.getElementsByClassName('card__header__fields').item(0);
        const secondaryFields = storeCard['secondaryFields'];
        const auxiliaryFields = storeCard['auxiliaryFields'];
        for (let i = 0 ; i < secondaryFields.length; i++){
            (new SecondaryFieldComponent(fieldsContainer)).render(secondaryFields[i]);
        }
        for (let i = 0 ; i < auxiliaryFields.length; i++){
            (new AuxiliaryFieldComponent(fieldsContainer)).render(auxiliaryFields[i]);
        }
    }
    _renderPrimaryFields(storeCard){
        let fieldsContainer = this._parent.getElementsByClassName('card__strip__fields').item(0);
        const primaryFields = storeCard['primaryFields'];
        for (let i = 0 ; i < primaryFields.length; i++){
            (new PrimaryFieldComponent(fieldsContainer)).render(primaryFields[i]);
        }

    }
    _renderCardHeader(headerFields){
        let fieldsContainer = this._parent.getElementsByClassName('card__header').item(0);
        (new CardHeaderComponent(fieldsContainer)).render(headerFields);


    }

    render(context) {
        this._parent.innerHTML = CardApple(context);
        this._renderCardHeader(context['headerFields']);
        this._renderPrimaryFields(context['storeCard']);
        this._renderFields(context['storeCard']);
    }
}
