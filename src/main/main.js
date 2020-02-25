import {renderRegister} from '../components/register/register';
import {renderHeader} from "../components/header/header";
import {renderLogin} from "../components/login/login";


const app = document.body;


let routes = [
    {
        url: '', callback: function () {
            app.innerHTML = "тут типа будет главная страница /reg /login\n" +
                "<a href=\"#login\">login</a>\n" +
                "<a href=\"#reg\">reg</a>";
        }
    }
];


function getUrl() {
    return window.location.hash.substr(1)
}

function Routing() {
    let url = getUrl();
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
        app.appendChild(renderHeader())
        app.appendChild(renderRegister())
    }
});
routes.push({
    url: "login", callback: () => {
        app.innerHTML = "";
        app.appendChild(renderHeader());
        app.appendChild(renderLogin())
    }

});




