import './StaffCardComponent.scss';
import StaffCard from './StaffCardComponent.hbs';

/** Компонент карточки работника */
export class StaffCardComponent {

    /**
     * Инициализация компонента карточки работника
     * @param {Element} el элемент в кором будет размещаеться компонент
     */
    constructor({ el = document.getElementById('application'),} = {}) {
        this._el = el;
    }

    /**
     * Отрисовка шаблона компонента
     * @param {obj} context контекст с информацией компоненте
     * @private
     */
    _renderTemplate(context) {

        if(!context.photo){
            context.photo = '/images/userpic.png'
        }
        this._el.innerHTML += StaffCard(context);
    }

    /**
     * Отрисовка компонента
     * @param {obj} context контекст с информацией компоненте
     */
    render(context) {
        return this._renderTemplate(context);
    }
}
