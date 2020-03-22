import {renderRegister} from '../components/Register/Register';
import Header from '../components/MainHeader/Header';
import {CreateCafePage} from '../components/CafePage/CafePage'
import {Router} from "../modules/Router";

import UserProfileView from '../view/UserProfileView'
import UserProfileController from "../controllers/UserProfileController";
import UserModel from "../models/UserModel";
import CafeModel from "../models/CafeModel";
import CafeListModel from "../models/CafeListModel";
import CafeListView from "../view/CafeListView";
import CreateCafeView from "../view/CreateCafeView";
import CreateCafeController from "../controllers/CreateCafeController";
import LoginView from "../view/LoginView";
import LoginController from "../controllers/LoginController";

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
        const userModel = new UserModel();
        const loginView = new LoginView(app);
        const loginController = new LoginController(userModel, loginView);
        loginController.control();

        // sessionStorage.clear();
        // app.innerHTML = '';
        // (new Header(app)).render('auth').then(() => {
        //     app.appendChild(renderLogin());
        // });
    });

    router.addRoute('/myCafe', () => {
        const cafeList = new CafeListModel();
        const cafeListView = new CafeListView(app);

        if(cafeList.isEmpty){
            cafeList.cafesList().then(()=>{
                cafeListView.context = cafeList.context;
                cafeListView.render();
            });
        } else {
            cafeListView.context = cafeList.context;
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
        const cafeList = new CafeListModel();
        const createCafeView = new CreateCafeView();
        const createCafeController = new CreateCafeController(cafeList, createCafeView);
        createCafeController.control();
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
