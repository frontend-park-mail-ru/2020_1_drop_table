import './StaffPageComponent.css';
import StaffPage from './StaffPageComponent.hbs';
import StaffCard from '../StaffCardComponent/StaffCardComponent.hbs'

import '../StaffContainerComponent/CafeStaffContainerComponent.css';

import {CafeStaffContainerComponent} from '../StaffContainerComponent/CafeStaffContainerComponent'

/**  Компонент страницы работника */
export class StaffPageComponent {

    /**
     * Инициализация компонента страницы работника
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

    /**
     * Отрисовка компонента
     * @param {obj} context контекст с информацией компоненте
     */
    render(context) {
        this._renderTemplate(context);
    }

}
