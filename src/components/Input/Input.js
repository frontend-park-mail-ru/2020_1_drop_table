'use strict';

import './Input.css';
import InputTemplate from './Input.hbs';

export default class CardFormComponent {

    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    _addListener(context){
        if('button' in context && 'event' in context){
            const button = this._parent.getElementsByClassName('button').item(0);
            button.addEventListener(
                context['event']['type'],
                (e) => context['event']['listener'](e,context)
            );
        }
    }

    render(context) {
        this._parent.innerHTML = InputTemplate(context);
        this._addListener(context);
    }
}

