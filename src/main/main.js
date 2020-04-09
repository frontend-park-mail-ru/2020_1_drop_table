import Router from '../utils/Router';

import UserProfileView from '../view/UserProfileView'
import UserProfileController from '../controllers/UserProfileController';
import UserModel from '../models/UserModel';
import CafeListModel from '../models/CafeListModel';
import CafeListView from '../view/CafeListView';
import CreateCafeView from '../view/CreateCafeView';
import CreateCafeController from '../controllers/CreateCafeController';
import LoginView from '../view/LoginView';
import LoginController from '../controllers/LoginController';
import RegisterView from '../view/RegisterView';
import RegisterController from '../controllers/RegisterController';
import CafeListController from '../controllers/CafeListController';
import CafePageController from '../controllers/CafePageContoller';
import CafePageView from '../view/CafePageView';
import StaffListView from '../view/StaffListView';
import StaffListController from '../controllers/StaffListController';
import LandingModel from '../models/LandingModel';
import LandingView from '../view/LandingView';
import LandingController from '../controllers/LandingController';
import AddStaffController from '../controllers/addStaffController';
import StaffListModel from '../models/StaffListModel';
import EditCafeController from '../controllers/EditCafeController';
import StaffMenuView from '../view/StaffMenuView';
import StaffMenuController from '../controllers/StaffMenuController';

/** Регистрация сервис воркера */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.worker.js', {scope: '/'})
        .then((reg) => {
            console.log('Registration succeeded. Scope is ' + reg.scope);
        }).catch((error) => {
            console.log('Registration failed with ' + error);
        });
}

let app = document.getElementById('application');

export const router = new Router();

/** Страница регистрации */
function doreg(){
    const userModel = new UserModel();
    const registerView = new RegisterView(app, 'Регистрация');
    const registerController = new RegisterController(userModel, registerView);
    registerController.control();
}

/** Страница авторизации */
function dolog(){
    console.log('in login');
    const userModel = new UserModel();
    const loginView = new LoginView(app);
    const loginController = new LoginController(userModel, loginView);
    loginController.control();
}

/** Страница моих кафе */
function doMyCafes(){
    const cafeList = new CafeListModel();
    const userModel = new UserModel();
    const cafeListView = new CafeListView(app);
    const cafeListController = new CafeListController(cafeList, userModel, cafeListView);
    cafeListController.control();
}

/** Страница профиля */
function doProfile(){
    console.log('in profile');
    const user = new UserModel();
    const userProfileView = new UserProfileView(app);
    const userProfileController = new UserProfileController(user, userProfileView);
    userProfileController.control();
}

/** Страница создания кафе */
function doCreateCafe(){
    const cafeList = new CafeListModel();
    const userModel = new UserModel();//router
    const createCafeView = new CreateCafeView();
    const createCafeController = new CreateCafeController(cafeList, userModel, createCafeView);
    console.log('test228', );
    createCafeController.control();
}

/** Страница добавления работника */
function doStaff(){
    const userModel = new UserModel();
    const staffListModel = new StaffListModel(userModel);
    const staffListView = new StaffListView();
    const staffListController = new StaffListController(staffListModel, staffListView);
    staffListController.control();

}

/** Страница кафе */
function doCafe(req){
    const id = req.param.id;
    console.log('in cafe');
    const cafeListModel = new CafeListModel();
    const userModel = new UserModel();
    const cafePageView = new CafePageView();
    const cafePageController = new CafePageController(cafeListModel, userModel, cafePageView);
    cafePageController.control(id);
}

/** Страница изменения кафе */
function doEditCafe(req){
    const id = req.param.id;
    console.log('in edit cafe');
    const cafeListModel = new CafeListModel();
    const userModel = new UserModel();
    const editCafeView = new CreateCafeView();
    const editCafeController = new EditCafeController(cafeListModel, userModel, editCafeView);
    editCafeController.control(id);
}

/** Страница лэндинга */
function doLanding() {
    const landingModel = new LandingModel();
    const landingView = new LandingView(app);
    const landingController = new LandingController(landingModel, landingView);
    landingController.control();
}

/** Страница добавления работника */
function doAddStaff(req) {
    const uuid = req.query.get('uuid');
    const userModel = new UserModel();
    const addStaffView = new RegisterView(app, 'Регистрация работника');
    const addStaffController = new AddStaffController(userModel, addStaffView,uuid);
    addStaffController.control();
}

/** Страница меню работника */
function doStaffMenu(req) {
    const uuid = req.param.uuid;
    console.log('uuid', uuid);
    const staffMenuView = new StaffMenuView(app, uuid);
    const staffMenuController = new StaffMenuController(staffMenuView);
    staffMenuController.control();
}




/** Роуты роутера */
router.get('/', doreg);
router.get('/landing', doLanding);
router.get('/reg', doreg);
router.get('/login', dolog);
router.get('/myCafes', doMyCafes);
router.get('/profile', doProfile);
router.get('/createCafe', doCreateCafe);
router.get('/staff', doStaff);
router.get('/cafe/{id}', doCafe);
router.get('/editCafe/{id}', doEditCafe);
router.get('/addStaff', doAddStaff);
router.get('/points/{uuid}', doStaffMenu);
router.notFoundHandler(doLanding);

router.init();


