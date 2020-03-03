import {renderRegister} from '../components/register/register';
import {renderBlankHeader, renderHeader} from '../components/header/header';
import {renderLogin} from '../components/login/login';
import {createCafes} from '../components/myCafePage/creation';
import {createUserProfilePage} from '../components/userProphilePage/creation';
import {createNewCafePage} from '../components/AddCafePage/creation';


class Router{

    constructor() {
        this._routes = [];
        this._app = document.body;

        this._initRoutes();
        window.addEventListener('popstate', this._routing.bind(this));
        setTimeout(this._routing.bind(this), 0);
    }

    _getUrl() {
        return window.location.hash.substr(1);
    }

    _routing() {
        console.log(this);
        const url = this._getUrl();
        let route = this._routes[0];
        this._routes.forEach(item => {
            if (url === item.url) {
                route = item;
            }
        });

        route.callback();
    }

    _initRoutes(){
        this._routes.push({
            url: '', callback: () => {
                this._app.innerHTML = '';
                this._app.appendChild(renderBlankHeader());
            }
        });

        this._routes.push({
            url: 'reg', callback: () => {
                this._app.innerHTML = '';
                this._app.appendChild(renderBlankHeader());
                this._app.appendChild(renderRegister());

            }
        });

        this._routes.push({
            url: 'login', callback: () => {
                this._app.innerHTML = '';
                this._app.appendChild(renderBlankHeader());
                this._app.appendChild(renderLogin());
            }

        });

        this._routes.push({
            url: 'myCafe', callback: () => {
                this._app.innerHTML = '';
                this._app.appendChild(renderHeader());
                createCafes();
            }

        });

        this._routes.push({
            url: 'profile', callback: () => {
                this._app.innerHTML = '';
                const up = document.createElement('div');
                createUserProfilePage(up);
                this._app.appendChild(renderHeader());
                this._app.appendChild(up);
            }

        });

        this._routes.push({
            url: 'createCafe', callback: () => {
                this._app.innerHTML = '';
                this._app.appendChild(renderHeader());
                createNewCafePage();
            }

        });
    }
}

let router = new Router;
