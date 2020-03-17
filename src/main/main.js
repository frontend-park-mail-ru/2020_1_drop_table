import {renderRegister} from '../components/Register/Register';
// import {renderBlankHeader, renderHeader} from '../components/header/header';

import {renderBlankHeader, renderHeader} from '../components/MainHeader/Header';

import {renderLogin} from '../components/Login/Login';
import {createCafes} from '../components/MyCafePage/Creation';
import {createUserProfilePage} from '../components/UserProfilePage/Creation';
import {createNewCafePage} from '../components/AddCafePage/Creation.js'
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

    router.addRoute('/Profile', () => {
        app.innerHTML = '';
        const up = document.createElement('div');
        createUserProfilePage(up);
        app.appendChild(renderHeader('profile'));
        app.appendChild(up);
    });


    router.addRoute('/createCafe', () => {
        app.innerHTML = '';
        app.appendChild(renderHeader());
        createNewCafePage(app);
    });

    router.addRoute('/Cafe', (id) => {
        console.log('callback Cafe with id', id);
        app.innerHTML = '';
        app.appendChild(renderHeader());
        CreateCafePage(app, id);
    });


}

let router = new Router;
initBaseRoutes(router);
