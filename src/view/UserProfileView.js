'use strict';

import Header from "../components/MainHeader/Header";
import ProfileComponent from "../components/Profile/Profile";
import BaseView from "./BaseView";

export default class UserProfileView extends BaseView {
    constructor(app = document.body) {
        super(app);
    }

    render(){
        this._app.innerHTML = '';
        (new Header(this._app)).render(this._context['header']);

        const profileElement = document.createElement('div');
        (new ProfileComponent(profileElement)).render(this._context['profile']);
        this._app.appendChild(profileElement);
    }
}