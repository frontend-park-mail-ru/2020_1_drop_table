import Router from '../utils/Router';

import UserProfileView from '../view/UserProfileView'
import UserProfileController from '../controllers/UserProfileController';
import UserModel from '../models/UserModel';

import CafeListModel from '../models/CafeListModel';
import LandingCafeListModel from '../models/LandingCafeListModel';
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

import PageNotFoundController from '../controllers/PageNotFoundController';
import PageNotFoundView from '../view/PageNotFoundView';

import SurveyView from '../view/SurveyView';
import SurveyController from '../controllers/SurveyController'
import {FormModel} from '../models/FormModel'

import TestPlotView from '../view/TestPlotView';

/** Регистрация сервис воркера */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.worker.js', {scope: '/'})
        .then((reg) => {
            console.log('Registration succeeded. Scope is ' + reg);

        }).catch((error) => {
            console.log('Registration failed with ' + error);
        });
}


const html = document.getElementsByTagName('html').item(0);
const theme = localStorage.getItem('theme');
html.className = theme ? theme : 'theme-light';

let app = document.getElementById('application');
export const router = new Router();

const userModel = new UserModel();
const staffListModel = new StaffListModel(userModel);
const cafeListModel = new CafeListModel();
const landingCafeListModel = new LandingCafeListModel();
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
const landingController = new LandingController(landingModel, landingView, landingCafeListModel);
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
    const position = req.query.get('position');
    const addStaffController = new AddStaffController(userModel, addStaffView, uuid, position);
    addStaffController.control();
}

/** Страница меню работника */
function doStaffMenu(req) {
    const uuid = req.param.uuid;
    const staffMenuView = new StaffMenuView(app, uuid);
    const staffMenuController = new StaffMenuController(staffMenuView, uuid);
    staffMenuController.control();
}

function doStaffById(req){
    staffPageController.control(req.param.id);
}

function doStatistics() {
    (new TestPlotView()).render();
}

function doSurvey(req) {
    const cafeId = req.param.cafeId;
    const uuid = req.param.uuid;

    const formModel = new FormModel(cafeId, uuid);
    const surveyView = new SurveyView(app);
    const surveyController = new SurveyController(formModel, surveyView );
    surveyController.control();
}

function doError(req) {

    let code = req.query.get('code');
    console.log('errcode',code)
    if(!code){
        code = 404;
    }
    console.log('doError', code)
    const pageNotFoundView = new PageNotFoundView(app);
    const pageNotFoundController = new PageNotFoundController(pageNotFoundView, code);
    pageNotFoundController.control();
}

function doNotFound() {
    console.log('doNotFound')
    const pageNotFoundView = new PageNotFoundView(app);
    const pageNotFoundController = new PageNotFoundController(pageNotFoundView, 404);
    pageNotFoundController.control();
}

/** Роуты роутера */
router.get('/', doLanding);
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
router.get('/statistics', doStatistics);
router.get('/addStaff', doAddStaff);

router.get('/points/{uuid}', doStaffMenu);

router.get('/survey/{cafeId}/{uuid}', doSurvey);

router.get('/error', doError);

router.notFoundHandler(doNotFound);

router.init();

