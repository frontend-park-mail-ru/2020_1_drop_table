import BaseErrorHandler from './BaseErrorHandler'

export default class FormValidation extends BaseErrorHandler{

    constructor(parent) {
        super(parent);
        this._correct = true;
    }

    _validateForm(context){
        context.forEach((obj) => {
            const errorMessage = obj.validate();
            if(!!errorMessage){
                this._correct = false;
                this._addError(obj.element, errorMessage);
            }
        });
    }

    validate(context){
        this._deleteErrors();
        this._validateForm(context);
        return this._correct;
    }
}