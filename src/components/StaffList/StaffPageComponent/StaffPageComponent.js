import './StaffPageComponent.scss';
import './StaffPageComponent.color.scss';

import StaffPage from './StaffPageComponent.hbs';
import StaffCard from '../StaffCardComponent/StaffCardComponent.hbs'

import '../StaffContainerComponent/CafeStaffContainerComponent.scss';
import '../StaffContainerComponent/CafeStaffContainerComponent.color.scss';

import {CafeStaffContainerComponent} from '../StaffContainerComponent/CafeStaffContainerComponent'
import {router} from '../../../main/main';

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
        if (!Object.entries(context).length) {
            let emptyStaff = document.createElement('span');
            emptyStaff.className = 'no-staff_span';
            emptyStaff.innerText = 'У вас еще нет добавленных заведений?';
            this._parent.appendChild(emptyStaff);

            let addCafesButton = document.createElement('button');
            addCafesButton.className = 'no-staff_button';
            addCafesButton.innerText = 'Добавить';
            this._parent.appendChild(addCafesButton);
            addCafesButton.addEventListener('click',()=>{
                router._goTo('/createCafe');
            })
        }


        for (let [name, staff] of Object.entries(context)) {
            let staffList = [];
            if (staff) {
                for (let staffItem of staff) {
                    if (!staffItem.Photo) {
                        staffItem.Photo = '/images/userpic.png';
                    }
                    staffList.push(StaffCard(staffItem));
                }
            }
            const cafeId = name.split(',')[0];
            const cafeName = name.split(',')[1];

            (new CafeStaffContainerComponent(this._parent)).render({
                name: cafeName,
                staffList: staffList,
                id: cafeId
            });
        }
        this._parent.innerHTML += StaffPage();

    }

    /**
     * Отрисовка компонента
     * @param {obj} context контекст с информацией компоненте
     */
    render(context) {
        this._renderTemplate(context);
        let addCafesButton = this._parent.getElementsByClassName('no-staff_button').item(0);
        addCafesButton.addEventListener('click',()=>{
            router._goTo('/createCafe');
        })
    }

}
