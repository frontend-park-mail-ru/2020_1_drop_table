/**
 * Функция выводящая на экран ошибку после элемента
 * @param whereToInsert В каком элементе произошла ошибка (к примеру в форме)
 * @param inWitchElement В каком элементе этого элемента произошла ошибка (поле формы)
 * @param message Текст ошибки
 */
import {Router} from './Router';

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
    if (!email.validity.valid || email.value === '' || splitedEmail[splitedEmail.length - 1] === '' || splitedEmail.length <= 1) {
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
