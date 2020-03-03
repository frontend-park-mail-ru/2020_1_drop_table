'use strict';
import './CardCreatorForm.css';
import CardForm from './CardCreatorForm.hbs';


export class CardCreatorFormComponent {
    constructor(parent = document.body) {
        this._parent = parent;
    }

    render(context) {
        this._parent.innerHTML = CardForm(context);
    }
}
