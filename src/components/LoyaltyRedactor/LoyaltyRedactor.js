import './LoyaltyRedactor.scss';
import LoyaltyRedactor from './LoyaltyRedactor.hbs';

import {LoyaltyCouponComponent} from '../LoyaltySystems/Coupon/LoyaltyCouponComponent'
import {LoyaltyDiscountComponent} from '../LoyaltySystems/Discount/LoyaltyDiscountComponent'
import {LoyaltyWalletComponent} from '../LoyaltySystems/Wallet/LoyaltyWalletComponent'
import {LoyaltyStampComponent} from '../LoyaltySystems/Stamp/LoyaltyStampComponent'



/** Компонент карточки кафе */
export class LoyaltyRedactorComponent {

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
    _renderTemplate() {
        this._el.innerHTML = LoyaltyRedactor();
    }

    /** Отрисоака */
    render() {
        this._renderTemplate();
    }
}
