import './StaffPageComponent.css';
import StaffPage from './StaffPageComponent.hbs';
import StaffCard from '../StaffCardComponent/StaffCardComponent.hbs'

import '../StaffContainerComponent/CafeStaffContainerComponent.css';

import {CafeStaffContainerComponent} from '../StaffContainerComponent/CafeStaffContainerComponent'

export class StaffPageComponent {

    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    _renderTemplate(context) {
        for (let [name, staff] of Object.entries(context)) {
            let staffList = [];
            for(let cafe of staff){
                staffList.push(StaffCard(cafe));
            }

            (new CafeStaffContainerComponent(this._parent)).render({name, staffList});
        }
        this._parent.innerHTML += StaffPage();
    }

    render(context) {
        this._renderTemplate(context);
    }

}
