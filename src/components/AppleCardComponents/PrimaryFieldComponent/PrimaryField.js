'use strict';
import PrimaryField from './PrimaryField.hbs';
export class PrimaryFieldComponent {
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    render(context) {
        this._parent.innerHTML += PrimaryField(context);
    }
}
