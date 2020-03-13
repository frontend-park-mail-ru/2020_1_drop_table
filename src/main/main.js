import {renderRegister} from '../components/register/register';
// import {renderBlankHeader, renderHeader} from '../components/header/header';

import {renderBlankHeader, renderHeader} from '../components/mainHeader/header';

import {renderLogin} from '../components/login/login';
import {createCafes} from '../components/myCafePage/creation';
import {createUserProfilePage} from '../components/userProphilePage/creation';
import {createNewCafePage} from '../components/AddCafePage/creation';

import {CreateCafePage} from '../components/CafePage/CafePage'
import {Router} from "../modules/Router";


let app = document.body;

function initBaseRoutes(router) {
    router.addRoute('/reg', () => {
        app.innerHTML = '';
        app.appendChild(renderHeader('auth'));
        app.appendChild(renderRegister());
    });

    router.addRoute('/login', () => {
        app.innerHTML = '';
        app.appendChild(renderHeader('auth'));
        app.appendChild(renderLogin());
    });

    router.addRoute('/myCafe', () => {
        app.innerHTML = '';
        app.appendChild(renderHeader());
        createCafes();
    });

    router.addRoute('/profile', () => {
        app.innerHTML = '';
        let up = document.createElement('div');
        createUserProfilePage(up);
        app.appendChild(renderHeader('profile'));
        app.appendChild(up);
    });

    router.addRoute('/createCafe', () => {
        app.innerHTML = '';
        app.appendChild(renderHeader());
        createNewCafePage(app);
    });

    router.addRoute('/cafe', (id) => {
        console.log('callback cafe with id', id);
        app.innerHTML = '';
        app.appendChild(renderHeader());
        CreateCafePage(app, id);
    });

}

let router = new Router;
initBaseRoutes(router);
