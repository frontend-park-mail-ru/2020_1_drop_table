import './LoyaltyDiscountComponent.scss';
import '../Discount/DiscountCell/DicsountCell.scss';
import LoyaltyDiscount from './LoyaltyDiscountComponent.hbs';
// import {DiscountCellComponent} from './DiscountCell/DicsountCell';
import DiscountCell from '../Discount/DiscountCell/DicsountCell.hbs';



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
        Карта клиента - скидочная. Клиент сможет получить скидку при предъявлении карты сотруднику. 
        Вы можете выбрать уровни скидки.
        `
    }

    /**
     * Отрисовка шаблона кафе
     * @private
     */
    _renderTemplate(context) {

        let cells = [];

        for(let i = 0; i < context.length; i++){
            cells.push(DiscountCell({index: i, price:context[i].price, discount:context[i].discount}));
        }
        this._el.innerHTML = LoyaltyDiscount({discounts:cells});
    }

    /** Отрисоака */
    render(context) {
        this._renderTemplate(context)

    }
}
