'use strict';
import SecondaryField from './SecondaryField.hbs';
export class SecondaryFieldComponent {
    constructor(parent = document.body) {
        this._parent = parent;
    }

    render(context) {
        this._parent.innerHTML += SecondaryField(context);
    }
}
