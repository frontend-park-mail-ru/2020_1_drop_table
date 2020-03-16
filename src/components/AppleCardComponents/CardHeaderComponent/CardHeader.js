'use strict';
import CardHeader from './CardHeader.hbs';
export class CardHeaderComponent {
    constructor(parent = document.body) {
        this._parent = parent;
    }

    render(context) {
        this._parent.innerHTML += CardHeader(context);
    }
}
