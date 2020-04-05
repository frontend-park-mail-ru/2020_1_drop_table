import BaseErrorHandler from './BaseErrorHandler'


/** Класс валидации форм*/
export default class FormValidation extends BaseErrorHandler{

    /**
     * Инициализация FormValidation
     * @param {Element} parent элемент формы
     */
    constructor(parent) {
        super(parent);
        this._correct = true;
    }

    /**
     * Валидация формы
     * @param {Array} context контекст для валидации формы
     * @private
     */
    _validateForm(context){
        context.forEach((obj) => {
            const errorMessage = obj.validate();
            if(!!errorMessage){
                this._correct = false;
                this._addError(obj.element, errorMessage);
            }
        });
    }

    /**
     * Валидация формы
     * @param {obj} context контекст для валидации
     * @return {boolean} результат валидации
     */
    validate(context){
        this._deleteErrors();
        this._validateForm(context);
        return this._correct;
    }
}