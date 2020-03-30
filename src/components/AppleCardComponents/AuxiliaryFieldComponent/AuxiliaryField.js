'use strict';
import AuxiliaryField from './AuxiliaryField.hbs';
export class AuxiliaryFieldComponent {
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    render(context) {
        this._parent.innerHTML += AuxiliaryField(context);
    }
}
