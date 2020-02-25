'use strict';

import registerTemplate from './registerTopBar.hbs'
import './styles.css'
import registerFormTemplate from './registerForm.hbs'
import {validateForm} from "../../modules/formValidator";
import {ajax} from "../../modules/ajax";
import {createNewCafePage} from "../../main/main";


export function renderRegister() {

    let registerContainer = document.createElement('div');
    registerContainer.className = "registerContainer";
    let topBar = document.createElement("div");
    topBar.className = "decorateContainer";
    topBar.innerHTML = registerTemplate({name: 'Регистрация'});
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
    form = form.firstElementChild;
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        //validateForm(form);
        const email = form.elements["email"].value;
        const password = form.elements["password"].value;
        const name = form.elements["full-name"].value;
        console.log(email)
        console.log(name)
        ajax('POST', 'http://80.93.177.185/api/v1/owner',
            {"name": name.toString(), "email": email.toString(), "password": password.toString()}
            , (response) => {
                console.log("RESPONSE", response);
                if (response.errors === null) {
                    console.log("all Ok")
                } else {
                    alert(response.errors[0].message)
                }
            });
    });
    return registerContainer

}





