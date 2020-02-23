'use strict';


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


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


const app = document.getElementById('app');

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
    app.appendChild(registerContainer);
    let topBar = document.createElement("div");
    topBar.className = "decorateContainer";
    topBar.innerHTML = "<div class=\"decorateContainer\">\n" +
        "\n" +
        "            <div class=\"labelContainer\">\n" +
        "                <div class=\"labelField\">\n" +
        "                    <span>Регистрация</span>\n" +
        "                </div>\n" +
        "                <div class=\"decorateField\">\n" +
        "                    <div class=\"rectField\">\n" +
        "                        <div class=\"decorateRect\"></div>\n" +
        "                    </div>\n" +
        "\n" +
        "                    <div class=\"decorateCircle\"></div>\n" +
        "                </div>\n" +
        "            </div>";
    registerContainer.appendChild(topBar);

    let form = document.createElement('div');
    form.className = 'formContainer';
    form.innerHTML = '<form class="formField" method="post">\n' +
        '                <div class="InputField">\n' +
        '                    <input type="text" id="full-name" required/>\n' +
        '                    <label for="full-name">Имя</label>\n' +
        '                </div>\n' +
        '\n' +
        '                <div class="InputField">\n' +
        '                    <input type="email" id="email" required/>\n' +
        '                    <label for="email">Почта</label>\n' +
        '                </div>\n' +
        '\n' +
        '                <div class="InputField">\n' +
        '                    <input type="password" id="password" required/>\n' +
        '                    <label for="password">Пароль</label>\n' +
        '                </div>\n' +
        '\n' +
        '                <div class="InputField">\n' +
        '                    <input type="password" id="re-password" required/>\n' +
        '                    <label for="re-password">Повторите пароль</label>\n' +
        '                </div>\n' +
        '                <div class="haveAccount">\n' +
        '                    <label>уже есть аккаунт? </label>\n' +
        '                    <label class="loginSpan">Войти </label>\n' +
        '                </div>\n' +
        '\n' +
        '                <input type="submit" value="Готово"/>\n' +
        '\n' +
        '            </form>\n';
    registerContainer.appendChild(form);


    form.addEventListener('submit', function (e) {
        e.preventDefault();
        validateForm(form.firstChild);
        const email = form.elements["email"].value;
        const password = form.elements["password"].value;
        const name = form.elements["full-name"].value;
        ajax('/api/v1/owner', {name, email, password}, (response) => console.log(response)) //TODO ajax


    });

}


console.log("kek");


// renderHeader();
// //renderRegister();
// renderLogin()




