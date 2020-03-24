'use strict';

import {CafesContainerComponent} from "../components/CafesContainer/CafesContainer";
import {Router} from "../modules/Router";
import Header from "../components/MainHeader/Header";

export default class CafeListView{
    constructor(app = document.body) {
        this._app = app;
        this._context = null;
    }

    get context(){
        return this._context;
    }

    set context(context){
        this._context = context;
    }

    _renderCafes(context){
        const cafesContainer = document.createElement('div');
        (new CafesContainerComponent(cafesContainer)).render(context);
        this._app.appendChild(cafesContainer);

        let buttonAddCafe = document.getElementsByClassName('cafes-page__add-cafe-field__add-button').item(0);
        buttonAddCafe.addEventListener('click',function (e) {
            Router.redirect('/createCafe');
        }) // Need move to CafesContainerComponent
    }

    render() {
        this._app.innerHTML = '';
        (new Header(this._app)).render(this._context['header']);
        this._renderCafes(this._context['cafeList']);
    }
}