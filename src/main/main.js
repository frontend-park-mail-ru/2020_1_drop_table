import {renderRegister} from '../components/register/register';
import {renderHeader} from "../components/header/header";
import {renderLogin} from "../components/login/login";
import {CafesContainerComponent} from "../components/CafesContainer/CafesContainer.js";


const app = document.body;


function createCafes(cafes) {
    const cafesContainerDiv = document.createElement('div');
    if (cafes) {
        const cafesContainerComp = new CafesContainerComponent({
            el: cafesContainerDiv,
        });
        console.log('data', JSON.parse(JSON.stringify(cafes)));

        cafesContainerComp.data = JSON.parse(JSON.stringify(cafes));
        let data = cafesContainerComp.render();
        app.appendChild(data)
    } else {
        console.log('COOKIE   ');
        console.log('COOKIE   ', document.cookie);
        ajaxCreateCafe('http://80.93.177.185/api/v1/cafe',
            {}, (response) => {
                console.log("RESPONSE1", response);
                if (response.errors === null) {
                    if (response.data !== null) {
                        createCafes(response.data)
                    } else {
                        console.log("Dolzhen create")
                    }

                } else {
                    alert(response.errors[0].message)
                }
            });
    }
}


function ajaxCreateCafe(route, body, callback) {

    let h = new Headers();
    h.append('Accept', '*/*');
    h.append('Content-Type', 'text/plain; charset=utf-8');
    let req = new Request(route, {
        method: 'GET',
        headers: h,
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
        .then((response) => {
            callback(response);
            console.log('RESPONSE:', response);
        })
        .catch((err) => {
            console.log('ERROR:', err.message);
        });
}


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

routes.push({
    url: "myCafe", callback: () => {
        app.innerHTML = "";
        app.appendChild(renderHeader())
        createCafes()
    }

});





