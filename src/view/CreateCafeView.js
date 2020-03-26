'use strict';

import Header from "../components/MainHeader/Header";
import CafeComponent from "../components/Cafe/Cafe";
import BaseView from "./BaseView";

export default class CreateCafeView extends BaseView{
    constructor(app = document.body) { // TODO Remove createNewCafePage
        super(app);
    }

    render(){
        this._app.innerHTML = '';
        (new Header(this._app)).render(this._context['header']);
        const cafeElement = document.createElement('div');
        this._app.appendChild(cafeElement);
        (new CafeComponent(cafeElement)).render(this._context['cafe']);
    }
}