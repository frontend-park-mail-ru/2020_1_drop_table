import {renderRegister} from '../components/Register/Register';
import Header from '../components/MainHeader/Header';
import {renderLogin} from '../components/Login/Login';
import {createCafes} from '../components/MyCafePage/Creation';
import {createUserProfilePage} from '../components/UserProfilePage/Creation';
import {createNewCafePage} from '../components/AddCafePage/Creation.js'
import {CreateCafePage} from '../components/CafePage/CafePage'
import {Router} from "../modules/Router";

import UserProfileView from '../view/UserProfileView'
import UserProfileController from "../controllers/UserProfileController";
import UserModel from "../models/UserModel";

let app = document.body;

function initBaseRoutes(router) {
    router.addRoute('/reg', () => {
        app.innerHTML = '';
        (new Header(app)).render('auth');
        app.appendChild(renderRegister());
    });

    router.addRoute('/login', () => {
        app.innerHTML = '';
        (new Header(app)).render('auth');
        app.appendChild(renderLogin());
    });

    router.addRoute('/myCafe', () => {
        app.innerHTML = '';
        (new Header(app)).render();
        createCafes();
    });

    router.addRoute('/Profile', () => {
        const user = new UserModel();
        const userProfileView = new UserProfileView(app);
        const userProfileController = new UserProfileController(user, userProfileView);
        userProfileController.control();
    });

    router.addRoute('/createCafe', () => {
        app.innerHTML = '';
        (new Header(app)).render();
        createNewCafePage(app);
    });

    router.addRoute('/Cafe', (id) => {
        console.log('callback Cafe with id', id);
        app.innerHTML = '';
        (new Header(app)).render();
        CreateCafePage(app, id);
    });
}

let router = new Router;
initBaseRoutes(router);
