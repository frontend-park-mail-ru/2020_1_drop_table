'use strict';

import registerTemplate from './registerTopBar.hbs'
import './styles.css'
import registerFormTemplate from './registerForm.hbs'


function ajax(route, body, callback) {
    fetch(
        route, {
            method: 'POST',
            body: JSON.stringify(body),
            credentials: 'include',
        }
    )
        .then(response => callback(response.json()))
        .catch(error => console.log(error))
}


function showError(whereToInsert, inWitchElement, message) {
    const error = document.createElement('div');
    error.className = "error";
    error.textContent = message;
    whereToInsert.insertBefore(error, inWitchElement.parentNode)

}


function validateForm(form) {
    let errors = form.querySelectorAll('.error');
    for (let err of errors) {
        err.outerHTML = "";                     //Очистка старых ошибок
    }
    const email = form.elements["email"];
    const repeatedPassword = form.elements["re-password"];
    const password = form.elements["password"];
    let isCorrect = true;

    if (!email.validity.valid || email.value === "") {
        showError(form, email, "Некорректный email");
        isCorrect = false
    }
    if (password.value !== repeatedPassword.value) {
        showError(form, repeatedPassword, "Пароли не совпадают");
        isCorrect = false
    }
    if (password.value === "") {
        showError(form, password, "Некорректный пароль");
        isCorrect = false;
    }
    return isCorrect;

}


export function renderRegister() {


    let registerContainer = document.createElement('div');
    registerContainer.className = "registerContainer";
    let topBar = document.createElement("div");
    topBar.className = "decorateContainer";
    topBar.innerHTML = registerTemplate({name: 'Регистрация'})
    registerContainer.appendChild(topBar);

    let form = document.createElement('div');
    form.className = 'formContainer';
    form.innerHTML = registerFormTemplate({
        name: "Имя",
        email: 'Почта',
        password: 'Пароль',
        repeatedPassword: 'Повторите пароль',
    })
    registerContainer.appendChild(form);
    form = form.firstElementChild
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        validateForm(form);
        const email = form.elements["email"].value;
        const password = form.elements["password"].value;
        const name = form.elements["full-name"].value;
        ajax('/api/v1/owner', {name, email, password}, (response) => console.log(response)) //TODO ajax


    });
    return registerContainer

}


console.log("kek");


// renderHeader();
// //renderRegister();
// renderLogin()




