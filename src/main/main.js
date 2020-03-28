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
import AddStaffController from "../controllers/addStaffController";
import RegisterComponent from "../components/Register/Register";
import {StaffPageComponent} from "../components/Staff/StaffPageComponent/StaffPageComponent";
import StaffListView from "../view/StaffListView";
import StaffListController from "../controllers/StaffListController";


let app = document.getElementById('application');

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

    router.addRoute('/myCafes', () => {
        const cafeList = new CafeListModel();
        const userModel = new UserModel();
        const cafeListView = new CafeListView(app);
        const cafeListController = new CafeListController(cafeList, userModel, cafeListView);
        cafeListController.control();
    });

    router.addRoute('/profile', () => {
        const user = new UserModel();
        const userProfileView = new UserProfileView(app);
        const userProfileController = new UserProfileController(user, userProfileView);
        userProfileController.control();
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

    router.addRoute('/Staff', () => {
        //StaffPageComponent
        const cafeList = new CafeListModel();
        const userModel = new UserModel();
        const staffListView = new StaffListView(app);
        const staffListController = new StaffListController(cafeList, userModel, staffListView);
        staffListController.control();

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
const root = document.getElementById('application');
// let newRouter = new NewRouter(root);

function doreg(){
    console.log('in reg');
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
    console.log('in mycafes');
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
    console.log('in createcafe');
    const cafeList = new CafeListModel();
    const userModel = new UserModel(router);
    const createCafeView = new CreateCafeView();
    const createCafeController = new CreateCafeController(cafeList, userModel, createCafeView);
    createCafeController.control();
}
function doStaff(){
    console.log('in staff');
    const cafeList = new CafeListModel();
    const userModel = new UserModel();
    const staffListView = new StaffListView(app);
    const staffListController = new StaffListController(cafeList, userModel, staffListView);
    staffListController.control();
}

function doCafe(id){
    console.log('in cafe');
    const cafeListModel = new CafeListModel();
    const userModel = new UserModel();
    const cafePageView = new CafePageView();
    const cafePageController = new CafePageController(cafeListModel, userModel, cafePageView);
    cafePageController.control(id);
}
function test(req) {
    console.log(`Showing cafe for ${req.param.username}`);
     doCafe(req.param.id);
}

const myOptions ={
    historyMode: true,
    caseInsensitive: false
};
export const router = new Router(myOptions);

router.get("/", doreg);
router.get("/reg", doreg).setName("Reg");
router.get("/login", dolog).setName("Login");
router.get("/myCafes", doMyCafes).setName("MyCafes");
router.get("/profile", doProfile).setName("Profile");
router.get("/createCafe", doCreateCafe).setName("CreateCafe");
router.get("/staff", doStaff).setName("Staff");
router.get('/cafe/{id}', test).setName('Cafe');

router.init();



// let router = new Router();
// initBaseRoutes(router);
