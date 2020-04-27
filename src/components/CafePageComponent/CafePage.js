'use strict';
import './CafePage.scss';
import './CafePage.color.scss';
import CafePageTemplate from './CafePage.hbs';


/** Компонент страницы кафе */
export class CafePageComponent {

    /**
     * Инициализация компоненты страницы кафе
     * @param {Element} parent элемент в котором будет располагаться компонента страницы кафе
     */
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    /**
     * Функция обрезки слишком длинного имени
     * @param {string} name название кафе
     */
    _cropName(name){
        if(name.length>12){
            return name.slice(0,10).concat('...')
        }
        return name;
    }

    /**
     * Отрисовка компоненты страницы кафе
     * @param {obj} context некоторый контекст с информацией о странице кафе
     */
    render(context) {
        let openTime = context['openTime'];
        let closeTime = context['closeTime'];
        let data = {
            name: this._cropName(context['name']),
            address: context['address'],
            description: context['description'],
            openTime: openTime,
            closeTime: closeTime,
            photo: context['photo'],
        };
        this._parent.innerHTML = CafePageTemplate(data);

    }
}



