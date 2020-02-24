'use strict';
import './login.css'
import loginTemplate from '../register/registerTopBar.hbs'
import loginForm from './loginBottomBar.hbs'

function ajax(route, body, callback) {


    let h = new Headers();
    h.append('Accept', 'application/json');
    // h.append('Content-type', 'application/json;charset=UTF-8'); //Если убрать будет пустой запрос но будет работать
    let req = new Request(route, {
        method: 'POST',
        headers: h,
        mode: 'cors',
        body: 'asd'
    });

    fetch(req)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('BAD HTTP stuff');
            }
        })
        .then((jsonData) => {
            callback(jsonData);
        })
        .catch((err) => {
            console.log('ERROR:', err.message);
        });
}


function showError(whereToInsert, inWitchElement, message) {
    const error = document.createElement('div');
    error.className = "error";
    error.textContent = message;
    whereToInsert.insertBefore(error, inWitchElement.parentNode)

}


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
        e.preventDefault();
        const email = form.elements["email"].value;
        const password = form.elements["password"].value;
        ajax('http://127.0.0.1:60000/api/v1/owner', {
            email: "asd",
            password: "lskajdlkas"
        }, (response) => console.log(response)) //TODO ajax

        //const name = form.elements["full-name"].value; //TODO раскоментить в зависимости от API


    });
    return loginContainer

}




