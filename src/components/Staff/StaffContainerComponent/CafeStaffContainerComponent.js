import './CafeStaffContainerComponent.css';
import '../StaffCardConponent/StaffCardComponent.css';
import CafeStaffContainer from './CafeStaffContainerComponent.hbs';
import StaffCard from '../StaffCardConponent/StaffCardComponent.hbs';
import {Router} from "../../../modules/Router";
import CafeCard from "../../CafeCard/CafeCard.hbs";
import {StaffCardComponent} from "../StaffCardConponent/StaffCardComponent";


export class CafeStaffContainerComponent {

    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    _renderTemplate(context) {
        this._parent.innerHTML += CafeStaffContainer(context);
    }

    render(context) {
        this._renderTemplate(context);
    }

}
