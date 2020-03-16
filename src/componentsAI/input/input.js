'use strict';

import './input.css';
import InputTemplate from './input.hbs';


export default class CardFormComponent {

    constructor(parent = document.body) {
        this._parent = parent;
    }

    _addListener(context){
        if('button' in context && 'event' in context){
            const button = this._parent.getElementsByClassName('button').item(0);
            button.addEventListener(
                context['event']['type'],
                context['event']['listener']
            );
        }
    }

    render(context) {
        this._parent.innerHTML = InputTemplate(context);
        this._addListener(context);
    }
}