import {Router} from "../modules/Router";

import UserProfileView from '../view/UserProfileView'
import UserProfileController from "../controllers/UserProfileController";
import UserModel from "../models/UserModel";
import CafeListModel from "../models/CafeListModel";
import CafeListView from "../view/CafeListView";
import CreateCafeView from "../view/CreateCafeView";
import CreateCafeController from "../controllers/CreateCafeController";
import LoginView from "../view/LoginView";
import LoginController from "../controllers/LoginController";
import RegisterView from "../view/RegisterView";
import RegisterController from "../controllers/RegisterController";
import CafeListController from "../controllers/CafeListController";
import CafePageController from "../controllers/CafePageContoller";
import CafePageView from "../view/CafePageView";
import AddStaffController from "../controllers/addStaffController";

let app = document.body;

function initBaseRoutes(router) {
    router.addRoute('/reg', () => {
        const userModel = new UserModel();
        const registerView = new RegisterView(app, "Регистрация");
        const registerController = new RegisterController(userModel, registerView);
        registerController.control();
    });

    router.addRoute('/login', () => {
        const userModel = new UserModel();
        const loginView = new LoginView(app);
        const loginController = new LoginController(userModel, loginView);
        loginController.control();
    });

    router.addRoute('/myCafe', () => {
        const cafeList = new CafeListModel();
        const userModel = new UserModel();
        const cafeListView = new CafeListView(app);
        const cafeListController = new CafeListController(cafeList, userModel, cafeListView);
        cafeListController.control();
    });

    router.addRoute('/Profile', async () => {
        const user = new UserModel();
        const userProfileView = new UserProfileView(app);
        const userProfileController = new UserProfileController(user, userProfileView);
        await userProfileController.control();
    });

    router.addRoute('/createCafe', () => {
        const cafeList = new CafeListModel();
        const userModel = new UserModel();
        const createCafeView = new CreateCafeView();
        const createCafeController = new CreateCafeController(cafeList, userModel, createCafeView);
        createCafeController.control();
    });

    router.addRoute('/Cafe', (id) => {
        const cafeListModel = new CafeListModel();
        const userModel = new UserModel();
        const cafePageView = new CafePageView();
        const cafePageController = new CafePageController(cafeListModel, userModel, cafePageView);
        cafePageController.control(id);
    });

    router.addRoute('/addStaff', (getParams) => {
        if (getParams !== "") {
            let uuid = getParams.split('=')[1].toString();
            const userModel = new UserModel();
            const registerView = new RegisterView(app, "Добавление сотрудника");
            const addStaffController = new AddStaffController(userModel, registerView,uuid);
            addStaffController.control();
            console.log(uuid)
        } else {
            alert("no uuid")
        }


    })

}

let router = new Router;
initBaseRoutes(router);
