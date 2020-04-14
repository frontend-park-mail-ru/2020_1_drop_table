'use strict';

import CardCreator from '../components/CardCreator/CardCreator.hbs';
import CardFormComponent from '../components/CardForm/CardForm';
import {CardAppleComponent} from '../components/CardApple/CardApple';
import '../components/CardCreator/CardCreator.scss'
import '../components/CardCreator/CardCreator.color.scss'

import BaseView from './BaseView';

/** view редактора крточки */
export default class CardRedactorView extends BaseView{

    /**
     * Инициализация CardRedactorView
     * @param {Element} app элемент в котором находится приложение
     */
    constructor(app = document.getElementById('application')) {
        super(app);
        this._context = null;
        this._appleCard = null;
        let container = document.getElementsByClassName('card-creator-container').item(0);
        container.innerHTML = CardCreator();
        let left = document.getElementsByClassName('card-redactor-container__card-form').item(0);
        let right = document.getElementsByClassName('card-redactor-container__card-model').item(0);
        this.cardFormComp = new CardFormComponent(left);
        this.cardAppleComp = new CardAppleComponent(right);

    }

    /** Отрисовка редактора крточки */
    render() {
        this.cardFormComp.render(this._appleCard.getAsFormData());
        this.cardAppleComp.render(this._appleCard.getAsFormData());
    }
}
