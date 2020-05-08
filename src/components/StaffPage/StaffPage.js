'use strict';
import './StaffPage.scss';
import './StaffPage.color.scss';
import StaffPageTemplate from './StaffPage.hbs';

export class StaffPageComponent {

    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    render(context) {
        this._parent.innerHTML = StaffPageTemplate(context);

    }
}
