'use strict';
import HeaderField from './HeaderField.hbs';
export class HeaderFieldComponent {
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    render(context) {
        this._parent.innerHTML += HeaderField(context);
    }
}
