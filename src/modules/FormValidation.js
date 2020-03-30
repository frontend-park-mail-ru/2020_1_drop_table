import BaseErrorHandler from './BaseErrorHandler'

export default class FormValidation extends BaseErrorHandler{

    constructor(form) {
        super(form);
        this._correct = true;
    }

    _validateForm(context){
        context.forEach((form) => {
            let formElement = this._parent.elements[form['id']];
            if ('validate' in form){
                const errorMessage = form['validate'](formElement);
                if(!!errorMessage){
                    this._correct = false;
                    this._addError(formElement, errorMessage);
                }
            }
        });
    }

    validate(context){
        this._deleteErrors();
        this._validateForm(context);
        return this._correct;
    }
}