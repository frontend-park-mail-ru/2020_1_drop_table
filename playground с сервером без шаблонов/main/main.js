import {renderHeader} from "../components/header/header.js";
import {renderLogin} from "../components/login/login.js"
import {renderRegister} from "../components/register/register.js"

const app = document.getElementById('app');

let routes = [
    {
        url: '', callback: function () {
            app.innerHTML = "Тут должна быть главная страница. /reg - регистрация /login- логин";
        }
    }
];


function getUrl(href) {
    const url = href.split('/');
    return url[url.length - 1]
}

function Routing() {
    let href = window.location.href;
    console.log(href);
    let url = getUrl(href);
    let route = routes[0];
    routes.forEach(item => {
        if (url === item.url) {
            route = item
        }
    });
    route.callback();
}


window.addEventListener('popstate', Routing);

setTimeout(Routing, 0);

routes.push({

    url: "reg", callback: () => {
        app.innerHTML = "";
        renderHeader();
        renderRegister()
    }
});
routes.push({
    url: "login", callback: () => {
        app.innerHTML = "";
        renderHeader();
        renderLogin()
    }
});