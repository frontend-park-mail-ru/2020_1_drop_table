'use strict';

import {LandingComponent} from "../components/Landing/Landing";
import Header from "../components/MainHeader/Header";
import BaseView from "./BaseView";

export default class LandingView extends BaseView {

    constructor(app = document.getElementById('application')) {
        super(app);
    }

    _renderLanding(){
        let landingContainer = document.createElement('div');
        landingContainer.className = 'landingContainer';
        this._app.appendChild(landingContainer);
        (new LandingComponent(landingContainer)).render();
    }

    render(context){
        this._app.innerHTML = '';
        (new Header(this._app)).render(this._context['header']);
        this._renderLanding();
    }
}
