'use strict';

import Header from "../components/MainHeader/Header";
import {createNewCafePage} from "../components/AddCafePage/Creation";
import CafeComponent from "../components/Cafe/Cafe";

export default class CreateCafeView{
    constructor(app = document.body) { // TODO Remove createNewCafePage
        this._app = app;
        this._context = null;
    }

    set context(context){
        this._context = context;
    }

    get context(){
        return this._context;
    }

    render(){
        this._app.innerHTML = '';
        (new Header(this._app)).render(this._context['header']);
        const cafeElement = document.createElement('div');
        this._app.appendChild(cafeElement);
        (new CafeComponent(cafeElement)).render(this._context['cafe']);
    }
}