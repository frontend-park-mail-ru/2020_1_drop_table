import './CafeStaffContainerComponent.css';
import '../StaffCardComponent/StaffCardComponent.css';
import CafeStaffContainer from './CafeStaffContainerComponent.hbs';
import StaffCard from '../StaffCardComponent/StaffCardComponent.hbs';
import {Router} from "../../../modules/Router";
import CafeCard from "../../CafeCard/CafeCard.hbs";
import {StaffCardComponent} from "../StaffCardComponent/StaffCardComponent";

/** Компонент контейнера работника */
export class CafeStaffContainerComponent {

    /**
     * Инициализация компонента
     * @param {Element} parent элемент в кором будет размещаеться компонент
     */
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    /**
     * Отрисовка шаблона компонента
     * @param {obj} context контекст с информацией компоненте
     * @private
     */
    _renderTemplate(context) {
        this._parent.innerHTML += CafeStaffContainer(context);
    }

    /**
     * Отрисовка компонента
     * @param {obj} context контекст с информацией компоненте
     */
    render(context) {
        this._renderTemplate(context);
    }

}
