'use strict';
import './CardApple.css';
import CardApple from './CardApple.hbs';
import {SecondaryFieldComponent} from "../AppleCardComponents/SecondaryFieldComponent/SecondaryField";

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
        // for (let i = 0 ; i < auxiliaryFields.length; i++){
        //     (new AuxiliaryFieldComponent(fieldsContainer)).render(auxiliaryFields[i]);
        // }

    }
    _renderPrimaryFields(primaryFields){
        let fieldsContainer = this._parent.getElementsByClassName('card__strip__fields').item(0);
        fieldsContainer.innerHTML = '';
        for (let i = 0 ; i < primaryFields.length; i++){
            (new PrimaryFieldComponent(fieldsContainer)).render(primaryFields[i]);
        }
    }
    _renderCardHeader(headerData){
        let container = this._parent.getElementsByClassName('card__header').item(0);
        container.innerHTML = '';
        (new CardHeaderComponent(container)).render(headerData);

    }


    _renderForegroundColor(foregroundColor){
        let logoText = document.getElementsByClassName('card__header__field_span').item(0);
        logoText.style.color = foregroundColor;

        let fieldsContainer = this._parent.getElementsByClassName('card__header__fields').item(0);

        let secondaryValues = fieldsContainer.getElementsByClassName('card__header__fields__secondary_spanValue');
        for ( let i = 0; i < secondaryValues.length; i++ ){
            secondaryValues.item(i).style.color = foregroundColor;
        }

        // let auxiliaryValues = fieldsContainer.getElementsByClassName('card__header__fields__auxiliary_spanValue');
        // for ( let i = 0; i < auxiliaryValues.length; i++ ){
        //     auxiliaryValues.item(i).style.color = foregroundColor;
        // }

        let headerValues = document.getElementsByClassName('header-field_span_value');
        for ( let i = 0; i < headerValues.length; i++ ){
            headerValues.item(i).style.color = foregroundColor;
        }


    }
    _renderBackgroundColor(backgroundColor){
        let card = document.getElementsByClassName('card').item(0);
        card.style.background = backgroundColor;
    }
    _renderStrip(stripImageSrc){
        let cardStrip = document.getElementsByClassName('card__strip').item(0);
        cardStrip.style.backgroundImage = `url(${stripImageSrc})`;
    }

    _renderLabelColor(labelColor){
        let fieldsContainer = this._parent.getElementsByClassName('card__header__fields').item(0);
        let secondaryLabels = fieldsContainer.getElementsByClassName('card__header__fields__secondary_spanLabel');
        // let auxiliaryLabels = fieldsContainer.getElementsByClassName('card__header__fields__auxiliary_spanLabel');
        let headerLabels = document.getElementsByClassName('header-field_span_label');

        for ( let i = 0; i < secondaryLabels.length; i++ ){
            secondaryLabels.item(i).style.color = labelColor;
        }
        // for ( let i = 0; i < auxiliaryLabels.length; i++ ){
        //     auxiliaryLabels.item(i).style.color = labelColor;
        // }
        for ( let i = 0; i < headerLabels.length; i++ ){
            headerLabels.item(i).style.color = labelColor;
        }
    }

    _renderStyles(context){
        this._renderForegroundColor(context.foregroundColor);
        this._renderBackgroundColor(context.backgroundColor);
        this._renderStrip(context.stripImageSrc);
        this._renderLabelColor(context.labelColor);
    }

    render(context) {
        const headerData = {
            logoImageSrc: context['logoImageSrc'],
            labelText: context['headerFields'][0].labelText,
            headerFields: context['headerFields'],

        };
        this._parent.innerHTML = CardApple(context);
        this._renderCardHeader(headerData);
        this._renderPrimaryFields(context['primaryFields']);
        this._renderFields(context['secondaryFields'],context['auxiliaryFields']);
        this._renderStyles(context);

    }
}
