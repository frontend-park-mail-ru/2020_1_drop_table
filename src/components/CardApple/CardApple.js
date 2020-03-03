'use strict';
import './CardApple.css';
import CardApple from './CardApple.hbs';


export class CardAppleComponent {
    constructor(parent = document.body) {
        this._parent = parent;
    }

    render(context) {
        this._parent.innerHTML = CardApple(context);
    }
}
