'use strict';

import {Router} from "../modules/Router";

import {router} from "../main/main";

export default class LandingController {

    constructor(landingModel, landingView) {
        this._landingModel = landingModel;
        this._landingView = landingView;
    }

    _makeContext(){
        return {
            header: {
                type: 'auth',
                avatar: {
                    photo: null
                }
            },
        }
    }

    control(){
        sessionStorage.clear();
        this._landingView.context = this._makeContext();
        this._landingView.render();
    }
}
