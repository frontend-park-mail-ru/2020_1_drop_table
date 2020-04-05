'use strict';

import BaseView from "./BaseView";
import {StaffMenuComponent} from "../components/StaffMenu/StaffMenu";

export default class StaffMenuView extends BaseView {
    constructor(app = document.getElementById('application'), uuid) {
        super(app);
        this._uuid = uuid;
    }

    render(){
        this._app.innerHTML = '';
        const staffMenuElement = document.createElement('div');
        (new StaffMenuComponent(staffMenuElement, this._uuid)).render();
        this._app.appendChild(staffMenuElement);
    }
}
