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


    let h = new Headers();
    h.append('Accept', 'application/json');
    h.append('Content-type', 'application/json;charset=UTF-8') //Если убрать будет пустой запрос но будет работать
    let req = new Request(route, {
        method: 'POST',
        headers: h,
        mode: 'cors',

        body: JSON.stringify(body)
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


const app = document.getElementById('app');

function showError(whereToInsert, inWitchElement, message) {
    const error = document.createElement('div');
    error.className = "error";
    error.textContent = message;
    whereToInsert.insertBefore(error, inWitchElement.parentNode)

}


export function renderLogin() {


    let loginContainer = document.createElement('div');
    loginContainer.className = "loginContainer";
    app.appendChild(loginContainer);
    let topBar = document.createElement("div");
    topBar.className = "decorateContainer";
    topBar.innerHTML = "<div class=\"decorateContainer\">\n" +
        "\n" +
        "            <div class=\"labelContainer\">\n" +
        "                <div class=\"labelField\">\n" +
        "                    <span>Привет, сладкий петушок</span>\n" +
        "                </div>\n" +
        "                <div class=\"decorateField\">\n" +
        "                    <div class=\"rectField\">\n" +
        "                        <div class=\"decorateRect\"></div>\n" +
        "                    </div>\n" +
        "\n" +
        "                    <div class=\"decorateCircle\"></div>\n" +
        "                </div>\n" +
        "            </div>";
    loginContainer.appendChild(topBar);

    let form = document.createElement('div');
    form.className = 'formContainer';
    form.innerHTML = '<form class="formField">\n' +
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
        '\n' +
        '                <input type="submit" value="Готово"/>\n' +
        '\n' +
        '            </form>\n';
    loginContainer.appendChild(form);
    form = form.firstElementChild

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = form.elements["email"].value;
        const password = form.elements["password"].value;
        ajax('http://127.0.0.1:3100/api/v1/owner', {
            email: "asd",
            password: "lskajdlkas"
        }, (response) => console.log(response)) //TODO ajax

        //const name = form.elements["full-name"].value; //TODO раскоментить в зависимости от API


    });

}




