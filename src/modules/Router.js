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
<<<<<<< HEAD
        console.log('resirect from ', window.location.href);
        console.log('resirect to ', url);
=======
>>>>>>> origin/AI_dev
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
<<<<<<< HEAD
        const secondSlashPos = url.slice(1,-1).search('/');
        let currentUrl = url;
        let paramsUrl = null;
        if( secondSlashPos !== -1) {
            currentUrl = url.slice(1, secondSlashPos + 1);
            paramsUrl = url.slice(secondSlashPos + 2, url.length);
            currentUrl = '/' + currentUrl;
        }

        let route = this._routes[0];
        this._routes.forEach(item => {
            if (currentUrl === item.url) {
                route = item;
            }
        });
        if (paramsUrl){//TODO проверка в вайтлисте(мапа)
            route.callback(paramsUrl);
        }
        else{
            route.callback();
        }

=======
        let route = this._routes[0];
        this._routes.forEach(item => {
            if (url === item.url) {
                route = item;
            }
        });

        route.callback();
>>>>>>> origin/AI_dev
    }

    addRoute(url, callback) {
        this._routes.push({url: url, callback: callback})
    }

<<<<<<< HEAD
}
=======
}
>>>>>>> origin/AI_dev
