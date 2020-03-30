/**
 * Функция выводящая на экран ошибку после элемента
 * @param whereToInsert В каком элементе произошла ошибка (к примеру в форме)
 * @param inWitchElement В каком элементе этого элемента произошла ошибка (поле формы)
 * @param message Текст ошибки
 */
export function showError(whereToInsert, inWitchElement, message) {
    const error = document.createElement('div');
    error.className = 'error';
    error.textContent = message;
    whereToInsert.insertBefore(error, inWitchElement.parentNode.nextSibling);
}

/**
 * Проверка корректности формы
 * @param form Форма
 * @returns {boolean} Корректна ли форма
 */

export function deleteOldErrors(form) {
    let errors = form.querySelectorAll('.error');
    for (let err of errors) {
        err.outerHTML = '';                     //Очистка старых ошибок
    }
}

export function validateForm(form) {
    deleteOldErrors(form);
    const email = form.elements['email'];
    const repeatedPassword = form.elements['re-password'];
    const password = form.elements['password'];
    let isCorrect = true;
    const splitedEmail = email.value.split('.');
    if (!email.validity.valid || email.value === '' || splitedEmail[splitedEmail.length - 1] === "" || splitedEmail.length <= 1) {
        showError(form, email, 'Некорректный email');
        isCorrect = false;
    }
    if (password.value !== repeatedPassword.value) {
        showError(form, repeatedPassword, 'Пароли не совпадают');
        isCorrect = false;
    }
    if (password.value === '') {
        showError(form, password, 'Некорректный пароль');
        isCorrect = false;
    }
    return isCorrect;

}

export default class FormValidation{

    constructor(form) {
        this._form = form;
        this._correct = true;
    }

    _deleteErrors() {
        let errors = this._form.querySelectorAll('.error');
        errors.forEach((err) => {
            err.outerHTML = '';
        });
    }

    _addError(element, message) {
        const error = document.createElement('div');
        error.className = 'error';
        error.textContent = message;
        this._form.insertBefore(error, element.parentNode.nextSibling);
    }

    _validateForm(context){
        context.forEach((form) => {
            let formElement = this._form.elements[form['id']];
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