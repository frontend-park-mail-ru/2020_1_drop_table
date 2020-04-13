import {router} from '../main/main';
import BaseErrorHandler from './BaseErrorHandler'

/** Обработчик ошибок сервера */
export default class ServerExceptionHandler extends BaseErrorHandler{

    /**
     * Инициализация FormValidation
     * @param {Element} parent элемент в котором происходит обработка ошибок
     */
    constructor(parent, context) {
        super(parent);
        this._context = context;
    }

    /**
     * Обработка одной ошибки
     * @param {string} error сообщение ошибки
     * @private
     */
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
            router._goTo('/login');
        }
    }

    /**
     * Обработка списка ошибок
     * @param {Array} errors список ошибок
     */
    handle(errors){
        this._deleteErrors();
        errors.forEach((error) => {
            this._handleError(error.message);
        });
    }
}
