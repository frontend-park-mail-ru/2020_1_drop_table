import './StaffPageComponent.scss';
import './StaffPageComponent.color.scss';

import StaffPage from './StaffPageComponent.hbs';
import StaffCard from '../StaffCardComponent/StaffCardComponent.hbs'

import '../StaffContainerComponent/CafeStaffContainerComponent.scss';
import '../StaffContainerComponent/CafeStaffContainerComponent.color.scss';

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
                    if(!staffItem.Photo){
                        staffItem.Photo = '/images/userpic.png';
                    }
                    staffList.push(StaffCard(staffItem));
                }
            }
            const cafeId = name.split(',')[0];
            const cafeName = name.split(',')[1];

            (new CafeStaffContainerComponent(this._parent)).render({name: cafeName, staffList: staffList, id:cafeId});
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
