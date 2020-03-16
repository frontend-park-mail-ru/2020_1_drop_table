'use strict';

import './Decorator.css';
import DecoratorTemplate from './Decorator.hbs';

export default class DecoratorComponent {

    constructor(parent = document.body) {
        this._parent = parent;
    }

    render(context) {

        this._parent.innerHTML = DecoratorTemplate(context);
    }
}
