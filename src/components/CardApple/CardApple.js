'use strict';
import './CardApple.scss';
import CardApple from './CardApple.hbs';
import {SecondaryFieldComponent} from '../AppleCardComponents/SecondaryFieldComponent/SecondaryField';

import {PrimaryFieldComponent} from '../AppleCardComponents/PrimaryFieldComponent/PrimaryField';
import {CardHeaderComponent} from '../AppleCardComponents/CardHeaderComponent/CardHeader';

/** Компонент apple карточки */
export class CardAppleComponent {

    /**
     * Инициализация компоненты apple карточки
     * @param {Element} parent элемент в кором будет размещаеться список кафе
     */
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    /**
     * Отрисовка полей карточки
     * @param {Array} secondaryFields список второстепенных полей
     * @param {Array} auxiliaryFields список вспомогательных полей
     * @private
     */
    _renderFields(secondaryFields, auxiliaryFields){
        let fieldsContainer = this._parent.getElementsByClassName('card__header__fields').item(0);
        fieldsContainer.innerHTML = '';
        for (let i = 0 ; i < secondaryFields.length; i++){
            (new SecondaryFieldComponent(fieldsContainer)).render(secondaryFields[i]);
        }
    }

    /**
     * Отрисовка первичных полей карточки
     * @param {Array} primaryFields первичные поля карточки
     * @private
     */
    _renderPrimaryFields(primaryFields){
        let fieldsContainer = this._parent.getElementsByClassName('card__strip__fields').item(0);
        fieldsContainer.innerHTML = '';
        for (let i = 0 ; i < primaryFields.length; i++){
            (new PrimaryFieldComponent(fieldsContainer)).render(primaryFields[i]);
        }
    }

    /**
     * Отрисовка хэдера карточки
     * @param {obj} headerData контекст для отрисовки хэдера карточки
     * @private
     */
    _renderCardHeader(headerData){
        let container = this._parent.getElementsByClassName('card__header').item(0);
        container.innerHTML = '';
        (new CardHeaderComponent(container)).render(headerData);

        const avatarCardImage = document.getElementsByClassName('card__header_img').item(0);
        if(headerData.logoImageSrc){
            avatarCardImage.style.display = 'flex';
        }

    }

    /**
     * Отрисовка переднего плана карточки
     * @param {string} foregroundColor - цвет переднего плана
     * @private
     */
    _renderForegroundColor(foregroundColor){
        const fieldsContainer = this._parent.getElementsByClassName('card__header__fields').item(0);
        const secondaryValues = fieldsContainer.getElementsByClassName('card__header__fields__secondary_spanValue');
        const headerValues = document.getElementsByClassName('header-field_span_value');
        const primaryFields = document.getElementsByClassName('card__header__fields__primary');

        for ( let i = 0; i < secondaryValues.length; i++ ){
            secondaryValues.item(i).style.color = foregroundColor;
        }
        for ( let i = 1; i < headerValues.length; i++ ){
            headerValues.item(i).style.color = foregroundColor;
        }
        for ( let i = 0; i < primaryFields.length; i++ ){
            primaryFields.item(i).style.color = foregroundColor;
        }
    }

    /**
     * Отрисовка заднего плана карточки
     * @param {string} backgroundColor цвет заденго плана
     * @private
     */
    _renderBackgroundColor(backgroundColor){
        let card = document.getElementsByClassName('card').item(0);
        card.style.background = backgroundColor;
    }

    /**
     * Отрисовка полосы на карточке
     * @param {string} stripImageSrc ссылка на изображение разделяющей полосы
     * @private
     */
    _renderStrip(stripImageSrc){
        let cardStrip = document.getElementsByClassName('card__strip').item(0);
        cardStrip.style.backgroundImage = `url(${stripImageSrc})`;
    }

    /**
     * Отрисовка иконки карточки
     * @param {string} labelColor цвет иконки карточки
     * @private
     */
    _renderLabelColor(labelColor){
        const fieldsContainer = this._parent.getElementsByClassName('card__header__fields').item(0);
        const secondaryLabels = fieldsContainer.getElementsByClassName('card__header__fields__secondary_spanLabel');
        const headerLabels = document.getElementsByClassName('header-field_span_label');
        const logoText = document.getElementsByClassName('card__header__field_span').item(0);
        logoText.style.color = labelColor;
        for ( let i = 0; i < secondaryLabels.length; i++ ){
            secondaryLabels.item(i).style.color = labelColor;
        }
        for ( let i = 0; i < headerLabels.length; i++ ){
            headerLabels.item(i).style.color = labelColor;
        }
    }

    /**
     * Отрисовка стилей
     * @param {obj} context контекст нужный для отрисовки компонента
     * @private
     */
    _renderStyles(context){
        this._renderForegroundColor(context.foregroundColor);
        this._renderBackgroundColor(context.backgroundColor);
        this._renderStrip(context.stripImageSrc);
        this._renderLabelColor(context.labelColor);
    }

    /**
     * Отрисовка компоненты
     * @param {obj} context контекст нужный для отрисовки компонента
     */
    render(context) {
        const headerData = {
            logoImageSrc: context['logoImageSrc'],
            labelText: context['headerFields'][0].labelText,
            headerFields: context['headerFields'],

        };
        this._parent.innerHTML = CardApple(context);
        this._renderCardHeader(headerData);
        this._renderPrimaryFields(context['primaryFields']);
        this._renderFields(context['secondaryFields'],context['auxiliaryFields']);
        this._renderStyles(context);
    }
}
