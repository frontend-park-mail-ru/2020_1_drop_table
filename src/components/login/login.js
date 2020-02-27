'use strict';
import './login.css'
import loginTemplate from '../register/registerTopBar.hbs'
import loginForm from './loginBottomBar.hbs'
import {ajax} from "../../modules/ajax";

const app = document.body;
export function doLogin(email, password) {
    ajax('POST', 'http://80.93.177.185:8080/api/v1/owner/login',
        {"email": email.toString(), "password": password.toString()}
        , (response) => {
            console.log("RESPONSE:", response.errors);
            if (response.errors === null) {
                window.location.hash = "myCafes";
                console.log("all OK") //TODO что-то делатьё
            } else {
                alert(response.errors[0].message)
            }
        })

}

export function renderLogin() {

    let loginContainer = document.createElement('div');
    loginContainer.className = "loginContainer";
    let topBar = document.createElement("div");
    topBar.className = "decorateContainer";
    topBar.innerHTML = loginTemplate({name: 'Логин'});
    loginContainer.appendChild(topBar);

    let form = document.createElement('div');
    form.className = 'formContainer';
    form.innerHTML = loginForm({email: 'Почта', password: 'Пароль'});
    loginContainer.appendChild(form);
    form = form.firstElementChild;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        //validateForm()
        const email = form.elements["email"].value;
        const password = form.elements["password"].value;
        doLogin(email, password)

    });
    return loginContainer

}




