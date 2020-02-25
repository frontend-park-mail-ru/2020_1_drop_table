'use strict';
import './login.css'
import loginTemplate from '../register/registerTopBar.hbs'
import loginForm from './loginBottomBar.hbs'
import {createMyCafesPage, createNewCafePage} from '../../main/main'



function ajax(route, body, callback) {

    let h = new Headers();
    h.append('Accept', '*/*');
    h.append('Content-type', 'application/json')

    let req = new Request(route, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(body),
        credentials: 'include',
    });
    fetch(req)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('BAD HTTP stuff');
            }
        })
        .then((formData) => {
            callback(formData);
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

        ajax('http://localhost:8080/api/v1/owner/login',
        {"email":  email.toString(),  "password":  password.toString()}
        , (response) => {
                console.log("RESPONSE:",response.errors);
                if (response.errors === null) {
                    if(response.data !== null){
                        createMyCafesPage();
                    } else{
                        createNewCafePage();
                    }
                } else{
                    alert(response.errors.message)
                }
            }) //TODO ajax

        //const name = form.elements["full-name"].value; //TODO раскоментить в зависимости от API
    });
    return loginContainer

}

// const cafes = {
//     'cafe1': {
//         imageSrc: 'https://kaliningrad.kurort-pro.ru/images/cms/thumbs/b519f8343a09f6bafd2a195ede722a6309b555ea/veterok-e1457018920107_425_260_jpg_5_95.jpg',
//         cafeName: 'Приветики'
//     },
//     'cafe2': {
//         imageSrc: 'https://q-house.com.ua/image/cache/catalog/portfolio/rotang/qhouse_rotang_obekti%20(3)-425x260.jpg',
//         cafeName: 'Кафешка'
//     },
//     'cafe3': {
//         imageSrc: 'https://kaliningrad.kurort-pro.ru/images/cms/thumbs/b519f8343a09f6bafd2a195ede722a6309b555ea/veterok-e1457018920107_425_260_jpg_5_95.jpg',
//         cafeName: 'Димочка'
//     },
//     'cafe4': {
//         imageSrc: 'https://q-house.com.ua/image/cache/catalog/portfolio/rotang/qhouse_rotang_obekti%20(3)-425x260.jpg',
//         cafeName: 'Сашечка'
//     },
//     'cafe5': {
//         imageSrc: 'https://kaliningrad.kurort-pro.ru/images/cms/thumbs/b519f8343a09f6bafd2a195ede722a6309b555ea/veterok-e1457018920107_425_260_jpg_5_95.jpg',
//         cafeName: 'Димочка'
//     },
//     'cafe6': {
//         imageSrc: 'https://q-house.com.ua/image/cache/catalog/portfolio/rotang/qhouse_rotang_obekti%20(3)-425x260.jpg',
//         cafeName: 'Сережечка'
//     },
// };
// const cafesList = Object.values(cafes)
//     .map(cafe => {
//         return {
//             imageSrc: cafe.imageSrc,
//             cafeName: cafe.cafeName
//         }
//     });



