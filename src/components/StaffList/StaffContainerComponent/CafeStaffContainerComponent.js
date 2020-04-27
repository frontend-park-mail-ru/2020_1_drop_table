import './CafeStaffContainerComponent.scss';
import './CafeStaffContainerComponent.color.scss';

import '../StaffCardComponent/StaffCardComponent.scss';
import '../StaffCardComponent/StaffCardComponent.color.scss';

import CafeStaffContainer from './CafeStaffContainerComponent.hbs';

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
