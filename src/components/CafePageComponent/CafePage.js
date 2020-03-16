'use strict';
import './CafePage.css';
import CafePageTemplate from './CafePage.hbs';
import {CreateCardRedactor} from '../CardCreator/CardCreator'



export class CafePageComponent {
    constructor(parent = document.body) {
        this._parent = parent;
    }

    render(context) {
        let openTime = new Date(context.data['openTime']);
        let closeTime = new Date(context.data['closeTime']);

        let data = {
            name: context.data['name'],
            address: context.data['address'],
            description: context.data['description'],
            openTime: openTime.getHours()+':'+openTime.getMinutes(),
            closeTime: closeTime.getHours()+':'+closeTime.getMinutes(),
            photo: context.data['photo'],
        };
        this._parent.innerHTML = CafePageTemplate(data);
        let button =  document.getElementsByClassName('apple-pass-button').item(0);
        button.addEventListener('click',function (e) {
            let container = document.getElementsByClassName('card-creator-container').item(0);
            CreateCardRedactor(container);

        })
    }
}



