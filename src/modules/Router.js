import {renderHeader} from "../components/header/header";
import {createCafes} from "../components/myCafePage/creation";

let app = document.body;

export class Router {

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

    static redirect(url) {
        window.location.href = url
    }

    static goBack() {
        window.history.back()
    }

    static goForward() {
        window.history.forward()
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

}