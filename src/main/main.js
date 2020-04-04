import Router from "../modules/Router";

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
import StaffListView from "../view/StaffListView";
import StaffListController from "../controllers/StaffListController";
import LandingModel from "../models/LandingModel";
import LandingView from "../view/LandingView";
import LandingController from "../controllers/LandingController";
import StaffModel from "../models/StaffModel";
import AddStaffController from "../controllers/addStaffController";

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.worker.js', {scope: '/'})
        .then((reg) => {
            console.log('Registration succeeded. Scope is ' + reg.scope);
        }).catch((error) => {
        console.log('Registration failed with ' + error);
    });
}

let app = document.getElementById('application');
// let newRouter = new NewRouter(root);

function doreg(){
    const userModel = new UserModel();
    const registerView = new RegisterView(app, "Регистрация");
    const registerController = new RegisterController(userModel, registerView);
    registerController.control();
}

function dolog(){
        console.log('in login');
        const userModel = new UserModel();
        const loginView = new LoginView(app);
        const loginController = new LoginController(userModel, loginView);
        loginController.control();
}
function doMyCafes(){
    const cafeList = new CafeListModel();
    const userModel = new UserModel();
    const cafeListView = new CafeListView(app);
    const cafeListController = new CafeListController(cafeList, userModel, cafeListView);
    cafeListController.control();
}

function doProfile(){
    console.log('in profile');
    const user = new UserModel();
    const userProfileView = new UserProfileView(app);
    const userProfileController = new UserProfileController(user, userProfileView);
    userProfileController.control();
}

function doCreateCafe(){

    const cafeList = new CafeListModel();
    const userModel = new UserModel(router);
    const createCafeView = new CreateCafeView();
    const createCafeController = new CreateCafeController(cafeList, userModel, createCafeView);
    createCafeController.control();
}
function doStaff(){
    const cafeList = new CafeListModel();
    const userModel = new UserModel();
    const staffListView = new StaffListView(app);
    const staffListController = new StaffListController(cafeList, userModel, staffListView);
    staffListController.control();
}

function doCafe(req){
    const id = req.param.id;
    console.log('in cafe');
    const cafeListModel = new CafeListModel();
    const userModel = new UserModel();
    const cafePageView = new CafePageView();
    const cafePageController = new CafePageController(cafeListModel, userModel, cafePageView);
    cafePageController.control(id);
}

function doLanding() {
    const landingModel = new LandingModel();
    const landingView = new LandingView(app);
    const landingController = new LandingController(landingModel, landingView);
    landingController.control();
}

function doAddStaff() {
    const staffModel = new StaffModel();
    const addStaffView = new RegisterView(app);
    const addStaffController = new AddStaffController(staffModel, addStaffView);
    addStaffController.control();
}

const myOptions ={
    historyMode: true,
    caseInsensitive: false
};
export const router = new Router(myOptions);

router.get("/", doreg);
router.get("/landing", doLanding).setName("Landing");
router.get("/reg", doreg).setName("Reg");
router.get("/login", dolog).setName("Login");
router.get("/myCafes", doMyCafes).setName("MyCafes");
router.get("/profile", doProfile).setName("Profile");
router.get("/createCafe", doCreateCafe).setName("CreateCafe");
router.get("/staff", doStaff).setName("Staff");
router.get('/cafe/{id}', doCafe).setName('Cafe');

router.get("/addStaff", doAddStaff).setName("AddStaff");

router.init();

