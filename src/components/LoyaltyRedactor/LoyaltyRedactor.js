import './LoyaltyRedactor.scss';
import LoyaltyRedactor from './LoyaltyRedactor.hbs';

import {LoyaltyCouponComponent} from '../LoyaltySystems/Coupon/LoyaltyCouponComponent'
import {LoyaltyDiscountComponent} from '../LoyaltySystems/Discount/LoyaltyDiscountComponent'
import {LoyaltyWalletComponent} from '../LoyaltySystems/Wallet/LoyaltyWalletComponent'
import {LoyaltyStampComponent} from '../LoyaltySystems/Stamp/LoyaltyStampComponent'

import {NotificationComponent} from '../Notification/Notification'


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


    getJustifyContentBuIndex(i){
        switch (i) {
        case 0:
            return 'flex-start';
        case 1:
            return 'center';
        case 2:
            return 'center';
        case 3:
            return 'flex-end';


        }
    }

    renderLoyaltySystem(i){
        const rect = document.getElementsByClassName('rect').item(0);
        rect.innerHTML = '';
        switch(i){
        case 0:
            (new LoyaltyStampComponent(rect)).render();
            break;
        case 1:
            (new LoyaltyDiscountComponent(rect)).render();
            break;
        case 2:
            (new LoyaltyWalletComponent(rect)).render();
            break;
        case 3:
            (new LoyaltyCouponComponent(rect)).render();
            break;

        }

    }

    _addListeners(){
        let buttonsNormal = document.getElementsByClassName('loyalty-redactor__buttons__button-normal');
        let description = document.getElementsByClassName('loyalty-redactor__description-normal').item(0);
        for(let i = 0; i< buttonsNormal.length; i++){
            buttonsNormal.item(i).addEventListener('click',(e)=>{
                description.className = 'loyalty-redactor__description-active';
                description.style.justifyContent = this.getJustifyContentBuIndex(i);
                let buttonsActive = document.getElementsByClassName('loyalty-redactor__buttons__button-active');
                for(let i = 0; i < buttonsActive.length; i++){
                    buttonsActive.item(i).className = 'loyalty-redactor__buttons__button-normal';
                }
                e.target.parentNode.className = 'loyalty-redactor__buttons__button-active';
                this.renderLoyaltySystem(i);


            })
        }

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
        this._addListeners()
    }
}
