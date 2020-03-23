import Header from "../components/MainHeader/Header";
import {CafePageComponent} from "../components/CafePageComponent/CafePage";
import CardRedactorController from "../controllers/CardRedactorController";
import CardRedactorView from "./CardRedactorView";
import {AppleCardModel} from "../models/AppleCardModel";

export default class CafePageView{
    constructor(app = document.body) {
        this._app = app;
        this._context = null;
    }

    get context(){
        return this._context
    }

    set context(context){
        this._context = context;
    }

    render(){
        this._app.innerHTML = '';
        (new Header(this._app)).render(this._context['header']);

        const profileElement = document.createElement('div');
        (new CafePageComponent(profileElement)).render(this._context['cafe']);
        this._app.appendChild(profileElement);

        let button =  document.getElementsByClassName('apple-pass-button').item(0);
        button.addEventListener('click',function (e) {
            let container = document.getElementsByClassName('card-creator-container').item(0);
            if( container.innerHTML.toString().length <= 2 ){
                let appleCardModel= new AppleCardModel();
                let cardRedactorView = new CardRedactorView();
                let cardRedactorController = new CardRedactorController(appleCardModel, cardRedactorView);
                cardRedactorController.control();
            }
        });
    }
}
