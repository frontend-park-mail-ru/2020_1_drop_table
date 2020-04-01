'use strict';
import './CafePage.css';
import CafePageTemplate from './CafePage.hbs';
import {CreateCardRedactor} from '../CardCreator/CardCreator'

export class CafePageComponent {
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    _cropName(name){
        if(name.length>20){
            return name.slice(0,18).concat('...')
        }
        return name;
    }

    render(context) {
        let openTime = new Date(context['openTime']);
        let closeTime = new Date(context['closeTime']);

        let data = {
            name: this._cropName(context['name']),
            address: context['address'],
            description: context['description'],
            openTime: openTime.getHours()+':'+openTime.getMinutes(),
            closeTime: closeTime.getHours()+':'+closeTime.getMinutes(),
            photo: context['photo'],
        };
        this._parent.innerHTML = CafePageTemplate(data);

    }
}



