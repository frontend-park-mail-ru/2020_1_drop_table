/** Базовый обработчик ошибок */
export default class BaseErrorHandler {

    /**
     * Инициализация BaseErrorHandler
     * @param {Element} parent родительский элемент в котором происходит обработка ошибок
     */
    constructor(parent) {
        this._parent = parent;
    }

    /** Удаление всех ошибок из parent */
    _deleteErrors() {
        let errors = this._parent.querySelectorAll('.error');
        errors.forEach((err) => {
            err.outerHTML = '';
        });
    }

    /**
     * Добавление ошибки
     * @param {Element} element элемент куда нужно добавить ошибку
     * @param {string} message сообщение ошибки
     * @private
     */
    _addError(element, message) {
        const error = document.createElement('div');
        error.className = 'error';
        error.textContent = message;
        this._parent.insertBefore(error, element.parentNode.nextSibling);
    }
}