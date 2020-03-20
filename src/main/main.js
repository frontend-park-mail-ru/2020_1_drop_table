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
import CafeModel from "../models/CafeModel";
import CafeListModel from "../models/CafeListModel";
import CafeListView from "../view/CafeListView";

let app = document.body;

function initBaseRoutes(router) {
    router.addRoute('/reg', () => {
        sessionStorage.clear();
        app.innerHTML = '';
        (new Header(app)).render('auth').then(() => {
            app.appendChild(renderRegister());
        });
    });

    router.addRoute('/login', () => {
        sessionStorage.clear();
        app.innerHTML = '';
        (new Header(app)).render('auth').then(() => {
            app.appendChild(renderLogin());
        });
    });

    router.addRoute('/myCafe', () => {
        const cafeList = new CafeListModel();
        const cafeListView = new CafeListView(app);

        if(cafeList.isEmpty){
            cafeList.cafesList().then(()=>{
                cafeListView.cafeListContext = cafeList.context;
                cafeListView.render();
            });
        } else {
            cafeListView.cafeListContext = cafeList.context;
            cafeListView.render();
        }
    });

    router.addRoute('/Profile', () => {
        const user = new UserModel();
        const userProfileView = new UserProfileView(app);
        const userProfileController = new UserProfileController(user, userProfileView);
        userProfileController.control();
    });

    router.addRoute('/createCafe', () => {
        app.innerHTML = '';
        (new Header(app)).render().then(() => {
            createNewCafePage(app);
        });
    });

    router.addRoute('/Cafe', (id) => {
        console.log('callback Cafe with id', id);
        app.innerHTML = '';
        (new Header(app)).render().then(() => {
            CreateCafePage(app, id);
        });
    });
}

let router = new Router;
initBaseRoutes(router);
