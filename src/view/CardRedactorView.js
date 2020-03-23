'use strict';

import CardCreator from "../components/CardCreator/CardCreator.hbs";
import CardFormComponent from "../components/CardForm/CardForm";
import {CardAppleComponent} from "../components/CardApple/CardApple";
import '../components/CardCreator/CardCreator.css'
import colorPicker from "../utils/colorPicker";
import {picker} from '../utils/cardRedactorUtils'

export default class CardRedactorView {
    constructor(app = document.body) {
        this._app = app;
        this._context = null;
        this._appleCard = null;
        let container = document.getElementsByClassName('card-creator-container').item(0);
        container.innerHTML = CardCreator();
        let left = document.getElementsByClassName('card-redactor-container__card-form').item(0);
        let right = document.getElementsByClassName('card-redactor-container__card-model').item(0);
        this.cardFormComp = new CardFormComponent(left);
        this.cardAppleComp = new CardAppleComponent(right);

        this.colorWheelBackground = new colorPicker.ColorPicker("#background-color", picker);
        this.colorWheelForeground = new colorPicker.ColorPicker("#foreground-color", picker);
        this.colorWheelLabel = new colorPicker.ColorPicker("#label-color", picker);
    }

    get context() {
        return this._context
    }

    set context(context) {
        this._context = context;
    }

    render() {
        this.cardFormComp.render(this._appleCard.getAsFormData());
        this.cardAppleComp.render(this._appleCard.getAsFormData());
    }
}
