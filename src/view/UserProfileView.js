'use strict';

import Header from "../components/MainHeader/Header";
import ProfileComponent from "../components/Profile/Profile";

export default class UserProfileView{
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
        (new Header(this._app)).render('profile').then(()=>{
            const profileElement = document.createElement('div');
            (new ProfileComponent(profileElement)).render(this._context);
            this._app.appendChild(profileElement);
        });
    }
}