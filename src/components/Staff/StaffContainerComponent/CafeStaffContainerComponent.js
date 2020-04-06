import './CafeStaffContainerComponent.scss';
import '../StaffCardComponent/StaffCardComponent.scss';
import CafeStaffContainer from './CafeStaffContainerComponent.hbs';
import StaffCard from '../StaffCardComponent/StaffCardComponent.hbs';
import {Router} from "../../../modules/Router";
import CafeCard from "../../CafeCard/CafeCard.hbs";
import {StaffCardComponent} from "../StaffCardComponent/StaffCardComponent";


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
