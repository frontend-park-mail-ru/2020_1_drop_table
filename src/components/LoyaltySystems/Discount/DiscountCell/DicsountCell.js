import './DicsountCell.scss';
import DiscountCell from './DicsountCell.hbs';



/** Компонент карточки кафе */
export class DiscountCellComponent {

    /**
     * Инициализация компоненты карточки кафе
     * @param {Element} el элемент в кором будет размещаеться хэдер карточки
     * @param {string} imgSrc ссылка на фотографию кафе
     * @param {string} name название кафе
     * @param {int} id идентификатор кафе
     */
    constructor(el) {
        this._el = el;

    }

    /**
     * Отрисовка шаблона кафе
     * @private
     */
    _renderTemplate(context) {
        this._el.innerHTML += DiscountCell(context);
    }

    /** Отрисоака */
    render(context) {
        this._renderTemplate(context);
    }
}
