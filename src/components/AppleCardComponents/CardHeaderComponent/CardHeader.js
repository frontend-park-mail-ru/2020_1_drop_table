'use strict';
import CardHeader from './CardHeader.hbs';
import {HeaderFieldComponent} from "../HeaderFieldComponent/HeaderField";
export class CardHeaderComponent {
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    render(context) {
        this._parent.innerHTML += CardHeader(context);

        let fieldsContainer = this._parent.getElementsByClassName('header-fields-container').item(0);
        fieldsContainer.innerHTML = '';
        for (let i = 1 ; i < context.headerFields.length; i++){
            (new HeaderFieldComponent(fieldsContainer)).render(context.headerFields[i]);
        }

    }
}
