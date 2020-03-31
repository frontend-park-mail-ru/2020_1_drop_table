import {router} from "../main/main";
import BaseErrorHandler from './BaseErrorHandler'

export default class ServerExceptionHandler extends BaseErrorHandler{

    constructor(parent, context) {
        super(parent);
        this._context = context;
    }

    _handleError(error){
        if (error in this._context){
            if (this._context.error instanceof Function){
                this._context.error();
            } else {
                this._addError(this._context[error], error);
            }
        } else {
            console.log('unknown server error: ' + error);
            alert();
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