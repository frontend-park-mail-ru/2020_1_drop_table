import './LoyaltyDiscountComponent.scss';
import LoyaltyDiscount from './LoyaltyDiscountComponent.hbs';



/** Компонент карточки кафе */
export class LoyaltyDiscountComponent {

    /**
     * Инициализация компоненты карточки кафе
     * @param {Element} el элемент в кором будет размещаеться хэдер карточки
     * @param {string} imgSrc ссылка на фотографию кафе
     * @param {string} name название кафе
     * @param {int} id идентификатор кафе
     */
    constructor(el) {
        this._el = el;
        this._text = `
        Описание действия discount Описание действия discount Описание действия discount
         Описание действия discount Описание действия discount Описание действия discount
        `
    }

    /**
     * Отрисовка шаблона кафе
     * @private
     */
    _renderTemplate() {
        this._el.innerHTML = LoyaltyDiscount({text: this._text});
    }

    /** Отрисоака */
    render() {
        setTimeout(this._renderTemplate.bind(this), 750);
    }
}
