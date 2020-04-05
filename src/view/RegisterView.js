'use strict';

import RegisterComponent from "../components/Register/Register";
import Header from "../components/MainHeader/Header";
import BaseView from "./BaseView";

export default class RegisterView extends BaseView {
    constructor(app, topBarText) {
        super(app);
        this._topBarText = topBarText;
        console.log('test regview', topBarText )
    }
    _renderRegister(){
        let registerContainer = document.createElement('div');
        registerContainer.className = 'registerContainer';
        this._app.appendChild(registerContainer);
        (new RegisterComponent(registerContainer)).render(this._context['register'],this._topBarText);
    }

    render(){
        this._app.innerHTML = '';
        (new Header(this._app)).render(this._context['header']);
        this._renderRegister();
    }
}
