import './FormCreator.scss';
import FormCreator from './FormCreator.hbs';

import {FormCreatorCellComponent} from './FormCreatorCell/FormCreatorCell'

/** Компонент карточки кафе */
export class FormCreatorComponent {

    /**
     * Инициализация компоненты карточки кафе
     * @param {Element} el элемент в кором будет размещаеться хэдер карточки
     * @param {string} imgSrc ссылка на фотографию кафе
     * @param {string} name название кафе
     * @param {int} id идентификатор кафе
     */
    constructor(el) {
        this._el = el;
        this._cellsList = [];
    }

    /**
     * Отрисовка шаблона кафе
     * @private
     */
    _renderTemplate(context) {

        console.log('render template ', context)
        this._el.innerHTML = FormCreator(context);
        let cells = document.getElementsByClassName('form-creator-container__cells-container__cell');
        for(let i = 0; i < context.cells.length; i++){
            (new FormCreatorCellComponent(cells.item(i)).render(context.cells[i], 'big'))
        }
    }

    /** Отрисоака */
    render(context) {
        this._renderTemplate(context);

    }
}
