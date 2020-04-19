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
        Описание действия discount Описание действия discount Описание действия discount
         Описание действия discount Описание действия discount Описание действия discount
        `
    }

    /**
     * Отрисовка шаблона кафе
     * @private
     */
    _renderTemplate() {
        this.cont['text'] = this.text;
        let discounts = this.cont['discounts'];
        let cells = [];
        for(let i = 0; i < discounts.length; i++){
            cells.push(DiscountCell(discounts[i]));
        }
        this.cont['discounts'] = cells;
        this.element.innerHTML = LoyaltyDiscount(this.cont);
    }

    /** Отрисоака */
    render(context) {
        let newContext ={
            cont: context,
            element : this._el,
            text : this._text
        }
        setTimeout(this._renderTemplate.bind(newContext), 500);

    }
}
