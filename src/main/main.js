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

const userModel = new UserModel();
const staffListModel = new StaffListModel(userModel);
const cafeListModel = new CafeListModel();
const landingModel = new LandingModel();


const staffListView = new StaffListView();
const registerView = new RegisterView(app, 'Регистрация');
const loginView = new LoginView(app);
const cafeListView = new CafeListView(app);
const userProfileView = new UserProfileView(app);
const createCafeView = new CreateCafeView();
const cafePageView = new CafePageView();
const editCafeView = new CreateCafeView();
const landingView = new LandingView(app);
const addStaffView = new RegisterView(app, 'Регистрация работника');
const staffPageView = new StaffPageView();

const registerController = new RegisterController(userModel, registerView);
const loginController = new LoginController(userModel, loginView);
const cafeListController = new CafeListController(cafeListModel, userModel, cafeListView);
const userProfileController = new UserProfileController(userModel, userProfileView);
const createCafeController = new CreateCafeController(cafeListModel, userModel, createCafeView);
const staffListController = new StaffListController(staffListModel, staffListView);
const cafePageController = new CafePageController(cafeListModel, userModel, cafePageView);
const editCafeController = new EditCafeController(cafeListModel, userModel, editCafeView);
const landingController = new LandingController(landingModel, landingView);
const staffPageController = new StaffPageController(staffListModel, userModel, staffPageView);

/** Страница регистрации */
function doreg(){
    registerController.control();
}

/** Страница авторизации */
function dolog(){
    loginController.control();
}

/** Страница моих кафе */
function doMyCafes(){
    cafeListController.control();
}

/** Страница профиля */
function doProfile(){
    userProfileController.control();
}

/** Страница создания кафе */
function doCreateCafe(){
    createCafeController.control();
}

/** Страница добавления работника */
function doStaffPage(){
    staffListController.control();
}

/** Страница кафе */
function doCafe(req){
    cafePageController.control(req.param.id);
}

/** Страница изменения кафе */
function doEditCafe(req){
    editCafeController.control(req.param.id);
}

/** Страница лэндинга */
function doLanding() {
    landingController.control();
}

/** Страница добавления работника */
function doAddStaff(req) {
    const uuid = req.query.get('uuid');
    const addStaffController = new AddStaffController(userModel, addStaffView, uuid);
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
    staffPageController.control(req.param.id);
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


