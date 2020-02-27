export function showError(whereToInsert, inWitchElement, message) {
    const error = document.createElement('div');
    error.className = 'error';
    error.textContent = message;
    whereToInsert.insertBefore(error, inWitchElement.parentNode.nextSibling);

}


export function validateForm(form) {
    let errors = form.querySelectorAll('.error');
    for (let err of errors) {
        err.outerHTML = '';                     //Очистка старых ошибок
    }
    const email = form.elements['email'];
    const repeatedPassword = form.elements['re-password'];
    const password = form.elements['password'];
    let isCorrect = true;
    if (!email.validity.valid || email.value === '' || email.value.split('.').length !== 2) {
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