'use strict';

import RegisterComponent from "../components/Register/Register";
import Header from "../components/MainHeader/Header";

export default class RegisterView{
    constructor(app) {
        this._app = app;
        this._context = null;
    }

    set context(context){
        this._context = context;
    }

    get context(){
        return this._context;
    }

    _renderRegister(){
        let registerContainer = document.createElement('div');
        registerContainer.className = 'registerContainer';
        this._app.appendChild(registerContainer);
        (new RegisterComponent(registerContainer)).render(this._context['register']);
    }

    render(){
        this._app.innerHTML = '';
        (new Header(this._app)).render(this._context['header']);
        this._renderRegister();
    }
}