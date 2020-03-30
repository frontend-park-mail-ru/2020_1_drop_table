
export default class BaseErrorHandler {
    constructor(parent) {
        this._parent = parent;
    }

    _deleteErrors() {
        let errors = this._parent.querySelectorAll('.error');
        errors.forEach((err) => {
            err.outerHTML = '';
        });
    }

    _addError(element, message) {
        const error = document.createElement('div');
        error.className = 'error';
        error.textContent = message;
        this._parent.insertBefore(error, element.parentNode.nextSibling);
    }
}