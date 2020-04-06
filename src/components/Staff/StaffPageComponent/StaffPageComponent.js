import './StaffPageComponent.scss';
import StaffPage from './StaffPageComponent.hbs';
import StaffCard from '../StaffCardComponent/StaffCardComponent.hbs'

import '../StaffContainerComponent/CafeStaffContainerComponent.scss';

import {CafeStaffContainerComponent} from '../StaffContainerComponent/CafeStaffContainerComponent'

export class StaffPageComponent {

    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    _renderTemplate(context) {
        for (let [name, staff] of Object.entries(context)) {
            let staffList = [];
            if(staff) {
                for (let staffItem of staff) {
                    console.log('StaffHHAHA',staffItem);
                    console.log('StaffHHAHA',staffItem.Photo);
                    if(staffItem.Photo === null){
                        console.log('Staff null',staffItem.Photo);
                        staffItem.Photo = '/images/userpic.png'
                        console.log('Staff photo',staffItem.Photo);
                    }
                    staffList.push(StaffCard(staffItem));
                }
            }
            (new CafeStaffContainerComponent(this._parent)).render({name, staffList});
        }
        this._parent.innerHTML += StaffPage();
    }

    render(context) {
        this._renderTemplate(context);
    }

}
