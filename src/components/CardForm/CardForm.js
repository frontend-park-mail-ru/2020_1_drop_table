'use strict';

import './CardForm.css';
// import  './imagePicker.css'
import CardFormTemplate from './CardForm.hbs';
import InputComponent from '../Input/Input'

/** Компонента формы карточки */
export default class CardFormComponent {

    /**
     * Инициализация компоненты формы карточки
     * @param {Element} parent элемент в кором будет размещаеться компонент
     */
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    /**
     * Отрисовка полей хэдера карточки
     * @param {obj} context некоторый контекст с информацией о компоненте
     * @private
     */
    _renderHeaderInputs(context) {
        const inputHeaderFields = this._parent.getElementsByClassName('card-form__input-header-field');
        [...inputHeaderFields].forEach((inputField, id) => {
            const input = new InputComponent(inputField);
            input.render(context['headerFields'][id]);
        });
    }

    /**
     * Отрисовка первичных полей карточки
     * @param {obj} context некоторый контекст с информацией о компоненте
     * @private
     */
    _renderPrimaryInputs(context) {
        const inputPrimaryFields = this._parent.getElementsByClassName('card-form__input-primary-field');
        [...inputPrimaryFields].forEach((inputField, id) => {
            const input = new InputComponent(inputField);
            input.render(context['primaryFields'][id]);
        });
    }

    /**
     * Отрисовка второстепенных полей карточки
     * @param {obj} context некоторый контекст с информацией о компоненте
     * @private
     */
    _renderSecondaryInputs(context){
        const inputSecondaryFields = this._parent.getElementsByClassName('card-form__input-secondary-field');
        [...inputSecondaryFields].forEach((inputField, id) => {
            const input = new InputComponent(inputField);
            input.render(context['secondaryFields'][id]);

        });
    }

    /**
     * Отрисовка вспомогательных полей карточки
     * @param {obj} context некоторый контекст с информацией о компоненте
     * @private
     */
    _renderAuxiliaryFields(context){
        const inputAuxiliaryFields = this._parent.getElementsByClassName('card-form__input-auxiliary-field');
        [...inputAuxiliaryFields].forEach((inputField, id) => {
            const input = new InputComponent(inputField);
            input.render(context['auxiliaryFields'][id]);
        });
    }

    /**
     * Отрисовка полей карточки
     * @param {obj} context некоторый контекст с информацией о компоненте
     * @private
     */
    _renderInputs(context) {
        this._renderHeaderInputs(context);
        this._renderPrimaryInputs(context);
        this._renderSecondaryInputs(context);
        this._renderAuxiliaryFields(context);

    }

    /**
     * Отрисовка компоненты
     * @param {obj} context некоторый контекст с информацией о компоненте
     * @private
     */
    render(context) {
        this._parent.innerHTML = CardFormTemplate(context);
        this._renderInputs(context);
    }
}




