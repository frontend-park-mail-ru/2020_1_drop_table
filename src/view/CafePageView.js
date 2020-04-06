import Header from "../components/MainHeader/Header";
import {CafePageComponent} from "../components/CafePageComponent/CafePage";
import CardRedactorController from "../controllers/CardRedactorController";
import CardRedactorView from "./CardRedactorView";
import {AppleCardModel} from "../models/AppleCardModel";
import BaseView from "./BaseView";

/** view страницы кафе */
export default class CafePageView extends BaseView {

    /**
     * Инициализация CafePageView
     * @param {Element} app элемент в котором находится приложение
     */
    constructor(app = document.getElementById('application')) {
        super(app);
    }

    applePassButtonClick (e) { //TODO move to controller
        let container = document.getElementsByClassName('card-creator-container').item(0);
        if( container.innerHTML.toString().length <= 2 ){
            console.log('cafe context: ', this._context['cafe'].id);
            const appleCardModel= new AppleCardModel(this._context['cafe'].id);
            const cardRedactorView = new CardRedactorView();
            const cardRedactorController = new CardRedactorController(appleCardModel, cardRedactorView);
            cardRedactorController.control();
        }
    }

    /** Отрисовка страницы с кафе */
    render(){
        this._app.innerHTML = '';
        (new Header(this._app)).render(this._context['header']);

        const profileElement = document.createElement('div');
        (new CafePageComponent(profileElement)).render(this._context['cafe']);
        this._app.appendChild(profileElement);


        const buttonApplePass =  document.getElementsByClassName('buttons__apple-pass-button').item(0);
        buttonApplePass.addEventListener('click',this.applePassButtonClick.bind(this));
        console.log('1',buttonApplePass)

        const buttonAddStaff =  document.getElementsByClassName('buttons__add-staff-button').item(0);
        buttonAddStaff.addEventListener('click',this.context['add-staff-button']);
        console.log('2',buttonAddStaff)

        const buttonEditCafe =  document.getElementsByClassName('cafe-page__cafe-info__edit-button').item(0);
        buttonEditCafe.addEventListener('click',this.context['cafe-page__cafe-info__edit-button']);
    }

}
