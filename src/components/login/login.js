'use strict';
import './login.css'
import loginTemplate from '../register/registerTopBar.hbs'
import loginForm from './loginBottomBar.hbs'
import {validateForm} from "../../modules/formValidator";
import {ajax} from "../../modules/ajax";


export function renderLogin() {
    let loginContainer = document.createElement('div');
    loginContainer.className = "loginContainer";
    let topBar = document.createElement("div");
    topBar.className = "decorateContainer";
    topBar.innerHTML = loginTemplate({name: 'Привет, сладкий петушок'});
    loginContainer.appendChild(topBar);

    let form = document.createElement('div');
    form.className = 'formContainer';
    form.innerHTML = loginForm({email: 'Почта', password: 'Пароль'});
    loginContainer.appendChild(form);
    form = form.firstElementChild;

    form.addEventListener('submit', function (e) {
        validateForm()
        e.preventDefault();
        const email = form.elements["email"].value;
        const password = form.elements["password"].value;
        ajax('POST', 'http://80.93.177.185/api/v1/owner', {
            email: email,
            password: password
        }, (response) => console.log(response)) //TODO ajax

        //const name = form.elements["full-name"].value; //TODO раскоментить в зависимости от API


    });
    return loginContainer

}




