import {router} from "../main/main";
import BaseErrorHandler from './BaseErrorHandler'

export default class ServerExceptionHandler extends BaseErrorHandler{

    constructor(parent, context) {
        super(parent);
        this._context = context;
    }

    _handleError(error){
        if (error in this._context) {
            let message = null, element = null;
            if (this._context[error] instanceof Function) {
                [message, element,] = this._context[error]();
            } else {
                [element, message,] = ([error].concat(this._context[error])).reverse();
            }

            if(element && message) {
                this._addError(element, message);
            }
        } else {
            console.log('unknown server error: ' + error);
            router._goTo('/login');
        }
    }

    handle(errors){
        this._deleteErrors();
        errors.forEach((error) => {
            this._handleError(error.message);
        });
    }
}