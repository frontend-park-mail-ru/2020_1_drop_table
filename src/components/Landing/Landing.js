'use strict';
import './Landing.css';
import LandingTemplate from './Landing.hbs';

export class LandingComponent {
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    render() {
        this._parent.innerHTML = LandingTemplate();

    }
}
