import Router from '../utils/Router';

import UserProfileView from '../view/UserProfileView'
import UserProfileController from '../controllers/UserProfileController';
import UserModel from '../models/UserModel';

import CafeListModel from '../models/CafeListModel';
import CafeListView from '../view/CafeListView';
import CafeListController from '../controllers/CafeListController';

import CreateCafeView from '../view/CreateCafeView';
import CreateCafeController from '../controllers/CreateCafeController';
import EditCafeController from '../controllers/EditCafeController';

import LoginView from '../view/LoginView';
import LoginController from '../controllers/LoginController';
import RegisterView from '../view/RegisterView';
import RegisterController from '../controllers/RegisterController';

import CafePageController from '../controllers/CafePageContoller';
import CafePageView from '../view/CafePageView';


import StaffListView from '../view/StaffListView';
import StaffPageView from '../view/StaffPageView';
import StaffListController from '../controllers/StaffListController';


import LandingModel from '../models/LandingModel';
import LandingView from '../view/LandingView';
import LandingController from '../controllers/LandingController';

import AddStaffController from '../controllers/addStaffController';
import StaffListModel from '../models/StaffListModel';

import StaffMenuView from '../view/StaffMenuView';
import StaffMenuController from '../controllers/StaffMenuController';
import StaffPageController from '../controllers/StaffPageController';

/** Регистрация сервис воркера */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.worker.js', {scope: '/'})
        .then((reg) => {
            console.log('Registration succeeded. Scope is ' + reg);

        }).catch((error) => {
            console.log('Registration failed with ' + error);
        });
}

navigator.serviceWorker.addEventListener('message', event => {
    if(event.data.type === 'csrf'){
        sessionStorage.setItem('Csrf', event.data.Csrf);
    } else if(event.data.type === 'offline'){
        alert('you are offline'); //TODO
    }
});

// navigator.serviceWorker.addEventListener('message', event => { //TODO
//     console.log('data', event.data);
//     if(event.data.type){
//         console.log('REFRESH');
//         location.reload();
//     }
// });

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
    createCafeController.control();
}

/** Страница добавления работника */
function doStaffPage(){
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
    const staffMenuView = new StaffMenuView(app, uuid);
    const staffMenuController = new StaffMenuController(staffMenuView);
    staffMenuController.control();
}

function doStaffById(req){
    const id = req.param.id;

    const userModel = new UserModel();
    const staffListModel = new StaffListModel(userModel);
    const staffPageView = new StaffPageView();
    console.log('view in main', staffPageView);
    const staffPageController = new StaffPageController(staffListModel, userModel, staffPageView);

    staffPageController.control(id);
}

/** Роуты роутера */
router.get('/', dolog);
router.get('/landing', doLanding);

router.get('/reg', doreg);
router.get('/login', dolog);
router.get('/profile', doProfile);

router.get('/myCafes', doMyCafes);
router.get('/createCafe', doCreateCafe);
router.get('/cafe/{id}', doCafe);
router.get('/editCafe/{id}', doEditCafe);

router.get('/staff', doStaffPage);
router.get('/staff/{id}', doStaffById);
router.get('/addStaff', doAddStaff);

router.get('/points/{uuid}', doStaffMenu);
router.notFoundHandler(doLanding);

router.init();


