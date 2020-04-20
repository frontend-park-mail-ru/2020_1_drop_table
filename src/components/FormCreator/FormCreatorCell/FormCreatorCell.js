
import './FormCreatorCell.scss'

import FormCreatorCellBig from './FormCreatorCellBig.hbs'
import FormCreatorCellSmall from './FormCreatorCellSmall.hbs'
// import FormCreatorCellSmall from './FormCreatorCell/FormCreatorCellSmall.hbs'
/** Компонент карточки кафе */
export class FormCreatorCellComponent {

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
    _renderTemplate(context, type) {
        if(type === 'big'){
            this._el.innerHTML = FormCreatorCellBig(context);
        } else if(type === 'small'){
            this._el.innerHTML = FormCreatorCellSmall(context);
        }

    }

    /** Отрисоака */
    render(context, type) {
        this._renderTemplate(context, type);

    }
}
