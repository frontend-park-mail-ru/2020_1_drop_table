'use strict';

import Header from "../components/MainHeader/Header";
import ProfileComponent from "../components/Profile/Profile";

export default class UserProfileView{
    constructor(app = document.body) {
        this._app = app;
        this._profileContext = null;
    }

    get profileContext(){
        return this._profileContext
    }

    set profileContext(_profileContext){
        this._profileContext = _profileContext
    }

    render(){
        this._app.innerHTML = '';
        (new Header(this._app)).render('profile');

        const profileElement = document.createElement('div');
        (new ProfileComponent(profileElement)).render(this._profileContext);
        this._app.appendChild(profileElement);
    }
}