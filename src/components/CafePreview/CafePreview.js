'use strict';
import CafePreviewTemplate from './CafePreview.hbs';
import './CafePreview.scss'


/** Компонент страницы кафе */
export class CafePreviewComponent {

    /**
     * Инициализация компоненты страницы кафе
     * @param {Element} parent элемент в котором будет располагаться компонента страницы кафе
     */
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }
    render(context) {
        let openTime = context['openTime'];
        let closeTime = context['closeTime'];
        let data = {
            name: context['name'],
            address: context['address'],
            description: context['description'],
            openTime: openTime,
            closeTime: closeTime,
            photo: context['photo'],
            cashback: context['passInfo']['cashback'],
            coffeeCup: context['passInfo']['coffee_cup'],
            percents: context['passInfo']['percents'],
        };
        this._parent.innerHTML = CafePreviewTemplate(data);

    }
}

