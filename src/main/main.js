import {renderRegister} from '../components/register/register';
import {renderBlankHeader, renderHeader} from '../components/header/header';
import {renderLogin} from '../components/login/login';
import {createCafes} from '../components/myCafePage/creation';
import {createUserProfilePage} from '../components/userProphilePage/creation';
import {createNewCafePage} from '../components/AddCafePage/creation';


let app = document.body

class Router {

    constructor() {
        this._routes = [];
        this._routes.push({
            url: '', callback: () => {
                app.innerHTML = '';
                app.appendChild(renderHeader());
                createCafes()
            }
        });
        window.addEventListener('popstate', this._routing.bind(this));
        setTimeout(this._routing.bind(this), 0);
    }

    _getUrl() {
        return window.location.pathname
    }

    _routing() {
        console.log(window.location.pathname);
        const url = this._getUrl();
        let route = this._routes[0];
        this._routes.forEach(item => {
            if (url === item.url) {
                route = item;
            }
        });

        route.callback();
    }

    addRoute(url, callback) {
        this._routes.push({url: url, callback: callback})
    }

    static redirect(url) {
        window.location.href = url
    }

}

function initBaseRoutes(router) {
    router.addRoute('/reg', () => {
        app.innerHTML = '';
        app.appendChild(renderBlankHeader());
        app.appendChild(renderRegister());
    })

    router.addRoute('/login', () => {
        app.innerHTML = '';
        app.appendChild(renderBlankHeader());
        app.appendChild(renderLogin());
    })

    router.addRoute('/myCafe', () => {
        app.innerHTML = '';
        app.appendChild(renderHeader());
        createCafes();
    })

    router.addRoute('/profile', () => {
        app.innerHTML = '';
        const up = document.createElement('div');
        createUserProfilePage(up);
        app.appendChild(renderHeader());
        app.appendChild(up);
    })

    router.addRoute('/createCafe', () => {
        app.innerHTML = '';
        app.appendChild(renderHeader());
        createNewCafePage();
    })

}

let router = new Router;
initBaseRoutes(router)