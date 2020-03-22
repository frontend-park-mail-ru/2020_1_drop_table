'use strict';

import LoginComponent from "../components/Login/Login";
import Header from "../components/MainHeader/Header";

export default class LoginView{

    constructor(app = document.body) {
        this._app = app;
        this._context = null;
    }

    set context(context){
        this._context = context;
    }

    get context(){
        return this._context;
    }

    _renderLogin(){
        let loginContainer = document.createElement('div');
        loginContainer.className = 'loginContainer';
        this._app.appendChild(loginContainer);
        (new LoginComponent(loginContainer)).render(this._context);
    }

    render(){
        this._app.innerHTML = '';
        (new Header(this._app)).render('auth').then(() => {
            this._renderLogin();
        });
    }
}