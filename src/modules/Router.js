import CafeListModel from "../models/CafeListModel";
import CafeListView from "../view/CafeListView";
import UserModel from "../models/UserModel";
import CafeListController from "../controllers/CafeListController";


let app = document.body;

export class Router {

    constructor() {
        this._routes = [];
        this._routes.push({
            url: '', callback: () => {
                const cafeList = new CafeListModel();
                const userModel = new UserModel();
                const cafeListView = new CafeListView(app);
                const cafeListController = new CafeListController(cafeList, userModel, cafeListView);
                cafeListController.control();
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
        const secondSlashPos = url.slice(1,-1).search('/');
        let currentUrl = url;
        let paramsUrl = null;
        const getParams=window.location.search.replace( '?', '');
        console.log(getParams);
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
            route.callback(paramsUrl,getParams);
        }
        else{
            route.callback(getParams);
        }

    }

    addRoute(url, callback) {
        this._routes.push({url: url, callback: callback})
    }

}


