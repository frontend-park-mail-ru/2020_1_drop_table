'use strict';

import './decorator.css';
import DecoratorTemplate from './decorator.hbs';

export default class DecoratorComponent {

    constructor(parent = document.body) {
        this._parent = parent;
    }

    render(context) {
        console.log('decorator');
        this._parent.innerHTML = DecoratorTemplate(context);
    }
}
