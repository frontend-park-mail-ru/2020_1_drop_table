import './LoyaltyRedactor.scss';
import LoyaltyRedactor from './LoyaltyRedactor.hbs';
import {LoyaltySystemComponent} from '../LoyaltySystem/LoyaltySystem'

import {NotificationComponent} from  '../Notification/Notification'

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

    _renderLoyaltyDescription(id){
        let data = [
            {
                text:'Описание1 Описание1 Описание1 Описание1 Описание1 Описание1 Описание1 Описание1 Описание1'
            },
            {
                text:'Описание2 Описание2 Описание2 Описание2 Описание2 Описание2 Описание2 Описание2 Описание2'
            },
            {
                text:'Описание3 Описание3 Описание3 Описание3 Описание3 Описание3 Описание3 Описание3 Описание3'
            },
            {
                text:'Описание4 Описание4 Описание4 Описание4 Описание4 Описание4 Описание4 Описание4 Описание4'
            },
        ]
        const description =
            this._el.getElementsByClassName('description-loyalty').item(0);
        this._loyaltySystem = new LoyaltySystemComponent(description);
        this._loyaltySystem.render(data[id]);
    }
    _removeLoyaltyDescription(){
        if(this._loyaltySystem) {
            this._loyaltySystem.remove();
        }
    }

    _normalizeButtons(){

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
