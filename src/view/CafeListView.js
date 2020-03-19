'use strict';

import {CafesContainerComponent} from "../components/CafesContainer/CafesContainer";
import {Router} from "../modules/Router";
import Header from "../components/MainHeader/Header";

export default class CafeListView{
    constructor(app = document.body) {
        this._app = app;
        this._cafeListContext = null;
    }

    get cafeListContext(){
        return this._cafeListContext;
    }

    set cafeListContext(cafeListContext){
        this._cafeListContext = cafeListContext;
    }

    _renderCafes(context){
        const cafesContainer = document.createElement('div');
        const cafesContainerComp = new CafesContainerComponent(cafesContainer);

        cafesContainerComp.data = JSON.parse(JSON.stringify(context));
        cafesContainerComp.render();
        this._app.appendChild(cafesContainer);

        let buttonAddCafe = document.getElementsByClassName('cafes-page__add-cafe-field__add-button').item(0);
        buttonAddCafe.addEventListener('click',function (e) {
            Router.redirect('/createCafe');
        }) // Need move to CafesContainerComponent
    }

    render() {
        this._app.innerHTML = '';
        (new Header(this._app)).render().then(()=>{
            this._renderCafes(this._cafeListContext);
        });
    }
}