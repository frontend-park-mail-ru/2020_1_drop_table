import Header from "../components/MainHeader/Header";
import {CafePageComponent} from "../components/CafePageComponent/CafePage";
import CardRedactorController from "../controllers/CardRedactorController";
import CardRedactorView from "./CardRedactorView";
import {AppleCardModel} from "../models/AppleCardModel";
import BaseView from "./BaseView";

export default class CafePageView extends BaseView {
    constructor(app = document.getElementById('application')) {
        super(app);
    }

    applePassButtonClick (e) {
        let container = document.getElementsByClassName('card-creator-container').item(0);
        if( container.innerHTML.toString().length <= 2 ){
            console.log('cafe context: ', this._context['cafe'].id);
            const appleCardModel= new AppleCardModel(this._context['cafe'].id);
            const cardRedactorView = new CardRedactorView();
            const cardRedactorController = new CardRedactorController(appleCardModel, cardRedactorView);
            cardRedactorController.control();
        }
    }
    render(){
        this._app.innerHTML = '';
        (new Header(this._app)).render(this._context['header']);

        const profileElement = document.createElement('div');
        (new CafePageComponent(profileElement)).render(this._context['cafe']);
        this._app.appendChild(profileElement);
        let button =  document.getElementsByClassName('apple-pass-button').item(0);
        button.addEventListener('click',this.applePassButtonClick.bind(this));
    }

}
