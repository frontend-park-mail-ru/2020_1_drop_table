import {renderRegister} from '../components/register/register';
import {renderBlankHeader, renderHeader} from '../components/header/header';
import {renderLogin} from '../components/login/login';
import {createCafes} from '../components/myCafePage/creation';
import {createUserProfilePage} from '../components/userProphilePage/creation';
import {createNewCafePage} from '../components/AddCafePage/creation';
import {Router} from "../modules/Router";

let app = document.body;

function initBaseRoutes(router) {
    router.addRoute('/reg', () => {
        app.innerHTML = '';
        app.appendChild(renderBlankHeader());
        app.appendChild(renderRegister());
    });

    router.addRoute('/login', () => {
        app.innerHTML = '';
        app.appendChild(renderBlankHeader());
        app.appendChild(renderLogin());
    });

    router.addRoute('/myCafe', () => {
        app.innerHTML = '';
        app.appendChild(renderHeader());
        createCafes();
    });

    router.addRoute('/profile', () => {
        app.innerHTML = '';
        const up = document.createElement('div');
        createUserProfilePage(up);
        app.appendChild(renderHeader());
        app.appendChild(up);
    });

    router.addRoute('/createCafe', () => {
        app.innerHTML = '';
        app.appendChild(renderHeader());
        createNewCafePage();
    })

}

let router = new Router;
initBaseRoutes(router);
