'use strict'

import BaseView from "./BaseView";
import {CafesContainerComponent} from "../components/CafesContainer/CafesContainer";
import {Router} from "../modules/Router";
import Header from "../components/MainHeader/Header";
import {StaffPageComponent} from "../components/Staff/StaffPageComponent/StaffPageComponent";

export default class StaffListView extends BaseView{
    constructor(app = document.getElementById('application')) {
        super(app);
    }

    _renderStaff(context){

        const staffContainer = document.createElement('div');
        (new StaffPageComponent(staffContainer)).render(context);
        this._app.appendChild(staffContainer);
    }

    render() {
        this._app.innerHTML = '';
        (new Header(this._app)).render(this._context['header']);
        this._renderStaff(this._context['staffList']);
    }
}
