'use strict';

//


// let formObj = {
//     name: "Имя",
//     email: "Введите email",
//     password: "Введите пароль",
//     repeatedPassword: "Повторите пароль"
// }
//
// function buildForm() {
//     const Handlebars = require("handlebars");
//     const template = Handlebars.compile("Name: {{name}}");
//     console.log(template({name: "Nils"}));
// }

function renderRegister() {

    const app = document.getElementById('app');
    let registerContainer = document.createElement('div')
    registerContainer.className = "registerContainer";
    app.appendChild(registerContainer)
    let topBar = document.createElement("div")
    topBar.className = "decorateContainer"
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
        "            </div>"
    registerContainer.appendChild(topBar)

    let form = document.createElement('div')
    form.className = 'formContainer'
    form.innerHTML = '<form class="formField">\n' +
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
        '            </form>\n'
    registerContainer.appendChild(form)

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log("tiknul")
    });

}

import {renderHeader} from "../header/header.js";

console.log("kek");


renderHeader()
renderRegister()



